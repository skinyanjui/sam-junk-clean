
import { Home, Building, Refrigerator, Hammer, HeartHandshake, Truck } from 'lucide-react';
import { ServiceItem } from './ServicesGrid';

export const servicesData: ServiceItem[] = [
  {
    title: 'Residential',
    icon: <Home className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Home cleanouts, garage junk, and household item removal',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500'
  },
  {
    title: 'Commercial',
    icon: <Building className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Office cleanouts, retail space, and business junk removal',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500'
  },
  {
    title: 'Appliance Removal',
    icon: <Refrigerator className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Fridges, washers, dryers, and other large appliances',
    image: 'https://images.unsplash.com/photo-1584515232567-60fd5c2f6cf7?auto=format&fit=crop&w=500'
  },
  {
    title: 'Light Demolition',
    icon: <Hammer className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Sheds, decks, fences, and interior demolition',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500'
  },
  {
    title: 'Estate Cleanouts',
    icon: <HeartHandshake className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Complete property clearance and junk removal',
    image: 'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=500'
  },
  {
    title: 'Curbside Pickups',
    icon: <Truck className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Quick and easy removal of items from your curb',
    image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&w=500'
  }
];
