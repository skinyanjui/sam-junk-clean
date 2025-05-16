
import { supabase } from './client';
import React from 'react'; // Add React import
import type { ServiceData, RelatedBlog } from '@/components/services/servicesData';

// Fetch all services
export const fetchServices = async (): Promise<ServiceData[]> => {
  try {
    // Get all services
    const { data: servicesData, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .order('sort_order');

    if (servicesError) {
      console.error('Error fetching services:', servicesError);
      return [];
    }

    // Get related services for all services
    const { data: relatedServicesData, error: relatedServicesError } = await supabase
      .from('related_services')
      .select('*');

    if (relatedServicesError) {
      console.error('Error fetching related services:', relatedServicesError);
      return [];
    }

    // Get related blogs for all services
    const { data: relatedBlogsData, error: relatedBlogsError } = await supabase
      .from('related_blogs')
      .select('*');

    if (relatedBlogsError) {
      console.error('Error fetching related blogs:', relatedBlogsError);
      return [];
    }

    // Transform the data to match our ServiceData type
    const transformedServices = servicesData.map((service): ServiceData => {
      // Get related services IDs for this service
      const relatedServiceIds = relatedServicesData
        .filter(relation => relation.service_id === service.service_id)
        .map(relation => relation.related_service_id);

      // Get related blogs for this service
      const relatedBlogs: RelatedBlog[] = relatedBlogsData
        .filter(blog => blog.service_id === service.service_id)
        .map(blog => ({
          title: blog.blog_title,
          slug: blog.blog_slug,
        }));

      return {
        id: service.service_id,
        title: service.title,
        description: service.description,
        items: service.items,
        image: service.image,
        relatedBlogs: relatedBlogs,
        relatedServices: relatedServiceIds,
      };
    });

    return transformedServices;
  } catch (error) {
    console.error('Error in fetchServices:', error);
    return [];
  }
};

// Fetch a single service by ID
export const fetchServiceById = async (serviceId: string): Promise<ServiceData | null> => {
  try {
    const { data: service, error } = await supabase
      .from('services')
      .select('*')
      .eq('service_id', serviceId)
      .single();

    if (error) {
      console.error('Error fetching service by ID:', error);
      return null;
    }

    // Get related services for this service
    const { data: relatedServices, error: relatedServicesError } = await supabase
      .from('related_services')
      .select('*')
      .eq('service_id', serviceId);

    if (relatedServicesError) {
      console.error('Error fetching related services:', relatedServicesError);
      return null;
    }

    // Get related blogs for this service
    const { data: relatedBlogs, error: relatedBlogsError } = await supabase
      .from('related_blogs')
      .select('*')
      .eq('service_id', serviceId);

    if (relatedBlogsError) {
      console.error('Error fetching related blogs:', relatedBlogsError);
      return null;
    }

    // Transform to ServiceData type
    const transformedService: ServiceData = {
      id: service.service_id,
      title: service.title,
      description: service.description,
      items: service.items,
      image: service.image,
      relatedBlogs: relatedBlogs.map(blog => ({
        title: blog.blog_title,
        slug: blog.blog_slug,
      })),
      relatedServices: relatedServices.map(rel => rel.related_service_id),
    };

    return transformedService;
  } catch (error) {
    console.error('Error in fetchServiceById:', error);
    return null;
  }
};

// Transform service data for the home page service cards
export const getHomePageServices = async () => {
  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order');

    if (error) {
      console.error('Error fetching services for home page:', error);
      return [];
    }

    // Import the necessary icons from lucide-react
    const { Home, Building, Refrigerator, Hammer, HeartHandshake, Truck } = await import('lucide-react');
    
    // Map icon names to actual React components
    const iconMap: Record<string, any> = {
      'Home': Home,
      'Building': Building,
      'Refrigerator': Refrigerator,
      'Hammer': Hammer,
      'HeartHandshake': HeartHandshake,
      'Truck': Truck
    };
    
    return services.map(service => ({
      title: service.title,
      icon: React.createElement(iconMap[service.icon], { className: "h-8 w-8 text-brand-red mb-2" }),
      description: service.description,
      image: service.image,
      alt: `${service.title} service showing ${service.description.toLowerCase()}`
    }));
  } catch (error) {
    console.error('Error in getHomePageServices:', error);
    return [];
  }
};
