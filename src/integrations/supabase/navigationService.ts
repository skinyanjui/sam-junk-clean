
import { supabase } from './client';

export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  has_dropdown: boolean;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  children?: NavigationItem[];
}

export const fetchNavigationItems = async (): Promise<NavigationItem[]> => {
  try {
    // First, get all top-level items (those with null parent_id)
    const { data: topLevelItems, error: topLevelError } = await supabase
      .from('navigation_items')
      .select('*')
      .is('parent_id', null)
      .eq('is_active', true)
      .order('sort_order');
      
    if (topLevelError) {
      console.error('Error fetching navigation items:', topLevelError);
      return [];
    }

    if (!topLevelItems || topLevelItems.length === 0) {
      return [];
    }
    
    // For each top-level item, fetch its children
    const result = await Promise.all(
      topLevelItems.map(async (item) => {
        if (item.has_dropdown) {
          const { data: childItems, error: childError } = await supabase
            .from('navigation_items')
            .select('*')
            .eq('parent_id', item.id)
            .eq('is_active', true)
            .order('sort_order');
            
          if (childError) {
            console.error('Error fetching child navigation items:', childError);
            return { ...item, children: [] };
          }
          
          return { ...item, children: childItems || [] };
        }
        
        return { ...item, children: [] };
      })
    );
    
    return result;
  } catch (error) {
    console.error('Error fetching navigation structure:', error);
    return [];
  }
};

export const getNavigationStructure = async () => {
  const navigationItems = await fetchNavigationItems();
  
  // Format the data to match the structure expected by the navbar components
  return navigationItems.map(item => ({
    name: item.name,
    path: item.path,
    hasDropdown: item.has_dropdown,
    dropdownItems: item.children?.map(child => ({
      name: child.name,
      path: child.path
    })) || []
  }));
};
