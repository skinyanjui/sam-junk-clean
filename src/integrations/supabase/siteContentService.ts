
import { supabase } from './client';

export interface SiteContent {
  id: string;
  section: string;
  key: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const fetchSiteContent = async (section: string): Promise<Record<string, string>> => {
  try {
    // Since the site_content table doesn't exist yet, return mock data
    console.warn(`The site_content table doesn't exist yet. Returning mock data for section: ${section}`);
    
    // Mock site content based on section
    const mockSiteContent: Record<string, string> = {
      'home_hero': {
        'title': 'Professional Junk Removal Services',
        'subtitle': 'Fast, Reliable, and Affordable',
        'cta': 'Get a Quote'
      },
      'about': {
        'company_story': 'Uncle Sam Junk Removal was founded in 2015 with a simple mission: to provide reliable and affordable junk removal services to our community.',
        'mission': 'Our mission is to help our customers live cleaner, more organized lives while being environmentally responsible.'
      },
      'contact': {
        'address': '123 Main Street, Evansville, IN 47708',
        'phone': '(812) 610-1657',
        'email': 'contact@unclesamjunk.com'
      }
    }[section] || {};
    
    return mockSiteContent;
  } catch (error) {
    console.error(`Failed to fetch site content for section ${section}:`, error);
    return {};
  }
};

export const fetchAllSiteContent = async (): Promise<Record<string, Record<string, string>>> => {
  try {
    // Since the site_content table doesn't exist yet, return mock data
    console.warn("The site_content table doesn't exist yet. Returning mock data for all sections");
    
    // Mock site content for all sections
    const mockSiteContent: Record<string, Record<string, string>> = {
      'home_hero': {
        'title': 'Professional Junk Removal Services',
        'subtitle': 'Fast, Reliable, and Affordable',
        'cta': 'Get a Quote'
      },
      'about': {
        'company_story': 'Uncle Sam Junk Removal was founded in 2015 with a simple mission: to provide reliable and affordable junk removal services to our community.',
        'mission': 'Our mission is to help our customers live cleaner, more organized lives while being environmentally responsible.'
      },
      'contact': {
        'address': '123 Main Street, Evansville, IN 47708',
        'phone': '(812) 610-1657',
        'email': 'contact@unclesamjunk.com'
      }
    };
    
    return mockSiteContent;
  } catch (error) {
    console.error('Failed to fetch all site content:', error);
    return {};
  }
};
