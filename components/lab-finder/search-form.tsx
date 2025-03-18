'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (location: string, labType: 'LabCorp' | 'Quest Diagnostics') => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [location, setLocation] = useState('');
  const [labType, setLabType] = useState<'LabCorp' | 'Quest Diagnostics'>('LabCorp');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location, labType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter ZIP code or address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !location.trim()}>
          <Search className="h-4 w-4 mr-2" />
          Find Labs
        </Button>
      </div>

      <RadioGroup
        value={labType}
        onValueChange={(value: 'LabCorp' | 'Quest Diagnostics') => setLabType(value)}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="LabCorp" id="labcorp" />
          <Label htmlFor="labcorp">LabCorp</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Quest Diagnostics" id="quest" />
          <Label htmlFor="quest">Quest Diagnostics</Label>
        </div>
      </RadioGroup>
    </form>
  );
}