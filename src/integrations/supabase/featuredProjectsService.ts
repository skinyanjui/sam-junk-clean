
import { supabase } from './client';

export interface FeaturedProject {
  id: string;
  title: string;
  location: string;
  description: string;
  image_url: string;
  tags: string[];
  sort_order: number | null;
  created_at: string;
}

export const fetchFeaturedProjects = async (): Promise<FeaturedProject[]> => {
  try {
    // Return mock data since the table doesn't exist yet
    const mockProjects: FeaturedProject[] = [
      {
        id: '1',
        title: 'Estate Cleanout',
        location: 'Evansville, IN',
        description: 'Complete cleanout of a 3,000 sq ft home after an estate sale. Removed furniture, appliances, and household items.',
        image_url: '/placeholder.svg',
        tags: ['Estate', 'Residential', 'Furniture'],
        sort_order: 1,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Office Renovation Debris',
        location: 'Newburgh, IN',
        description: 'Removed construction debris and old office furniture during a commercial office renovation.',
        image_url: '/placeholder.svg',
        tags: ['Commercial', 'Construction', 'Office'],
        sort_order: 2,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Yard Waste Removal',
        location: 'Henderson, KY',
        description: 'Cleared multiple fallen trees and landscaping debris after a storm.',
        image_url: '/placeholder.svg',
        tags: ['Yard Waste', 'Residential', 'Storm Cleanup'],
        sort_order: 3,
        created_at: new Date().toISOString()
      }
    ];
    
    return mockProjects;
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return [];
  }
};
