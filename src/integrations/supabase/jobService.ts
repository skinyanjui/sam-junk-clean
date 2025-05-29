
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
    // Since job_listings table doesn't exist, return empty array for now
    // This prevents the app from breaking while job listings functionality is being set up
    console.log('Job listings table not yet created, returning empty array');
    return [];
  } catch (error) {
    console.error('Supabase call failed for fetchActiveJobListings:', error);
    return [];
  }
};
