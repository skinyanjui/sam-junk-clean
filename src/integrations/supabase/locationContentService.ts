
import { supabase } from './client';

export interface LocationContent {
  id: string;
  city: string;
  state: string;
  zipCodes: string[];
  serviceAreas: string[];
  localKeywords: string[];
  description: string;
  specialOffers?: string;
  testimonials: string[];
  businessHours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  demographics: {
    population: number;
    averageIncome: string;
    housingType: string;
  };
  localLandmarks: string[];
  competitorAdvantages: string[];
}

export const fetchLocationContent = async (): Promise<LocationContent[]> => {
  try {
    // Mock comprehensive location data for Tri-State area
    const locationData: LocationContent[] = [
      {
        id: '1',
        city: 'Evansville',
        state: 'Indiana',
        zipCodes: ['47710', '47711', '47712', '47713', '47714', '47715', '47716', '47717', '47719', '47720', '47721', '47722', '47724', '47725', '47728', '47732', '47733', '47734', '47735', '47737', '47740', '47741', '47744', '47747', '47750'],
        serviceAreas: ['Evansville', 'West Side', 'East Side', 'North Side', 'Lamasco', 'McCutchanville', 'Darmstadt', 'Elberfeld'],
        localKeywords: ['junk removal evansville', 'furniture removal evansville', 'appliance removal evansville', 'construction debris removal evansville', 'estate cleanout evansville'],
        description: 'Premier junk removal services in Evansville, Indiana. Serving all neighborhoods from the historic downtown to growing suburban areas.',
        specialOffers: '15% discount for first-time customers in Evansville area',
        testimonials: ['1', '3', '5'],
        businessHours: {
          weekday: '7:00 AM - 7:00 PM',
          saturday: '8:00 AM - 5:00 PM',
          sunday: 'Emergency calls only'
        },
        demographics: {
          population: 118414,
          averageIncome: '$45,000',
          housingType: 'Mix of historic homes and modern subdivisions'
        },
        localLandmarks: ['Roberts Municipal Stadium', 'Mesker Park Zoo', 'University of Evansville', 'Tropicana Casino', 'Ford Center'],
        competitorAdvantages: ['Only veteran-owned junk removal in Evansville', 'Highest recycling rate in the area', 'Same-day service available']
      },
      {
        id: '2',
        city: 'Henderson',
        state: 'Kentucky',
        zipCodes: ['42420', '42419'],
        serviceAreas: ['Henderson', 'Robards', 'Spottsville', 'Reed', 'Zion'],
        localKeywords: ['junk removal henderson ky', 'furniture removal henderson', 'appliance removal henderson', 'yard debris removal henderson'],
        description: 'Reliable junk removal services in Henderson, Kentucky. Supporting the Green River community with eco-friendly disposal solutions.',
        specialOffers: '10% discount for veterans and seniors in Henderson area',
        testimonials: ['2', '6'],
        businessHours: {
          weekday: '7:00 AM - 7:00 PM',
          saturday: '8:00 AM - 5:00 PM',
          sunday: 'Emergency calls only'
        },
        demographics: {
          population: 28757,
          averageIncome: '$42,000',
          housingType: 'Primarily single-family homes and rural properties'
        },
        localLandmarks: ['Henderson Fine Arts Center', 'Audubon State Park', 'Green River', 'Henderson County Fairgrounds'],
        competitorAdvantages: ['Cross-state service availability', 'Rural property expertise', 'Agricultural debris specialists']
      },
      {
        id: '3',
        city: 'Newburgh',
        state: 'Indiana',
        zipCodes: ['47630'],
        serviceAreas: ['Newburgh', 'Chandler', 'Boonville', 'Yankeetown', 'Tennyson'],
        localKeywords: ['junk removal newburgh', 'furniture removal warrick county', 'appliance removal newburgh', 'construction cleanup newburgh'],
        description: 'Professional junk removal services in Newburgh and Warrick County. Supporting growing communities along the Ohio River.',
        testimonials: ['3'],
        businessHours: {
          weekday: '7:00 AM - 7:00 PM',
          saturday: '8:00 AM - 5:00 PM',
          sunday: 'Emergency calls only'
        },
        demographics: {
          population: 3325,
          averageIncome: '$55,000',
          housingType: 'Newer suburban developments and riverfront properties'
        },
        localLandmarks: ['Ohio River', 'Angel Mounds State Historic Site', 'Warrick County Museum', 'Newburgh Historic District'],
        competitorAdvantages: ['Specialized in new construction cleanup', 'Riverfront property expertise', 'Historic district preservation experience']
      }
    ];
    
    return locationData;
  } catch (error) {
    console.error('Error fetching location content:', error);
    return [];
  }
};

export const fetchLocationByCity = async (city: string): Promise<LocationContent | null> => {
  try {
    const locations = await fetchLocationContent();
    return locations.find(location => location.city.toLowerCase() === city.toLowerCase()) || null;
  } catch (error) {
    console.error(`Error fetching location content for ${city}:`, error);
    return null;
  }
};
