'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { medicalHistorySchema } from '@/lib/validations/medical-history';
import type { MedicalHistoryFormData } from '@/lib/types/medical-history';
import { z } from 'zod';

// First, define the valid exposure sources type
type ExposureSource = 'blood_transfusion' | 'sexual_intercourse' | 'intravenous_drug_use' | 'unknown';

// Update the form schema
const formSchema = z.object({
  // ... other fields
  exposureSource: z.enum(['blood_transfusion', 'sexual_intercourse', 'intravenous_drug_use', 'unknown']),
  // ... other fields
});

export function MedicalHistoryForm() {
  const [date, setDate] = useState<Date>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<MedicalHistoryFormData>({
    resolver: zodResolver(medicalHistorySchema),
  });

  const onSubmit = async (data: MedicalHistoryFormData) => {
    console.log('Form data:', data);
    // Here you would typically send the data to your API
  };

  const showIVDrugUseQuestion = form.watch('exposureSource') === 'intravenous_drug_use';

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <Label>When were you diagnosed?</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'MMMM yyyy') : 'Select date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date > new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
        <Label>Have you ever been treated?</Label>
        <RadioGroup onValueChange={(value) => form.setValue('hasBeenTreated', value === 'yes')}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="treated-yes" />
            <Label htmlFor="treated-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="treated-no" />
            <Label htmlFor="treated-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {form.watch('hasBeenTreated') && (
        <div className="space-y-4">
          <Label htmlFor="medication">What medicine were you treated with?</Label>
          <Input
            id="medication"
            {...form.register('medication')}
            placeholder="Enter medication name"
          />
        </div>
      )}

      <div className="space-y-4">
        <Label>How do you think you were exposed to HCV?</Label>
        <RadioGroup
          onValueChange={(value: ExposureSource) => form.setValue('exposureSource', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="blood_transfusion" id="blood_transfusion" />
            <Label htmlFor="blood_transfusion">Blood Transfusion</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sexual_intercourse" id="exposure-sexual" />
            <Label htmlFor="exposure-sexual">Sexual intercourse</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intravenous_drug_use" id="exposure-drug" />
            <Label htmlFor="exposure-drug">Intravenous drug use</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unknown" id="exposure-unknown" />
            <Label htmlFor="exposure-unknown">I don't know</Label>
          </div>
        </RadioGroup>
      </div>

      {showIVDrugUseQuestion && (
        <div className="space-y-4">
          <Label>When was the last time you used intravenous drugs?</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'MMMM yyyy') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date > new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="space-y-4">
        <Label>Is there any possibility you could be pregnant?</Label>
        <RadioGroup onValueChange={(value) => form.setValue('possiblyPregnant', value === 'yes')}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="pregnant-yes" />
            <Label htmlFor="pregnant-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="pregnant-no" />
            <Label htmlFor="pregnant-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Have you ever been told you have cirrhosis?</Label>
        <RadioGroup onValueChange={(value) => form.setValue('hasCirrhosis', value === 'yes')}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="cirrhosis-yes" />
            <Label htmlFor="cirrhosis-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="cirrhosis-no" />
            <Label htmlFor="cirrhosis-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label htmlFor="medications">Do you currently take any medications or supplements?</Label>
        <Textarea
          id="medications"
          {...form.register('currentMedications')}
          placeholder="Please list all medications and supplements"
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="allergies">Do you have any allergies to medicines?</Label>
        <Textarea
          id="allergies"
          {...form.register('medicationAllergies')}
          placeholder="Please list any medication allergies"
        />
      </div>

      <div className="space-y-4">
        <Label>Upload lab results indicating Hepatitis C</Label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  form.setValue('labResults', file);
                }
              }}
            />
          </label>
        </div>
        {selectedFile && (
          <p className="text-sm text-muted-foreground">
            Selected file: {selectedFile.name}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Submit Medical History
      </Button>
    </form>
  );
}