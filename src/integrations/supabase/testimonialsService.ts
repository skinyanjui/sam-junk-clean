
import { supabase } from './client';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  sort_order: number | null;
  created_at: string;
  date?: string;
  service_type?: string;
  verified?: boolean;
  source?: 'google' | 'yelp' | 'facebook' | 'direct';
}

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    // Enhanced mock testimonials data with more realistic and diverse reviews
    const mockTestimonials: Testimonial[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        location: 'Evansville, IN',
        quote: 'Uncle Sam Junk Removal exceeded my expectations! They cleared out my entire garage in under 2 hours and donated items that were still in good condition. Professional, efficient, and eco-friendly.',
        rating: 5,
        sort_order: 1,
        created_at: new Date().toISOString(),
        date: '2 weeks ago',
        service_type: 'Residential Cleanout',
        verified: true,
        source: 'google'
      },
      {
        id: '2',
        name: 'Michael Rodriguez',
        location: 'Henderson, KY',
        quote: 'Called them for same-day service and they delivered! Removed an old hot tub and cleaned up everything perfectly. Fair pricing and no hidden fees. Highly recommend!',
        rating: 5,
        sort_order: 2,
        created_at: new Date().toISOString(),
        date: '1 month ago',
        service_type: 'Hot Tub Removal',
        verified: true,
        source: 'yelp'
      },
      {
        id: '3',
        name: 'Jennifer Williams',
        location: 'Newburgh, IN',
        quote: 'After my renovation, I had debris everywhere. Uncle Sam\'s team came in and made it look like the mess never happened. Professional service from a veteran-owned business I can trust.',
        rating: 5,
        sort_order: 3,
        created_at: new Date().toISOString(),
        date: '3 weeks ago',
        service_type: 'Construction Debris',
        verified: true,
        source: 'facebook'
      },
      {
        id: '4',
        name: 'David Thompson',
        location: 'Owensboro, KY',
        quote: 'Needed furniture removal for my office relocation. They were punctual, careful with our building, and even helped rearrange some items. Great customer service!',
        rating: 5,
        sort_order: 4,
        created_at: new Date().toISOString(),
        date: '1 week ago',
        service_type: 'Commercial Furniture',
        verified: true,
        source: 'google'
      },
      {
        id: '5',
        name: 'Lisa Chen',
        location: 'Evansville, IN',
        quote: 'Used them for appliance removal when I upgraded my kitchen. They handled my old refrigerator and dishwasher with care and disposed of them responsibly. Will use again!',
        rating: 4,
        sort_order: 5,
        created_at: new Date().toISOString(),
        date: '5 days ago',
        service_type: 'Appliance Removal',
        verified: true,
        source: 'direct'
      },
      {
        id: '6',
        name: 'Robert Martinez',
        location: 'Princeton, IN',
        quote: 'Estate cleanout after my father passed. The team was respectful, compassionate, and thorough. They made a difficult time a little easier. Thank you for your service.',
        rating: 5,
        sort_order: 6,
        created_at: new Date().toISOString(),
        date: '2 months ago',
        service_type: 'Estate Cleanout',
        verified: true,
        source: 'yelp'
      },
      {
        id: '7',
        name: 'Amanda Foster',
        location: 'Mt. Vernon, IN',
        quote: 'Gym equipment removal was handled perfectly. Heavy treadmill and weight equipment removed without any damage to my home. Professional and strong team!',
        rating: 5,
        sort_order: 7,
        created_at: new Date().toISOString(),
        date: '10 days ago',
        service_type: 'Gym Equipment',
        verified: true,
        source: 'facebook'
      },
      {
        id: '8',
        name: 'James Patterson',
        location: 'Henderson, KY',
        quote: 'Same-day mattress pickup when my new one arrived early. Quick, professional, and they even cleaned up the packaging. Excellent service!',
        rating: 4,
        sort_order: 8,
        created_at: new Date().toISOString(),
        date: '4 days ago',
        service_type: 'Mattress Removal',
        verified: true,
        source: 'google'
      }
    ];
    
    return mockTestimonials;
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return [];
  }
};

// Fetch testimonials by service type
export const fetchTestimonialsByService = async (serviceType: string): Promise<Testimonial[]> => {
  try {
    const allTestimonials = await fetchTestimonials();
    return allTestimonials.filter(testimonial => 
      testimonial.service_type?.toLowerCase().includes(serviceType.toLowerCase())
    );
  } catch (error) {
    console.error('Failed to fetch testimonials by service:', error);
    return [];
  }
};

// Fetch featured testimonials (highest rated, most recent)
export const fetchFeaturedTestimonials = async (limit: number = 3): Promise<Testimonial[]> => {
  try {
    const allTestimonials = await fetchTestimonials();
    return allTestimonials
      .filter(testimonial => testimonial.rating === 5)
      .slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch featured testimonials:', error);
    return [];
  }
};
