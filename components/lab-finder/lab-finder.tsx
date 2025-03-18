'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { SearchForm } from './search-form';
import { Map } from './map';
import { LabList } from './lab-list';
import { useToast } from '@/hooks/use-toast';
import { initializeMaps } from '@/lib/google-maps';
import { fetchPlaceDetails } from '@/lib/google-maps';
import type { LabLocation } from '@/lib/types';

export function LabFinder() {
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ 
    lat: 40.7128, 
    lng: -74.0060 
  });
  const [markers, setMarkers] = useState<LabLocation[]>([]);
  const { toast } = useToast();
  const placesServiceRef = useRef<google.maps.places.PlacesService>();
  const mapRef = useRef<google.maps.Map>();
  const [mapsLoaded, setMapsLoaded] = useState(false);

  useEffect(() => {
    const initializePlacesService = async () => {
      try {
        await initializeMaps();
        
        const mapDiv = document.createElement('div');
        mapDiv.style.display = 'none';
        document.body.appendChild(mapDiv);
        
        const map = new google.maps.Map(mapDiv, {
          center: mapCenter,
          zoom: 12
        });
        
        mapRef.current = map;
        placesServiceRef.current = new google.maps.places.PlacesService(map);
        setMapsLoaded(true);

        return () => {
          document.body.removeChild(mapDiv);
        };
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
        toast({
          title: "Error",
          description: "Failed to load maps. Please try again later.",
          variant: "destructive"
        });
      }
    };

    initializePlacesService();
  }, []);

  const handleSearch = async (location: string, labType: 'LabCorp' | 'Quest Diagnostics') => {
    if (!mapsLoaded || !placesServiceRef.current) {
      toast({
        title: "Error",
        description: "Maps service not initialized. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ address: location });
      
      if (result.results[0]) {
        const { location: searchLocation } = result.results[0].geometry;
        const newCenter = { lat: searchLocation.lat(), lng: searchLocation.lng() };
        setMapCenter(newCenter);

        const request = {
          location: searchLocation,
          radius: 24140, // 15 miles in meters
          keyword: labType,
          type: 'health'
        };

        placesServiceRef.current.nearbySearch(request, async (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const detailedResults = await Promise.all(
              results.map(async (place) => {
                const details = await fetchPlaceDetails(placesServiceRef.current!, place.place_id!);
                return {
                  position: {
                    lat: place.geometry!.location!.lat(),
                    lng: place.geometry!.location!.lng()
                  },
                  title: place.name!,
                  address: place.vicinity!,
                  placeId: place.place_id!,
                  phoneNumber: details.phoneNumber,
                  hours: details.hours,
                };
              })
            );
            setMarkers(detailedResults);
          } else {
            toast({
              title: "No labs found",
              description: "Try expanding your search area or checking a different location.",
              variant: "destructive"
            });
            setMarkers([]);
          }
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find labs. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Find a Lab Near You</h2>
      <div className="space-y-6">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        <Map center={mapCenter} markers={markers} />
        <LabList labs={markers} userLocation={mapCenter} />
      </div>
    </Card>
  );
}