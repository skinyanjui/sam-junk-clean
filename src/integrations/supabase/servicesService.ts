
import { supabase } from './client';
import React from 'react'; // Add React import
import type { ServiceData, RelatedBlog } from '@/components/services/servicesData';

// Fetch all services
export const fetchServices = async (): Promise<ServiceData[]> => {
  try {
    // Return mock data since the table doesn't exist in the current database
    const mockServices: ServiceData[] = [
      {
        id: '1',
        title: 'Residential Junk Removal',
        description: 'We help homeowners clear out unwanted items from their properties, including furniture, appliances, and general household junk.',
        items: ['Furniture', 'Appliances', 'Electronics', 'Yard Waste', 'Construction Debris'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'How to Prepare for Junk Removal', slug: 'prepare-for-junk-removal' },
          { title: 'Top 5 Items People Remove From Their Homes', slug: 'top-5-removal-items' }
        ],
        relatedServices: ['2', '3']
      },
      {
        id: '2',
        title: 'Commercial Junk Removal',
        description: 'Our commercial services help businesses maintain clean, safe, and efficient workspaces by removing office furniture, equipment, and renovation debris.',
        items: ['Office Furniture', 'Electronic Waste', 'Office Equipment', 'Renovation Debris', 'Commercial Appliances'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'Keeping Your Business Clean and Organized', slug: 'business-organization' }
        ],
        relatedServices: ['1', '4']
      },
      {
        id: '3',
        title: 'Appliance Removal',
        description: 'We safely remove and dispose of old appliances, ensuring they\'re properly recycled or disposed of according to regulations.',
        items: ['Refrigerators', 'Washing Machines', 'Dryers', 'Dishwashers', 'Ovens'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'Appliance Disposal Guide', slug: 'appliance-disposal-guide' }
        ],
        relatedServices: ['1', '5']
      },
      {
        id: '4',
        title: 'Construction Debris Removal',
        description: 'After construction or renovation projects, we help clear out debris and leftover materials to leave your space clean and ready to use.',
        items: ['Drywall', 'Wood', 'Concrete', 'Flooring Materials', 'Fixtures'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'Post-Renovation Cleanup Tips', slug: 'post-renovation-cleanup' }
        ],
        relatedServices: ['2', '5']
      },
      {
        id: '5',
        title: 'Estate Cleanout',
        description: 'We provide compassionate and efficient estate cleanout services to help families during difficult transitions.',
        items: ['Furniture', 'Personal Items', 'Household Goods', 'Clothing', 'Books and Media'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'Estate Cleanout: What to Keep and What to Remove', slug: 'estate-cleanout-guide' }
        ],
        relatedServices: ['1', '3']
      }
    ];

    return mockServices;
  } catch (error) {
    console.error('Error in fetchServices:', error);
    return [];
  }
};

// Fetch a single service by ID
export const fetchServiceById = async (serviceId: string): Promise<ServiceData | null> => {
  try {
    // Find the service in our mock data
    const mockServices = await fetchServices();
    const service = mockServices.find(s => s.id === serviceId);
    
    if (!service) {
      return null;
    }

    return service;
  } catch (error) {
    console.error('Error in fetchServiceById:', error);
    return null;
  }
};

// Transform service data for the home page service cards
export const getHomePageServices = async () => {
  try {
    // Get our mock services
    const mockServices = await fetchServices();
    
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
    
    // Map an icon to each service
    const iconNames = ['Home', 'Building', 'Refrigerator', 'Hammer', 'HeartHandshake'];
    
    return mockServices.slice(0, 5).map((service, index) => ({
      title: service.title,
      icon: React.createElement(iconMap[iconNames[index]], { className: "h-8 w-8 text-brand-red mb-2" }),
      description: service.description,
      image: service.image,
      alt: `${service.title} service showing ${service.description.toLowerCase()}`
    }));
  } catch (error) {
    console.error('Error in getHomePageServices:', error);
    return [];
  }
};
