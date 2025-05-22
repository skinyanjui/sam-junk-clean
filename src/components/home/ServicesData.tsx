
import { Home, Building, Refrigerator, Hammer, HeartHandshake, Truck, Sofa, Smartphone } from 'lucide-react';
import { ServiceItem } from './ServicesGrid';

export const servicesData: ServiceItem[] = [
  {
    title: 'Residential',
    icon: <Home className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Home cleanouts, garage junk, and household item removal',
    image: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&w=500',
    alt: 'Residential junk removal service showing workers clearing out a home'
  },
  {
    title: 'Commercial',
    icon: <Building className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Office cleanouts, retail space, and business junk removal',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500',
    alt: 'Commercial junk removal with workers clearing out an office space'
  },
  {
    title: 'Furniture Removal',
    icon: <Sofa className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Couches, tables, beds, and other household furniture disposal',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=500',
    alt: 'Furniture removal service with workers carrying a couch'
  },
  {
    title: 'Electronic Waste',
    icon: <Smartphone className="h-8 w-8 text-brand-red mb-2" />,
    description: 'TVs, computers, monitors, and other electronic disposal',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=500',
    alt: 'Electronic waste removal with old computers and devices'
  },
  {
    title: 'Appliance Removal',
    icon: <Refrigerator className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Fridges, washers, dryers, and other large appliances',
    image: 'https://images.unsplash.com/photo-1584438875946-25aa27a1645e?auto=format&fit=crop&w=500',
    alt: 'Appliance removal service with refrigerator being hauled away'
  },
  {
    title: 'Light Demolition',
    icon: <Hammer className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Sheds, decks, fences, and interior demolition',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500',
    alt: 'Light demolition service showing shed or deck removal'
  },
  {
    title: 'Estate Cleanouts',
    icon: <HeartHandshake className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Complete property clearance and junk removal',
    image: 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?auto=format&fit=crop&w=500',
    alt: 'Estate cleanout service showing property being cleared of items'
  },
  {
    title: 'Curbside Pickups',
    icon: <Truck className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Quick and easy removal of items from your curb',
    image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&w=500',
    alt: 'Curbside junk pickup service with truck collecting items'
  }
];
