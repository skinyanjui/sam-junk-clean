
import { 
  Home, Building, Sofa, Refrigerator, Hammer, 
  Bed, Dumbbell, Construction
} from 'lucide-react';
import { ServiceItem } from './ServicesGrid';

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconProps = { className: "h-8 w-8 text-brand-red mb-2" };
  
  switch (iconName) {
    case 'Home':
      return <Home {...iconProps} />;
    case 'Building':
      return <Building {...iconProps} />;
    case 'Sofa':
      return <Sofa {...iconProps} />;
    case 'Refrigerator':
      return <Refrigerator {...iconProps} />;
    case 'Bed':
      return <Bed {...iconProps} />;
    case 'Dumbbell':
      return <Dumbbell {...iconProps} />;
    case 'Hammer':
      return <Hammer {...iconProps} />;
    case 'Construction':
      return <Construction {...iconProps} />;
    default:
      return <Home {...iconProps} />;
  }
};

export const servicesData: ServiceItem[] = [
  {
    title: 'Residential Junk Removal',
    icon: getIconComponent('Home'),
    description: 'Home cleanouts, garage junk, and household item removal',
    image: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&w=500',
    alt: 'Residential junk removal service showing workers clearing out a home'
  },
  {
    title: 'Commercial Junk Removal',
    icon: getIconComponent('Building'),
    description: 'Office cleanouts, retail space, and business junk removal',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500',
    alt: 'Commercial junk removal with workers clearing out an office space'
  },
  {
    title: 'Furniture Removal',
    icon: getIconComponent('Sofa'),
    description: 'Couches, tables, beds, and other household furniture disposal',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=500',
    alt: 'Furniture removal service with workers carrying a couch'
  },
  {
    title: 'Appliance Removal',
    icon: getIconComponent('Refrigerator'),
    description: 'Fridges, washers, dryers, and other large appliances',
    image: 'https://images.unsplash.com/photo-1584438875946-25aa27a1645e?auto=format&fit=crop&w=500',
    alt: 'Appliance removal service with refrigerator being hauled away'
  },
  {
    title: 'Mattress Removal',
    icon: getIconComponent('Bed'),
    description: 'Quick and eco-friendly disposal of all mattress sizes',
    image: 'https://images.unsplash.com/photo-1631049552240-59c37f38802b?auto=format&fit=crop&w=500',
    alt: 'Mattress removal service'
  },
  {
    title: 'Gym Equipment Removal',
    icon: getIconComponent('Dumbbell'),
    description: 'Treadmills, weights, machines, and workout equipment',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500',
    alt: 'Gym equipment removal service'
  },
  {
    title: 'Light Demolition',
    icon: getIconComponent('Hammer'),
    description: 'Sheds, decks, fences, and interior demolition',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500',
    alt: 'Light demolition service showing shed or deck removal'
  },
  {
    title: 'Construction Debris',
    icon: getIconComponent('Construction'),
    description: 'Cleanup of renovation waste and construction materials',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500',
    alt: 'Construction debris removal'
  }
];
