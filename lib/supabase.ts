import { createClient } from '@supabase/supabase-js';

// Check if we're running on the client side
const isClient = typeof window !== 'undefined';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  if (isClient) {
    console.error('Missing Supabase environment variables');
  }
  // Don't throw an error during server-side rendering
  // as it will cause the build to fail
}

// Create the Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export type ReferralData = {
  id?: string;
  created_at?: string;
  
  // Referrer Information
  referrer_name: string;
  referrer_email: string;
  referrer_phone: string;
  referrer_organization: string;
  
  // Patient Information
  patient_name: string;
  patient_dob: string;
  patient_email: string;
  patient_phone: string;
  patient_address: string;
  patient_city: string;
  patient_state: string;
  patient_zip: string;
  
  // Clinical Information
  hcv_confirmed: boolean;
  hcv_genotype?: string;
  viral_load?: string;
  fibrosis_stage?: string;
  comorbidities?: string;
  medications?: string;
  notes?: string;
  urgency: 'routine' | 'urgent';
  
  // Insurance Information
  insurance_status: 'insured' | 'uninsured' | 'unknown';
  insurance_provider?: string;
  insurance_id?: string;
  insurance_group?: string;
  
  // Consent
  patient_consent: boolean;
  
  // Status
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'declined';
};

export async function createReferral(data: Omit<ReferralData, 'id' | 'created_at' | 'status'>): Promise<{ id: string } | null> {
  try {
    const { data: referral, error } = await supabase
      .from('referrals')
      .insert({
        ...data,
        status: 'pending'
      })
      .select('id')
      .single();
    
    if (error) {
      console.error('Error creating referral:', error);
      return null;
    }
    
    return referral;
  } catch (error) {
    console.error('Failed to create referral:', error);
    return null;
  }
}

export async function getReferral(id: string): Promise<ReferralData | null> {
  try {
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching referral:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch referral:', error);
    return null;
  }
}

export async function updateReferralStatus(id: string, status: ReferralData['status']): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('referrals')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating referral status:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to update referral status:', error);
    return false;
  }
}