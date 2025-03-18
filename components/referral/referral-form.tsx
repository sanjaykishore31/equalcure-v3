'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import { createReferral, ReferralData } from '@/lib/supabase';

const referralFormSchema = z.object({
  // Referring Provider Information
  referrerName: z.string().min(2, { message: 'Name is required' }),
  referrerEmail: z.string().email({ message: 'Valid email is required' }),
  referrerPhone: z.string().min(10, { message: 'Valid phone number is required' }),
  referrerOrganization: z.string().optional(),
  
  // Patient Information
  patientName: z.string().min(2, { message: 'Patient name is required' }),
  patientDOB: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Valid date is required (YYYY-MM-DD)' }),
  patientEmail: z.string().email({ message: 'Valid email is required' }).optional(),
  patientPhone: z.string().min(10, { message: 'Valid phone number is required' }),
  patientAddress: z.string().min(5, { message: 'Address is required' }),
  patientCity: z.string().min(2, { message: 'City is required' }),
  patientState: z.string().min(2, { message: 'State is required' }),
  patientZip: z.string().min(5, { message: 'ZIP code is required' }),
  
  // Clinical Information
  hcvConfirmed: z.boolean(),
  hcvGenotype: z.string().optional(),
  viralLoad: z.string().optional(),
  fibrosisStage: z.string().optional(),
  comorbidities: z.string().optional(),
  medications: z.string().optional(),
  notes: z.string().optional(),
  urgency: z.enum(['routine', 'urgent']),
  
  // Insurance Information
  insuranceStatus: z.enum(['insured', 'uninsured', 'unknown']),
  insuranceProvider: z.string().optional(),
  insuranceId: z.string().optional(),
  insuranceGroup: z.string().optional(),
  
  // Consent
  patientConsent: z.boolean().refine(val => val === true, {
    message: 'Patient consent is required',
  }),
});

type ReferralFormValues = z.infer<typeof referralFormSchema>;

interface ReferralFormProps {
  onSuccess: (referralId: string) => void;
}

export function ReferralForm({ onSuccess }: ReferralFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      hcvConfirmed: false,
      urgency: 'routine',
      patientConsent: false,
      insuranceStatus: 'unknown',
    },
  });

  async function onSubmit(data: ReferralFormValues) {
    setIsSubmitting(true);
    
    try {
      // Map form data to ReferralData structure
      const referralData: Omit<ReferralData, 'id' | 'created_at' | 'status'> = {
        referrer_name: data.referrerName,
        referrer_email: data.referrerEmail,
        referrer_phone: data.referrerPhone,
        referrer_organization: data.referrerOrganization || '',
        
        patient_name: data.patientName,
        patient_dob: data.patientDOB,
        patient_email: data.patientEmail || '',
        patient_phone: data.patientPhone,
        patient_address: data.patientAddress,
        patient_city: data.patientCity,
        patient_state: data.patientState,
        patient_zip: data.patientZip,
        
        hcv_confirmed: data.hcvConfirmed,
        hcv_genotype: data.hcvGenotype,
        viral_load: data.viralLoad,
        fibrosis_stage: data.fibrosisStage,
        comorbidities: data.comorbidities,
        medications: data.medications,
        notes: data.notes,
        urgency: data.urgency,
        
        insurance_status: data.insuranceStatus,
        insurance_provider: data.insuranceProvider,
        insurance_id: data.insuranceId,
        insurance_group: data.insuranceGroup,
        
        patient_consent: data.patientConsent,
      };
      
      // Store the referral in Supabase
      const referral = await createReferral(referralData);
      
      if (!referral) {
        throw new Error('Failed to create referral');
      }
      
      // Send notification email to staff
      await fetch('/api/email/referral-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referralId: referral.id,
          patientName: data.patientName,
          referrerName: data.referrerName,
          urgency: data.urgency
        }),
      });
      
      onSuccess(referral.id);
    } catch (error) {
      console.error('Error submitting referral:', error);
      // You could add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Referring Provider Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="referrerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="referrerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="referrerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Phone*</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 555-5555" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="referrerOrganization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input placeholder="Hospital or Clinic Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Patient Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientDOB"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth*</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 555-5555" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address*</FormLabel>
                  <FormControl>
                    <Input placeholder="Street Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City*</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State*</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientZip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code*</FormLabel>
                  <FormControl>
                    <Input placeholder="ZIP Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Clinical Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="hcvConfirmed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      HCV Confirmed
                    </FormLabel>
                    <FormDescription>
                      Patient has confirmed Hepatitis C diagnosis
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Urgency</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="routine" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Routine
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="urgent" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Urgent
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hcvGenotype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HCV Genotype (if known)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1a, 1b, 2, 3, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="viralLoad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Viral Load (if known)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1,000,000 IU/mL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fibrosisStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fibrosis Stage (if known)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., F0, F1, F2, F3, F4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="comorbidities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comorbidities</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any relevant comorbidities"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="medications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Medications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List current medications"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information that may be relevant"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Insurance Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="insuranceStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Insurance Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="insured" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Insured
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="uninsured" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Uninsured
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="unknown" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Unknown
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {form.watch('insuranceStatus') === 'insured' && (
              <>
                <FormField
                  control={form.control}
                  name="insuranceProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance Provider</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Blue Cross, Medicaid" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="insuranceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Insurance ID Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="insuranceGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Group Number (if applicable)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Consent</h2>
          
          <FormField
            control={form.control}
            name="patientConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Patient Consent*
                  </FormLabel>
                  <FormDescription>
                    I confirm that the patient has consented to this referral and the sharing of their medical information for the purpose of treatment.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Referral'
          )}
        </Button>
      </form>
    </Form>
  );
} 