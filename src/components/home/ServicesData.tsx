
import { Home, Building, Refrigerator, Hammer, HeartHandshake, Truck } from 'lucide-react';
import { ServiceItem } from './ServicesGrid';

export const servicesData: ServiceItem[] = [
  {
    title: 'Residential',
    icon: <Home className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Home cleanouts, garage junk, and household item removal'
  },
  {
    title: 'Commercial',
    icon: <Building className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Office cleanouts, retail space, and business junk removal'
  },
  {
    title: 'Appliance Removal',
    icon: <Refrigerator className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Fridges, washers, dryers, and other large appliances'
  },
  {
    title: 'Light Demolition',
    icon: <Hammer className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Sheds, decks, fences, and interior demolition'
  },
  {
    title: 'Estate Cleanouts',
    icon: <HeartHandshake className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Complete property clearance and junk removal'
  },
  {
    title: 'Curbside Pickups',
    icon: <Truck className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Quick and easy removal of items from your curb'
  }
];
