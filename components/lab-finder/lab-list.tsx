'use client';

import { Card } from '@/components/ui/card';
import { MapPin, Phone, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { LabLocation } from '@/lib/types';

interface LabListProps {
  labs: LabLocation[];
  userLocation: google.maps.LatLngLiteral;
}

function calculateDistance(
  p1: google.maps.LatLngLiteral,
  p2: google.maps.LatLngLiteral
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (p2.lat - p1.lat) * Math.PI / 180;
  const dLon = (p2.lng - p1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal place
}

export function LabList({ labs, userLocation }: LabListProps) {
  const labsWithDistance = labs
    .map(lab => ({
      ...lab,
      distance: calculateDistance(userLocation, lab.position)
    }))
    .filter(lab => lab.distance <= 15) // Only show labs within 15 miles
    .sort((a, b) => a.distance - b.distance);

  if (labsWithDistance.length === 0) {
    return (
      <Card className="p-4 text-center text-muted-foreground">
        No labs found within 15 miles of your location
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">
        Labs within 15 miles ({labsWithDistance.length} found)
      </h3>
      <div className="grid gap-4">
        {labsWithDistance.map((lab, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h4 className="font-semibold">{lab.title}</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {lab.address}
                </div>
                {lab.phoneNumber && (
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-1" />
                    <a href={`tel:${lab.phoneNumber}`} className="hover:underline">
                      {lab.phoneNumber}
                    </a>
                  </div>
                )}
                <p className="text-sm">
                  {lab.distance} miles away
                </p>
                {lab.hours && lab.hours.length > 0 && (
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center text-sm text-primary hover:underline">
                      <Clock className="h-4 w-4 mr-1" />
                      View Hours
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <ul className="text-sm space-y-1">
                        {lab.hours.map((hour, i) => (
                          <li key={i} className="text-muted-foreground">{hour}</li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${lab.position.lat},${lab.position.lng}`,
                    '_blank'
                  );
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Directions
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}