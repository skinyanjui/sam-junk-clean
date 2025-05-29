
import { supabase } from './client';
import { ServiceData, RelatedBlog } from '@/components/services/servicesData';

export const fetchServices = async (category?: string): Promise<ServiceData[]> => {
  try {
    let query = supabase
      .from('services')
      .select('*')
      .order('popularity', { ascending: false })
      .order('created_at', { ascending: true });

    if (category) {
      query = query.eq('category', category.toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching services:', error);
      throw error;
    }

    // Transform database data to match ServiceData interface
    return (data || []).map(service => ({
      id: service.id,
      title: service.title,
      description: service.description,
      items: service.items || [],
      image: service.image,
      category: service.category,
      popularity: service.popularity as 'high' | 'medium' | 'low' | undefined,
      priceRange: service.price_range,
      timeEstimate: service.time_estimate,
      benefits: service.benefits || [],
      relatedBlogs: Array.isArray(service.related_blogs) ? (service.related_blogs as unknown as RelatedBlog[]) : [],
      relatedServices: service.related_services_ids || []
    }));
  } catch (error) {
    console.error('Error in fetchServices:', error);
    throw error;
  }
};

// Function to get services for home page (limited to 8 items)
export const getHomePageServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('id, title, description, image, category, popularity, price_range')
      .eq('popularity', 'high')
      .limit(8);

    if (error) {
      console.error('Error fetching home page services:', error);
      throw error;
    }

    // Transform to match the expected format for home page
    return (data || []).map(service => ({
      title: service.title,
      iconName: getIconNameFromCategory(service.category),
      description: service.description,
      image: service.image,
      alt: `${service.title} service`,
      priceRange: service.price_range,
      popularity: service.popularity as 'high' | 'medium' | 'low'
    }));
  } catch (error) {
    console.error('Error in getHomePageServices:', error);
    return [];
  }
};

// Helper function to map categories to icon names
const getIconNameFromCategory = (category: string): string => {
  const categoryIconMap: Record<string, string> = {
    'residential': 'Home',
    'commercial': 'Building',
    'furniture': 'Sofa',
    'appliance': 'Refrigerator',
    'construction': 'Construction',
    'estate': 'Home',
    'garage': 'Home'
  };

  // Check if title contains specific keywords for more accurate mapping
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('furniture')) return 'Sofa';
  if (lowerCategory.includes('appliance')) return 'Refrigerator';
  if (lowerCategory.includes('construction')) return 'Construction';
  if (lowerCategory.includes('commercial')) return 'Building';
  
  return categoryIconMap[lowerCategory] || 'Home';
};
