
import { supabase } from './client';

export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
  type: 'text' | 'html' | 'url' | 'number';
  created_at: string;
  updated_at: string;
}

// Fetch site content by section
export const fetchSiteContent = async (section: string): Promise<Record<string, string>> => {
  try {
    // Mock data for now - in production this would come from Supabase
    const mockContent: Record<string, Record<string, string>> = {
      hero: {
        heading: 'Reclaim Your Space TODAY with Uncle Sam!',
        subheading: 'Expert junk removal across the Tri-State area. Veteran-owned, eco-friendly, and available when you need us!',
        value_prop_1: 'Fast response times with same-day service available',
        value_prop_2: 'Veteran-owned, licensed & fully insured business',
        value_prop_3: '95% recycling rate - we\'re committed to the environment',
        cta_primary: 'Get Your Free Estimate',
        cta_secondary: 'Call Now for Immediate Service'
      },
      about: {
        heading: 'Your Trusted Local Junk Removal Experts',
        subheading: 'Veteran-owned and operated since 2018',
        mission: 'To provide fast, reliable, and eco-friendly junk removal services while supporting our local community.',
        years_experience: '6',
        customers_served: '2500+',
        recycling_rate: '95%'
      },
      contact: {
        phone: '(812) 610-1657',
        email: 'info@unclesamjunkremoval.com',
        address: '123 Freedom Lane, Evansville, IN 47715',
        hours_weekday: '7:00 AM - 7:00 PM',
        hours_saturday: '8:00 AM - 5:00 PM',
        hours_sunday: 'Emergency calls only'
      }
    };

    return mockContent[section] || {};
  } catch (error) {
    console.error(`Error fetching site content for section ${section}:`, error);
    return {};
  }
};

// Fetch all trust signals and credentials
export const fetchTrustSignals = async () => {
  try {
    return {
      licenses: [
        'Indiana State License #12345',
        'Kentucky Business License #KY-67890'
      ],
      certifications: [
        'EPA Certified Disposal',
        'OSHA Safety Certified',
        'Better Business Bureau A+ Rating'
      ],
      insurance: {
        liability: '$2,000,000',
        workers_comp: 'Full Coverage',
        bonded: true
      },
      veteran_status: {
        owner_branch: 'U.S. Army',
        service_years: '2008-2014',
        verified: true
      }
    };
  } catch (error) {
    console.error('Error fetching trust signals:', error);
    return null;
  }
};

// Fetch company statistics
export const fetchCompanyStats = async () => {
  try {
    return {
      years_in_business: 6,
      customers_served: 2500,
      items_recycled: 45000,
      same_day_completion_rate: 98,
      customer_satisfaction: 4.9,
      total_reviews: 247
    };
  } catch (error) {
    console.error('Error fetching company stats:', error);
    return null;
  }
};
