
import { supabase } from './client';
import { topLocationLinks } from '@/data/locations';

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
      return []; // Return empty array instead of throwing
    }
    return data || [];
  } catch (error) {
    // Log or handle more gracefully
    console.error('Supabase call failed:', error);
    return [];
  }
};

// Fallback navigation structure when database is unavailable
const getFallbackNavigation = (): NavItem[] => {
  return [
    { name: 'Home', path: '/', hasDropdown: false },
    { 
      name: 'Services', 
      path: '/services', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Residential', path: '/services/residential' },
        { name: 'Commercial', path: '/services/commercial' },
        { name: 'Construction', path: '/services/construction' }
      ]
    },
    { name: 'Pricing', path: '/pricing', hasDropdown: false },
    { name: 'Locations', path: '/locations', hasDropdown: true, dropdownItems: topLocationLinks(10) },
    { name: 'About', path: '/about', hasDropdown: false },
    { name: 'Contact', path: '/contact', hasDropdown: false }
  ];
};

export const getNavigationStructure = async (): Promise<NavItem[]> => {
  try {
    // Fetch all navigation items from the database.
    const allItems: DbNavigationItem[] = await fetchNavigationItems();

    // If no items returned, use fallback
    if (!allItems || allItems.length === 0) {
      return getFallbackNavigation();
    }

    // Filter for active items only before building the structure.
    // This ensures that only enabled navigation links are processed.
    const activeItems = allItems.filter(item => item.is_active);

  // Step 1: Create a map for O(1) access to items by their ID.
  // Also, initialize a 'children' array for each item to store its descendants.
  const itemsById: { [key: string]: DbNavigationItem & { children?: DbNavigationItem[] } } = {};
  activeItems.forEach(item => itemsById[item.id] = { ...item, children: [] });

  // Step 2: Build the hierarchy.
  // Iterate through active items to place children under their respective parents.
  const rootItems: (DbNavigationItem & { children?: DbNavigationItem[] })[] = [];
  activeItems.forEach(item => {
    if (item.parent_id && itemsById[item.parent_id]) {
      // This item is a child. Add it to its parent's 'children' array.
      // The 'itemsById[item.id]' ensures we are pushing the object that has the 'children' property initialized.
      itemsById[item.parent_id].children?.push(itemsById[item.id]);
    } else if (!item.parent_id) {
      // This item has no parent_id, so it's a root-level item.
      rootItems.push(itemsById[item.id]);
    }
  });

  // Step 3: Sort children within each item by their 'sort_order'.
  // This ensures dropdown menus and sub-navigation appear in the intended sequence.
  Object.values(itemsById).forEach(item => {
    item.children?.sort((a, b) => a.sort_order - b.sort_order);
  });

  // Step 4: Sort the root-level items by their 'sort_order'.
  // This determines the order of top-level navigation links.
  rootItems.sort((a,b) => a.sort_order - b.sort_order);

  // Step 5: Map the hierarchical DbNavigationItem structure to the NavItem structure.
  // The NavItem structure is what the Navbar UI component expects.
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
  } catch (error) {
    console.error('Error building navigation structure:', error);
    return getFallbackNavigation();
  }
};
