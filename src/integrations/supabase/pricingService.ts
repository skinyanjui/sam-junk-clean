import { supabase } from './client';

export interface PricingTier {
  id: string;
  tier_name: string;
  min_price: number;
  max_price: number;
  price_display: string;
  description: string;
  fill_level: string;
  fill_percentage: number;
  sort_order: number;
}

export interface AddOnService {
  id: string;
  service_name: string;
  description: string | null;
  min_fee: number;
  max_fee: number | null;
  fee_display: string;
  sort_order: number;
}

export interface IncludedService {
  id: string;
  service_name: string;
  description: string | null;
  icon: string;
  sort_order: number;
  section: string;
  created_at: string;
}

// Extended interface for frontend display with additional UI properties
export interface PricingTierDisplay extends PricingTier {
  features?: string[];
  popular?: boolean;
}

/**
 * Fetches all pricing tiers from the database
 * @returns Array of pricing tiers sorted by sort_order
 */
export async function fetchPricingTiers(): Promise<PricingTier[]> {
  try {
    const { data, error } = await supabase
      .from('pricing_tiers')
      .select('*')
      .order('sort_order');
    
    if (error) {
      console.error('Error fetching pricing tiers:', error);
      // Return mock data since the table doesn't exist yet
      return getDefaultPricingTiers();
    }
    
    return data && data.length > 0 ? data : getDefaultPricingTiers();
  } catch (error) {
    console.error('Failed to fetch pricing tiers:', error);
    return getDefaultPricingTiers();
  }
}

// Default pricing tiers with the new full truck load tier
function getDefaultPricingTiers(): PricingTier[] {
  return [
    {
      id: '1',
      tier_name: '1/8 Truck Load',
      min_price: 75,
      max_price: 125,
      price_display: '$75-$125',
      description: 'Small items like a few boxes or a small piece of furniture',
      fill_level: '12.5%',
      fill_percentage: 12.5,
      sort_order: 1
    },
    {
      id: '2',
      tier_name: '1/4 Truck Load',
      min_price: 125,
      max_price: 175,
      price_display: '$125-$175',
      description: 'Equivalent to a small bedroom worth of items',
      fill_level: '25%',
      fill_percentage: 25,
      sort_order: 2
    },
    {
      id: '3', 
      tier_name: '1/2 Truck Load',
      min_price: 250,
      max_price: 350,
      price_display: '$250-$350',
      description: 'Half a truck of junk or debris',
      fill_level: '50%',
      fill_percentage: 50,
      sort_order: 3
    },
    {
      id: '4',
      tier_name: '3/4 Truck Load',
      min_price: 350,
      max_price: 450,
      price_display: '$350-$450',
      description: 'Three-quarters of a truck full',
      fill_level: '75%',
      fill_percentage: 75,
      sort_order: 4
    },
    {
      id: '5',
      tier_name: 'Full Truck Load',
      min_price: 450,
      max_price: 550,
      price_display: '$450-$550',
      description: 'A completely full truck',
      fill_level: '100%',
      fill_percentage: 100,
      sort_order: 5
    },
    {
      id: '6',
      tier_name: 'XL Truck Load',
      min_price: 550,
      max_price: 850,
      price_display: '$550-$850',
      description: 'Oversized items or extremely heavy full loads',
      fill_level: '100%',
      fill_percentage: 100,
      sort_order: 6
    }
  ];
}

/**
 * Fetches a specific pricing tier by ID
 * @param id The pricing tier ID
 * @returns The pricing tier or null if not found
 */
export async function fetchPricingTierById(id: string): Promise<PricingTier | null> {
  try {
    const { data, error } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching pricing tier ${id}:`, error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch pricing tier ${id}:`, error);
    return null;
  }
}

/**
 * Fetches all add-on services from the database
 * @returns Array of add-on services sorted by sort_order
 */
export async function fetchAddOnServices(): Promise<AddOnService[]> {
  try {
    const { data, error } = await supabase
      .from('add_on_services')
      .select('*')
      .order('sort_order');
    
    if (error) {
      console.error('Error fetching add-on services:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch add-on services:', error);
    return [];
  }
}

/**
 * Fetches all included services for a specific section
 * @param section The section to fetch services for (default: 'pricing')
 * @returns Array of included services sorted by sort_order
 */
export async function fetchIncludedServices(section: string = 'pricing'): Promise<IncludedService[]> {
  try {
    const { data, error } = await supabase
      .from('included_services')
      .select('*')
      .eq('section', section)
      .order('sort_order');
    
    if (error) {
      console.error(`Error fetching included services for section ${section}:`, error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error(`Failed to fetch included services for section ${section}:`, error);
    return [];
  }
}

/**
 * Prepares pricing tiers for display in the overview component
 * @returns Array of pricing tiers with display properties
 */
export function preparePricingTiersForOverview(tiers: PricingTier[]): PricingTierDisplay[] {
  if (tiers.length < 3) return [];
  
  // Group the tiers into small, medium, and large categories
  const smallTiers = tiers.filter(t => t.fill_percentage <= 25);
  const mediumTiers = tiers.filter(t => t.fill_percentage > 25 && t.fill_percentage < 75);
  const largeTiers = tiers.filter(t => t.fill_percentage >= 75);
  
  return [
    {
      ...smallTiers[0],
      tier_name: 'Small Loads',
      description: smallTiers.length > 1 
        ? `${smallTiers[0].tier_name} to ${smallTiers[smallTiers.length-1].tier_name}` 
        : smallTiers[0].description,
      features: [
        'Furniture pieces', 
        'Appliance removal', 
        'Small cleanouts', 
        'Quick, single-item pickups'
      ],
      popular: false
    },
    {
      ...(mediumTiers[0] || tiers[Math.floor(tiers.length / 2)]),
      tier_name: 'Medium Loads',
      description: mediumTiers.length > 1 
        ? `${mediumTiers[0].tier_name} to ${mediumTiers[mediumTiers.length-1].tier_name}` 
        : (mediumTiers[0]?.description || '1/4 to 3/4 truck loads'),
      features: [
        'Room renovations', 
        'Basement cleanouts', 
        'Multi-item removal', 
        'Office cleanups'
      ],
      popular: true
    },
    {
      ...(largeTiers[0] || tiers[tiers.length - 1]),
      tier_name: 'Full Loads',
      description: largeTiers[0]?.tier_name || 'Complete truck loads',
      features: [
        'Whole home cleanouts', 
        'Large estate clearings', 
        'Commercial projects', 
        'Construction debris'
      ],
      popular: false
    }
  ];
}

/**
 * Estimates the price range based on the provided pricing tier ID
 * @param tierData The pricing tier data
 * @param selectedAddOns Array of selected add-on service IDs
 * @returns Estimated price range as a string
 */
export function calculateEstimatedPrice(
  tierData: PricingTier,
  selectedAddOns: string[] = []
): { minPrice: number; maxPrice: number; display: string } {
  // Return the tier's price range as a baseline
  return {
    minPrice: tierData.min_price,
    maxPrice: tierData.max_price,
    display: tierData.price_display
  };
}
