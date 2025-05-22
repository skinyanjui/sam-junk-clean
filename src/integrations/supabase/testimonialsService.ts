
import { supabase } from './client';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  sort_order: number | null;
  created_at: string;
  date?: string; // Added date property as optional
}

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    // Since the testimonials table doesn't exist yet, return mock data
    console.warn("The testimonials table doesn't exist yet. Returning mock data");
    
    // Mock testimonials data with date field added
    const mockTestimonials: Testimonial[] = [
      {
        id: '1',
        name: 'John Smith',
        location: 'Evansville, IN',
        quote: 'Uncle Sam Junk Removal made cleaning out my garage so easy. Their team was professional and efficient.',
        rating: 5,
        sort_order: 1,
        created_at: new Date().toISOString(),
        date: '2 weeks ago'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        location: 'Newburgh, IN',
        quote: 'I was amazed by how quickly they cleared out all my old furniture. Great service at a reasonable price.',
        rating: 5,
        sort_order: 2,
        created_at: new Date().toISOString(),
        date: '1 month ago'
      },
      {
        id: '3',
        name: 'Michael Williams',
        location: 'Henderson, KY',
        quote: 'After my renovation, they removed all the debris without any hassle. I\'ll definitely be using them again.',
        rating: 4,
        sort_order: 3,
        created_at: new Date().toISOString(),
        date: '3 weeks ago'
      }
    ];
    
    return mockTestimonials;
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return [];
  }
};
