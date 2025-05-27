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
      .select('id, name, path, has_dropdown, parent_id, sort_order, is_active, created_at')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching navigation items:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Supabase call failed:', error);
    return [];
  }
};

export const getNavigationStructure = async (): Promise<NavItem[]> => {
  const allItems: DbNavigationItem[] = await fetchNavigationItems();

  const itemsById: { [key: string]: DbNavigationItem & { children?: DbNavigationItem[] } } = {};
  allItems.forEach(item => itemsById[item.id] = { ...item, children: [] });

  const rootItems: (DbNavigationItem & { children?: DbNavigationItem[] })[] = [];
  allItems.forEach(item => {
    if (item.parent_id && itemsById[item.parent_id]) {
      itemsById[item.parent_id].children?.push(itemsById[item.id]);
    } else {
      rootItems.push(itemsById[item.id]);
    }
  });

  Object.values(itemsById).forEach(item => {
    item.children?.sort((a, b) => a.sort_order - b.sort_order);
  });
  rootItems.sort((a, b) => a.sort_order - b.sort_order);

  const mapToNavItem = (items: (DbNavigationItem & { children?: DbNavigationItem[] })[]): NavItem[] => {
    return items.map(item => ({
      name: item.name,
      path: item.path,
      hasDropdown: item.has_dropdown || (item.children && item.children.length > 0),
      dropdownItems: item.children?.map(child => ({ name: child.name, path: child.path })) || []
    }));
  };

  return mapToNavItem(rootItems);
};
