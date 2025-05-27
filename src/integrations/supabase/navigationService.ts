
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
    const { data, error } = await supabase
      .from('navigation_items')
      .select('id, name, path, has_dropdown, parent_id, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching navigation items:', error);
      return [];
    }
    // Data from Supabase will not have the 'children' property.
    // The NavigationItem interface defines 'children?' as optional.
    // getNavigationStructure will handle the 'children' array initialization.
    return data || [];
  } catch (error) {
    console.error('Error fetching navigation items:', error);
    return [];
  }
};

export const getNavigationStructure = (items: NavigationItem[]): NavigationItem[] => {
  if (!items || items.length === 0) {
    return [];
  }

  const itemsById = new Map<string, NavigationItem>();
  // Initialize items in the map and ensure each has a children array
  items.forEach(item => {
    itemsById.set(item.id, { ...item, children: [] });
  });

  const roots: NavigationItem[] = [];

  itemsById.forEach(item => {
    if (item.parent_id) {
      const parent = itemsById.get(item.parent_id);
      if (parent) {
        // The check for item.is_active is already done in fetchNavigationItems
        // Children are already sorted by sort_order due to the initial query.
        // If specific sorting of children within parent is needed again, it can be done here.
        parent.children?.push(item);
      }
    } else {
      roots.push(item);
    }
  });

  // The initial query already sorts all items by sort_order.
  // If roots themselves need to be re-sorted (e.g. if not all items were fetched initially),
  // it can be done here. For now, we assume `fetchNavigationItems` provides them in order.
  // Children within each parent are also already sorted.

  return roots;
};
