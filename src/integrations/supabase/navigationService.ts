
import { supabase } from './client';

// Interface for the raw data from the Supabase table
export interface DbNavigationItem {
  id: string; // UUID
  name: string;
  path: string;
  has_dropdown: boolean;
  parent_id: string | null; // UUID
  sort_order: number;
  is_active: boolean;
  created_at: string; // TIMESTAMPTZ
}

// Interface for the NavItem structure expected by Navbar.tsx
// This needs to be kept in sync with Navbar.tsx or imported if possible
interface NavItem {
  name: string;
  path: string;
  hasDropdown: boolean;
  dropdownItems?: {
    name: string;
    path: string;
  }[];
}

export const fetchNavigationItems = async (): Promise<DbNavigationItem[]> => {
  try {
    const { data, error } = await supabase
      .from('navigation_items')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching navigation items:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    // Log or handle more gracefully
    console.error('Supabase call failed:', error);
    return [];
  }
};

export const getNavigationStructure = async (): Promise<NavItem[]> => {
  const allItems: DbNavigationItem[] = await fetchNavigationItems();

  // Filter for active items only before building the structure
  const activeItems = allItems.filter(item => item.is_active);

  const itemsById: { [key: string]: DbNavigationItem & { children?: DbNavigationItem[] } } = {};
  activeItems.forEach(item => itemsById[item.id] = { ...item, children: [] });

  const rootItems: (DbNavigationItem & { children?: DbNavigationItem[] })[] = [];
  activeItems.forEach(item => {
    if (item.parent_id && itemsById[item.parent_id]) {
      // Ensure children array exists
      if (!itemsById[item.parent_id].children) {
        itemsById[item.parent_id].children = [];
      }
      itemsById[item.parent_id].children?.push(itemsById[item.id]);
    } else if (!item.parent_id) {
      rootItems.push(itemsById[item.id]);
    }
  });

  // Sort children by sort_order
  Object.values(itemsById).forEach(item => {
    item.children?.sort((a, b) => a.sort_order - b.sort_order);
  });
  // Sort root items by sort_order as well
  rootItems.sort((a,b) => a.sort_order - b.sort_order);

  // Map to the NavItem structure expected by Navbar component
  const mapToNavItem = (items: (DbNavigationItem & { children?: DbNavigationItem[] })[]): NavItem[] => {
    return items.map(item => ({
      name: item.name,
      path: item.path,
      hasDropdown: item.has_dropdown || (item.children && item.children.length > 0),
      // Navbar.tsx expects dropdownItems to be a flat list of direct children's name and path
      dropdownItems: item.children && item.children.length > 0 
        ? item.children.map(child => ({ name: child.name, path: child.path })) 
        : []
    }));
  };

  return mapToNavItem(rootItems);
};
