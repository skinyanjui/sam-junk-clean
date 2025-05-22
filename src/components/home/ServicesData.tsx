
import { 
  Home, Building, Sofa, Smartphone, Refrigerator, Hammer, HeartHandshake, Truck,
  Bed, HotTub, Warehouse, Dumbbell, Leaf, Construction, Recycle, Gift
} from 'lucide-react';
import { ServiceItem } from './ServicesGrid';

export const servicesData: ServiceItem[] = [
  {
    title: 'Residential Junk Removal',
    icon: <Home className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Home cleanouts, garage junk, and household item removal',
    image: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&w=500',
    alt: 'Residential junk removal service showing workers clearing out a home'
  },
  {
    title: 'Commercial Junk Removal',
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
    title: 'Appliance Removal',
    icon: <Refrigerator className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Fridges, washers, dryers, and other large appliances',
    image: 'https://images.unsplash.com/photo-1584438875946-25aa27a1645e?auto=format&fit=crop&w=500',
    alt: 'Appliance removal service with refrigerator being hauled away'
  },
  {
    title: 'Mattress Removal',
    icon: <Bed className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Quick and eco-friendly disposal of all mattress sizes',
    image: 'https://images.unsplash.com/photo-1631049552240-59c37f38802b?auto=format&fit=crop&w=500',
    alt: 'Mattress removal service'
  },
  {
    title: 'Gym Equipment Removal',
    icon: <Dumbbell className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Treadmills, weights, machines, and workout equipment',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500',
    alt: 'Gym equipment removal service'
  },
  {
    title: 'Light Demolition',
    icon: <Hammer className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Sheds, decks, fences, and interior demolition',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500',
    alt: 'Light demolition service showing shed or deck removal'
  },
  {
    title: 'Construction Debris',
    icon: <Construction className="h-8 w-8 text-brand-red mb-2" />,
    description: 'Cleanup of renovation waste and construction materials',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500',
    alt: 'Construction debris removal'
  }
];
