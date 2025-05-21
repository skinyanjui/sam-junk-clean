
import { supabase } from './client';

export interface BookingTimeSlot {
  id: string;
  time_slot: string;
  is_available: boolean;
  sort_order: number;
}

export interface JobType {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

export const fetchBookingTimeSlots = async (): Promise<BookingTimeSlot[]> => {
  try {
    const { data, error } = await supabase
      .from('booking_time_slots')
      .select('*')
      .eq('is_available', true)
      .order('sort_order');
      
    if (error) {
      console.error('Error fetching booking time slots:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching booking time slots:', error);
    return [];
  }
};

export const fetchJobTypes = async (): Promise<JobType[]> => {
  try {
    const { data, error } = await supabase
      .from('job_types')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
      
    if (error) {
      console.error('Error fetching job types:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching job types:', error);
    return [];
  }
};
