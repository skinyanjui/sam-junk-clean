
import { supabase } from './client';
import React from 'react';
import type { ServiceData, RelatedBlog } from '@/components/services/servicesData';
import { 
  Home, Building, Sofa, Smartphone, Refrigerator, Hammer, HeartHandshake, Truck,
  Bed, HotTub, Warehouse, Dumbbell, Leaf, Construction, Recycle, Gift
} from 'lucide-react';

// Fetch all services
export const fetchServices = async (): Promise<ServiceData[]> => {
  try {
    // Return mock data since the table doesn't exist in the current database
    const mockServices: ServiceData[] = [
      {
        id: '1',
        title: 'Residential Junk Removal',
        description: 'We help homeowners clear out unwanted items from their properties, including furniture, appliances, general household junk, and more.',
        items: ['Full house cleanouts', 'Single item removal', 'Garage & attic cleanouts', 'Basement cleanups', 'Moving & relocation junk'],
        image: '/placeholder.svg',
        popularity: 'high',
        priceRange: '$99 - $650+',
        timeEstimate: '1-4 hours',
        benefits: ['Same-day service available', 'Eco-friendly disposal', 'No hidden fees'],
        relatedBlogs: [
          { title: 'How to Prepare for Residential Junk Removal', slug: 'prepare-for-junk-removal' },
          { title: 'Top 5 Items People Remove From Their Homes', slug: 'top-5-removal-items' }
        ],
        relatedServices: ['3', '4', '9']
      },
      {
        id: '2',
        title: 'Commercial Junk Removal',
        description: 'Our commercial services help businesses maintain clean, safe, and efficient workspaces by removing office furniture, equipment, and renovation debris.',
        items: ['Office cleanouts', 'Retail space clearing', 'Construction debris removal', 'Equipment disposal', 'Commercial renovations'],
        image: '/placeholder.svg',
        popularity: 'high',
        priceRange: '$149 - $850+',
        timeEstimate: '2-8 hours',
        benefits: ['Minimal business disruption', 'Work with your schedule', 'Proper recycling and disposal'],
        relatedBlogs: [
          { title: 'Keeping Your Business Clean and Organized', slug: 'business-organization' },
          { title: 'Office Cleanout Tips for Businesses', slug: 'office-cleanout-tips' }
        ],
        relatedServices: ['12', '11', '13']
      },
      {
        id: '3',
        title: 'Furniture Removal',
        description: 'We remove all types of furniture including sofas, beds, tables, chairs, and more. We make sure items are donated or recycled when possible.',
        items: ['Sofas & couches', 'Beds & mattresses', 'Tables & chairs', 'Cabinets & shelving', 'Office furniture'],
        image: '/placeholder.svg',
        popularity: 'high',
        priceRange: '$75 - $350+',
        timeEstimate: '30 min - 2 hours',
        benefits: ['Careful handling', 'Donation options available', 'No need to move items yourself'],
        relatedBlogs: [
          { title: 'What Happens to Your Furniture After Removal', slug: 'furniture-removal-process' },
          { title: 'Sustainable Furniture Disposal Guide', slug: 'sustainable-furniture-disposal' }
        ],
        relatedServices: ['1', '4', '13']
      },
      {
        id: '4',
        title: 'Large Appliance Removal',
        description: 'We safely remove and dispose of old appliances, ensuring they\'re properly recycled or disposed of according to regulations.',
        items: ['Refrigerators & freezers', 'Washing machines & dryers', 'Dishwashers', 'Ovens & stoves', 'Water heaters'],
        image: '/placeholder.svg',
        popularity: 'high',
        priceRange: '$75 - $250',
        timeEstimate: '30 min - 1 hour',
        benefits: ['Eco-friendly disposal', 'Proper handling of hazardous materials', 'All sizes accommodated'],
        relatedBlogs: [
          { title: 'Appliance Disposal Guide', slug: 'appliance-disposal-guide' },
          { title: 'Why Proper Appliance Recycling Matters', slug: 'appliance-recycling-importance' }
        ],
        relatedServices: ['1', '8', '11']
      },
      {
        id: '5',
        title: 'Mattress Removal',
        description: 'We provide environmentally responsible mattress disposal, ensuring your old mattresses are recycled or properly disposed of.',
        items: ['King & Queen mattresses', 'Full & Twin mattresses', 'Box springs', 'Memory foam mattresses', 'Futons & sofa beds'],
        image: '/placeholder.svg',
        popularity: 'medium',
        priceRange: '$75 - $175',
        timeEstimate: '15-30 minutes',
        benefits: ['Eco-friendly recycling', 'Quick removal', 'Hygienic handling'],
        relatedBlogs: [
          { title: 'How to Dispose of Mattresses Properly', slug: 'mattress-disposal-guide' }
        ],
        relatedServices: ['3', '1']
      },
      {
        id: '6',
        title: 'Hot Tub Removal',
        description: 'Removing a hot tub is complicated work. Our team has the experience and equipment to safely remove and dispose of your unwanted hot tub.',
        items: ['Above-ground hot tubs', 'In-ground hot tubs', 'Spa demolition', 'Hot tub base removal', 'Complete disposal'],
        image: '/placeholder.svg',
        popularity: 'low',
        priceRange: '$350 - $700',
        timeEstimate: '2-4 hours',
        benefits: ['Professional dismantling', 'Complete removal of all components', 'Site cleanup included'],
        relatedBlogs: [
          { title: 'Hot Tub Removal Process Explained', slug: 'hot-tub-removal-guide' }
        ],
        relatedServices: ['10', '9']
      },
      {
        id: '7',
        title: 'Shed Removal',
        description: 'From small garden sheds to larger outdoor structures, we can dismantle and remove any unwanted sheds from your property.',
        items: ['Wood sheds', 'Metal sheds', 'Plastic sheds', 'Large storage structures', 'Greenhouse removal'],
        image: '/placeholder.svg',
        popularity: 'low',
        priceRange: '$200 - $600',
        timeEstimate: '1-3 hours',
        benefits: ['Complete dismantling', 'Foundation removal available', 'All debris hauled away'],
        relatedBlogs: [
          { title: 'Preparing for Shed Removal: What You Need to Know', slug: 'shed-removal-preparation' }
        ],
        relatedServices: ['10', '12', '9']
      },
      {
        id: '8',
        title: 'Gym Equipment Removal',
        description: 'Heavy gym equipment is difficult to move. Let our professionals safely remove and dispose of your unwanted fitness equipment.',
        items: ['Treadmills', 'Elliptical machines', 'Weight benches', 'Home gyms', 'Free weights & racks'],
        image: '/placeholder.svg',
        popularity: 'medium',
        priceRange: '$100 - $350',
        timeEstimate: '30 min - 2 hours',
        benefits: ['Safe handling of heavy equipment', 'No damage to your home', 'Donation options available'],
        relatedBlogs: [
          { title: 'What to Do With Old Gym Equipment', slug: 'old-gym-equipment-options' }
        ],
        relatedServices: ['11', '13']
      },
      {
        id: '9',
        title: 'Yard Waste Removal',
        description: 'We help clear your yard of debris, branches, leaves, and other organic waste, leaving your outdoor space clean and tidy.',
        items: ['Tree branches & limbs', 'Leaves & garden waste', 'Grass clippings', 'Bushes & shrub removal', 'Soil & dirt removal'],
        image: '/placeholder.svg',
        popularity: 'medium',
        priceRange: '$125 - $450',
        timeEstimate: '1-3 hours',
        benefits: ['Eco-friendly disposal', 'Composting options', 'Complete cleanup'],
        relatedBlogs: [
          { title: 'Seasonal Yard Cleanup Guide', slug: 'seasonal-yard-cleanup' }
        ],
        relatedServices: ['10', '12']
      },
      {
        id: '10',
        title: 'Light Demolition',
        description: 'After construction or renovation projects, we help clear out debris and leftover materials to leave your space clean and ready to use.',
        items: ['Deck & patio removal', 'Shed & playset demolition', 'Fence teardown', 'Kitchen & bathroom demolition', 'Drywall removal'],
        image: '/placeholder.svg',
        popularity: 'medium',
        priceRange: '$250 - $750+',
        timeEstimate: '2-6 hours',
        benefits: ['Professional tools & equipment', 'Safe demolition practices', 'Complete debris removal'],
        relatedBlogs: [
          { title: 'Post-Renovation Cleanup Tips', slug: 'post-renovation-cleanup' },
          { title: 'DIY vs Professional Demolition', slug: 'diy-vs-pro-demolition' }
        ],
        relatedServices: ['12', '7', '6']
      },
      {
        id: '11',
        title: 'Scrap Removal',
        description: 'We collect and properly dispose of scrap metal, appliances, and other recyclable materials from your home or business.',
        items: ['Metal scrap', 'Appliances', 'Electronics', 'Automotive parts', 'Plumbing fixtures'],
        image: '/placeholder.svg',
        popularity: 'low',
        priceRange: '$100 - $400',
        timeEstimate: '1-3 hours',
        benefits: ['Environmentally responsible recycling', 'Proper sorting of materials', 'Potential rebates for valuable metals'],
        relatedBlogs: [
          { title: 'Scrap Metal Recycling Guide', slug: 'scrap-metal-recycling' }
        ],
        relatedServices: ['4', '8', '12']
      },
      {
        id: '12',
        title: 'Construction Debris Removal',
        description: 'We handle the cleanup of construction and renovation sites, removing debris, materials, and waste for a clean workspace.',
        items: ['Wood & lumber scraps', 'Drywall & plaster', 'Concrete & brick', 'Tile & flooring', 'Packaging materials'],
        image: '/placeholder.svg',
        popularity: 'high',
        priceRange: '$200 - $850+',
        timeEstimate: '1-8 hours',
        benefits: ['Efficient site cleanup', 'Sorting of recyclable materials', 'Responsible disposal'],
        relatedBlogs: [
          { title: 'Managing Construction Waste Efficiently', slug: 'construction-waste-management' }
        ],
        relatedServices: ['2', '10', '9']
      },
      {
        id: '13',
        title: 'Donation Pick Up',
        description: 'We collect and transport your gently used items to local charities, helping your unwanted possessions find new homes.',
        items: ['Furniture', 'Clothing & textiles', 'Books & media', 'Kitchen items', 'Small appliances'],
        image: '/placeholder.svg',
        popularity: 'medium',
        priceRange: '$75 - $300',
        timeEstimate: '30 min - 2 hours',
        benefits: ['Tax deduction receipts', 'Supporting local charities', 'Environmentally friendly'],
        relatedBlogs: [
          { title: 'Donation Guide: What Can and Cannot Be Donated', slug: 'donation-guidelines' }
        ],
        relatedServices: ['3', '1', '8']
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
    
    // Select the 8 most important services to display on the homepage
    // Typically high popularity services and most common services
    const homePageServiceIds = ['1', '2', '3', '4', '5', '8', '10', '12'];
    const homePageServices = mockServices.filter(service => homePageServiceIds.includes(service.id));
    
    // Map icons to each service
    return homePageServices.map(service => {
      // Determine which icon to use based on the service title
      let icon;
      if (service.title.includes('Residential')) {
        icon = <Home className="h-6 w-6 text-brand-red mb-1" />;
      } else if (service.title.includes('Commercial')) {
        icon = <Building className="h-6 w-6 text-brand-red mb-1" />;
      } else if (service.title.includes('Furniture')) {
        icon = <Sofa className="h-6 w-6 text-brand-red mb-1" />;
      } else if (service.title.includes('Appliance')) {
        icon = <Refrigerator className="h-6 w-6 text-brand-red mb-1" />;
      } else if (service.title.includes('Mattress')) {
        icon = <Bed className="h-6 w-6 text-brand-red mb-1" />;
      } else if (service.title.includes('Gym')) {
        icon = <Dumbbell className="h-6 w-6 text-brand-red mb-1" />;
      } else if (service.title.includes('Demolition')) {
        icon = <Hammer className="h-6 w-6 text-brand-red mb-1" />;
      } else if (service.title.includes('Construction')) {
        icon = <Construction className="h-6 w-6 text-brand-red mb-1" />;
      }

      return {
        title: service.title,
        icon: icon,
        description: service.description,
        image: service.image,
        alt: `${service.title} service showing ${service.description.toLowerCase()}`
      };
    });
  } catch (error) {
    console.error('Error in getHomePageServices:', error);
    return [];
  }
};
