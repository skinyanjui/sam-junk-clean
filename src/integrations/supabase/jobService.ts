import { supabase } from './client';

export interface JobListingDb {
  id: string; // UUID
  title: string;
  type: string | null;
  location: string | null;
  description: string | null;
  requirements: string[] | null;
  benefits: string[] | null;
  is_active: boolean;
  posted_at: string; // TIMESTAMPTZ
  created_at: string; // TIMESTAMPTZ
}

export const fetchActiveJobListings = async (): Promise<JobListingDb[]> => {
  try {
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .eq('is_active', true)
      .order('posted_at', { ascending: false });

    if (error) {
      console.error('Error fetching active job listings:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Supabase call failed for fetchActiveJobListings:', error);
    return [];
  }
};
