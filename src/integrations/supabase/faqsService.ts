
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
    // Use type assertion for now until database schema is updated
    let query = supabase
      .from('faqs')
      .select(`
        *,
        category:category_id(id, name, slug, sort_order, created_at)
      `)
      .order('sort_order', { ascending: true }) as any;
    
    if (categorySlug) {
      query = query.eq('category.slug', categorySlug);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
    
    return data as Faq[] || [];
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    return [];
  }
};

export const fetchFaqCategories = async (): Promise<FaqCategory[]> => {
  try {
    // Use type assertion for now until database schema is updated
    const { data, error } = await supabase
      .from('faq_categories')
      .select('*')
      .order('sort_order', { ascending: true }) as any;
    
    if (error) {
      console.error('Error fetching FAQ categories:', error);
      throw error;
    }
    
    return data as FaqCategory[] || [];
  } catch (error) {
    console.error('Failed to fetch FAQ categories:', error);
    return [];
  }
};
