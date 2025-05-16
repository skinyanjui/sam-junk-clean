
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
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('section', section);
    
    if (error) {
      console.error(`Error fetching site content for section ${section}:`, error);
      throw error;
    }
    
    // Transform array to key-value object
    const contentMap = (data || []).reduce((acc, item) => {
      acc[item.key] = item.content;
      return acc;
    }, {} as Record<string, string>);
    
    return contentMap;
  } catch (error) {
    console.error(`Failed to fetch site content for section ${section}:`, error);
    return {};
  }
};

export const fetchAllSiteContent = async (): Promise<Record<string, Record<string, string>>> => {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('*');
    
    if (error) {
      console.error('Error fetching all site content:', error);
      throw error;
    }
    
    // Transform array to nested key-value object by section
    const contentBySection = (data || []).reduce((sections, item) => {
      if (!sections[item.section]) {
        sections[item.section] = {};
      }
      sections[item.section][item.key] = item.content;
      return sections;
    }, {} as Record<string, Record<string, string>>);
    
    return contentBySection;
  } catch (error) {
    console.error('Failed to fetch all site content:', error);
    return {};
  }
};
