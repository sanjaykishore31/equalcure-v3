'use client';

import { useEffect, useRef } from 'react';
import { initializeMaps } from '@/lib/google-maps';

interface MapProps {
  center: google.maps.LatLngLiteral;
  markers: Array<{
    position: google.maps.LatLngLiteral;
    title: string;
    address: string;
  }>;
}

export function Map({ center, markers }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map>();

  useEffect(() => {
    if (!mapRef.current) return;

    initializeMaps().then(() => {
      const map = new google.maps.Map(mapRef.current!, {
        center,
        zoom: 12,
      });

      mapInstanceRef.current = map;

      // Clear existing markers
      if (mapInstanceRef.current) {
        markers.forEach((marker) => {
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-semibold">${marker.title}</h3>
                <p>${marker.address}</p>
              </div>
            `,
          });

          const mapMarker = new google.maps.Marker({
            position: marker.position,
            map,
            title: marker.title,
          });

          mapMarker.addListener('click', () => {
            infoWindow.open(map, mapMarker);
          });
        });
      }
    });
  }, [center, markers]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg" />;
}