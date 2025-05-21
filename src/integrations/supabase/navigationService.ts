
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
    // Return mock data since the table doesn't exist yet
    const mockNavItems: NavigationItem[] = [
      {
        id: '1',
        name: 'Home',
        path: '/',
        has_dropdown: false,
        parent_id: null,
        sort_order: 1,
        is_active: true
      },
      {
        id: '2',
        name: 'Services',
        path: '/services',
        has_dropdown: true,
        parent_id: null,
        sort_order: 2,
        is_active: true,
        children: [
          {
            id: '21',
            name: 'Residential',
            path: '/services/residential',
            has_dropdown: false,
            parent_id: '2',
            sort_order: 1,
            is_active: true
          },
          {
            id: '22',
            name: 'Commercial',
            path: '/services/commercial',
            has_dropdown: false,
            parent_id: '2',
            sort_order: 2,
            is_active: true
          }
        ]
      },
      {
        id: '3',
        name: 'Pricing',
        path: '/pricing',
        has_dropdown: false,
        parent_id: null,
        sort_order: 3,
        is_active: true
      },
      {
        id: '4',
        name: 'Contact',
        path: '/contact',
        has_dropdown: false,
        parent_id: null,
        sort_order: 4,
        is_active: true
      },
      {
        id: '5',
        name: 'About',
        path: '/about',
        has_dropdown: false,
        parent_id: null,
        sort_order: 5,
        is_active: true
      }
    ];
    
    return mockNavItems;
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
