
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
        title: 'Furniture Removal',
        description: 'We remove all types of furniture including sofas, beds, tables, chairs, and more. We make sure items are donated or recycled when possible.',
        items: ['Sofas & Couches', 'Beds & Mattresses', 'Tables & Chairs', 'Cabinets & Shelving', 'Office Furniture'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'What Happens to Your Furniture After Removal', slug: 'furniture-removal-process' }
        ],
        relatedServices: ['1', '5']
      },
      {
        id: '4',
        title: 'Electronic Waste',
        description: 'Proper disposal of electronic waste is crucial for the environment. We ensure all e-waste is recycled or disposed of properly according to regulations.',
        items: ['Computers & Monitors', 'TVs & Entertainment Systems', 'Small Appliances', 'Printers & Office Equipment', 'Cables & Accessories'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'The Importance of E-Waste Recycling', slug: 'e-waste-recycling-importance' }
        ],
        relatedServices: ['2', '6']
      },
      {
        id: '5',
        title: 'Appliance Removal',
        description: 'We safely remove and dispose of old appliances, ensuring they\'re properly recycled or disposed of according to regulations.',
        items: ['Refrigerators', 'Washing Machines', 'Dryers', 'Dishwashers', 'Ovens'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'Appliance Disposal Guide', slug: 'appliance-disposal-guide' }
        ],
        relatedServices: ['1', '3']
      },
      {
        id: '6',
        title: 'Light Demolition',
        description: 'After construction or renovation projects, we help clear out debris and leftover materials to leave your space clean and ready to use.',
        items: ['Drywall', 'Wood', 'Concrete', 'Flooring Materials', 'Fixtures'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'Post-Renovation Cleanup Tips', slug: 'post-renovation-cleanup' }
        ],
        relatedServices: ['2', '7']
      },
      {
        id: '7',
        title: 'Estate Cleanout',
        description: 'We provide compassionate and efficient estate cleanout services to help families during difficult transitions.',
        items: ['Furniture', 'Personal Items', 'Household Goods', 'Clothing', 'Books and Media'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'Estate Cleanout: What to Keep and What to Remove', slug: 'estate-cleanout-guide' }
        ],
        relatedServices: ['1', '3']
      },
      {
        id: '8',
        title: 'Curbside Pickups',
        description: 'For your convenience, we offer curbside pickup services for items you can place at the curb, saving you time and effort.',
        items: ['Bagged Trash', 'Small Furniture', 'Yard Waste', 'Boxes & Packaging', 'Small Appliances'],
        image: '/placeholder.svg',
        relatedBlogs: [
          { title: 'How to Prepare for Curbside Pickup', slug: 'curbside-pickup-preparation' }
        ],
        relatedServices: ['1', '5']
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
    const { Home, Building, Sofa, Smartphone, Refrigerator, Hammer, HeartHandshake, Truck } = await import('lucide-react');
    
    // Map icon names to actual React components
    const iconMap: Record<string, any> = {
      'Home': Home,
      'Building': Building,
      'Sofa': Sofa,
      'Smartphone': Smartphone,
      'Refrigerator': Refrigerator,
      'Hammer': Hammer,
      'HeartHandshake': HeartHandshake,
      'Truck': Truck
    };
    
    // Map an icon to each service (all 8 now)
    const iconNames = ['Home', 'Building', 'Sofa', 'Smartphone', 'Refrigerator', 'Hammer', 'HeartHandshake', 'Truck'];
    
    return mockServices.map((service, index) => ({
      title: service.title,
      icon: React.createElement(iconMap[iconNames[index]], { className: "h-6 w-6 text-brand-red mb-1" }),
      description: service.description,
      image: service.image,
      alt: `${service.title} service showing ${service.description.toLowerCase()}`
    }));
  } catch (error) {
    console.error('Error in getHomePageServices:', error);
    return [];
  }
};
