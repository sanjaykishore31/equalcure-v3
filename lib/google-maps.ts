'use client';

import { Loader } from '@googlemaps/js-api-loader';

// Create a single loader instance with all required libraries
export const mapsLoader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  version: 'weekly',
  libraries: ['places'],
});

// Initialize maps and return a promise
let mapsLoadingPromise: Promise<void> | null = null;

export function initializeMaps() {
  if (!mapsLoadingPromise) {
    mapsLoadingPromise = mapsLoader.load();
  }
  return mapsLoadingPromise;
}

export function fetchPlaceDetails(
  placesService: google.maps.places.PlacesService,
  placeId: string
): Promise<{ phoneNumber?: string; hours?: string[] }> {
  return new Promise((resolve, reject) => {
    placesService.getDetails(
      {
        placeId: placeId,
        fields: ['formatted_phone_number', 'opening_hours'],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          resolve({
            phoneNumber: place.formatted_phone_number,
            hours: place.opening_hours?.weekday_text,
          });
        } else {
          resolve({}); // Return empty object if details not found
        }
      }
    );
  });
}