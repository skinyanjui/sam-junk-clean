import { supabase } from './client';
import type { ServiceData, RelatedBlog } from '@/components/services/servicesData';

// Type guard to ensure related_blogs is always an array
const ensureRelatedBlogsArray = (blogs: any): RelatedBlog[] => {
  if (Array.isArray(blogs)) {
    return blogs.filter(blog => typeof blog.title === 'string' && typeof blog.slug === 'string');
  }
  return [];
};

// Fetch all services
export const fetchServices = async (): Promise<ServiceData[]> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        id,
        title,
        description,
        items,
        image,
        popularity,
        price_range,
        time_estimate,
        benefits,
        related_blogs,
        related_services_ids,
        created_at,
        updated_at
      `)
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      throw error;
    }

    return (data || []).map(service => ({
      ...service,
      priceRange: service.price_range,
      timeEstimate: service.time_estimate,
      relatedBlogs: ensureRelatedBlogsArray(service.related_blogs),
      relatedServices: service.related_services_ids || [],
    })) as ServiceData[];

  } catch (error) {
    console.error('Error in fetchServices:', error);
    return [];

    // Uncomment this block for mock data testing if DB is not ready
    /*
    return mockServices;
    */
  }
};

// Fetch a single service by ID
export const fetchServiceById = async (serviceId: string): Promise<ServiceData | null> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        id,
        title,
        description,
        items,
        image,
        popularity,
        price_range,
        time_estimate,
        benefits,
        related_blogs,
        related_services_ids,
        created_at,
        updated_at
      `)
      .eq('id', serviceId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.warn(`Service with ID ${serviceId} not found.`);
        return null;
      }
      console.error('Error fetching service by ID:', error);
      throw error;
    }

    if (!data) return null;

    return {
      ...data,
      priceRange: data.price_range,
      timeEstimate: data.time_estimate,
      relatedBlogs: ensureRelatedBlogsArray(data.related_blogs),
      relatedServices: data.related_services_ids || [],
    } as ServiceData;

  } catch (error) {
    console.error('Error in fetchServiceById:', error);
    return null;
  }
};

// Get icon name based on service title
const getIconName = (serviceTitle: string): string => {
  if (serviceTitle.includes('Residential')) return 'Home';
  if (serviceTitle.includes('Commercial')) return 'Building';
  if (serviceTitle.includes('Furniture')) return 'Sofa';
  if (serviceTitle.includes('Appliance')) return 'Refrigerator';
  if (serviceTitle.includes('Mattress')) return 'Bed';
  if (serviceTitle.includes('Gym')) return 'Dumbbell';
  if (serviceTitle.includes('Demolition')) return 'Hammer';
  if (serviceTitle.includes('Construction')) return 'Construction';
  return 'Home';
};

// Transform service data for the home page service cards
export const getHomePageServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        title,
        description,
        image,
        price_range,
        popularity
      `)
      .eq('popularity', 'high')
      .order('title', { ascending: true })
      .limit(8);

    if (error) {
      console.error('Error fetching high popularity services:', error);
      throw error;
    }

    return (data || []).map(service => ({
      title: service.title,
      iconName: getIconName(service.title),
      description: service.description || '',
      image: service.image,
      alt: `${service.title} service showing ${service.description ? service.description.toLowerCase() : 'details'}.`,
      priceRange: service.price_range,
      popularity: service.popularity
    }));
  } catch (error) {
    console.error('Error in getHomePageServices:', error);
    return [];
  }
};
