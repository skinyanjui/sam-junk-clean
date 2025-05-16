
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
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch pricing tiers:', error);
    return [];
  }
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
