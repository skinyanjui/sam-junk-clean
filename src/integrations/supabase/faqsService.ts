
import { supabase } from './client';

export interface FaqCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number | null;
  created_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category_id: string | null;
  sort_order: number | null;
  created_at: string;
  category?: FaqCategory; // Joined category data
}

export const fetchFaqs = async (categorySlug?: string): Promise<Faq[]> => {
  try {
    // Return mock data since the table doesn't exist yet
    const mockFaqs: Faq[] = [
      {
        id: '1',
        question: 'How much does junk removal cost?',
        answer: 'Our pricing is based on the volume of items you need removed. We offer free on-site estimates before any work begins.',
        category_id: '1',
        sort_order: 1,
        created_at: new Date().toISOString(),
        category: {
          id: '1',
          name: 'Pricing',
          slug: 'pricing',
          sort_order: 1,
          created_at: new Date().toISOString()
        }
      },
      {
        id: '2',
        question: 'What items can you remove?',
        answer: 'We remove almost everything including furniture, appliances, electronics, yard waste, construction debris, and more. Call us for specific items.',
        category_id: '2',
        sort_order: 1,
        created_at: new Date().toISOString(),
        category: {
          id: '2',
          name: 'Services',
          slug: 'services',
          sort_order: 2,
          created_at: new Date().toISOString()
        }
      },
      {
        id: '3',
        question: 'How quickly can you come out?',
        answer: 'We offer same-day and next-day service in most areas. Contact us for availability in your location.',
        category_id: '3',
        sort_order: 1,
        created_at: new Date().toISOString(),
        category: {
          id: '3',
          name: 'Scheduling',
          slug: 'scheduling',
          sort_order: 3,
          created_at: new Date().toISOString()
        }
      }
    ];
    
    if (categorySlug) {
      return mockFaqs.filter(faq => faq.category?.slug === categorySlug);
    }
    
    return mockFaqs;
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    return [];
  }
};

export const fetchFaqCategories = async (): Promise<FaqCategory[]> => {
  try {
    // Return mock data since the table doesn't exist yet
    const mockCategories: FaqCategory[] = [
      {
        id: '1',
        name: 'Pricing',
        slug: 'pricing',
        sort_order: 1,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Services',
        slug: 'services',
        sort_order: 2,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Scheduling',
        slug: 'scheduling',
        sort_order: 3,
        created_at: new Date().toISOString()
      }
    ];
    
    return mockCategories;
  } catch (error) {
    console.error('Failed to fetch FAQ categories:', error);
    return [];
  }
};
