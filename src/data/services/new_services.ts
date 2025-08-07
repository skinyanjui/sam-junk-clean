import { ServiceData } from '@/components/services/servicesData';

export const newServices: ServiceData[] = [
  {
    id: 'hot-tub-and-pool-equipment-removal',
    title: 'Hot Tub and Pool Equipment Removal',
    description: 'We can safely remove and dispose of your old hot tub or pool equipment. We have the experience and equipment to handle any size job.',
    items: ['Hot tubs', 'Pool heaters', 'Pool filters', 'Pool pumps'],
    image: '/images/services/hot-tub-removal.jpg',
    category: 'Specialized Removal',
    relatedBlogs: [
      {
        title: 'Hot Tub and Pool Equipment Removal: Specialized Services in the Tri-State',
        slug: 'hot-tub-pool-removal-tri-state',
      },
    ],
    relatedServices: ['appliance-removal', 'construction-debris'],
  },
  {
    id: 'senior-moving-services',
    title: 'Senior Moving Services',
    description: 'We provide compassionate and professional moving services for seniors. We can help with downsizing, packing, and unpacking.',
    items: ['Downsizing assistance', 'Packing and unpacking', 'Furniture moving', 'Junk removal'],
    image: '/images/services/senior-moving.jpg',
    category: 'Moving Services',
    relatedBlogs: [
      {
        title: 'Senior Moving Services: Gentle Junk Removal for Owensboro Seniors',
        slug: 'senior-moving-services-owensboro',
      },
    ],
    relatedServices: ['estate-cleanout', 'furniture-removal'],
  },
  {
    id: 'rental-property-cleanouts',
    title: 'Rental Property Cleanouts',
    description: 'We offer fast and efficient cleanout services for rental properties. We can handle everything from single-family homes to large apartment complexes.',
    items: ['Tenant abandonment cleanouts', 'Eviction cleanouts', 'Move-in/move-out cleanouts', 'Junk removal'],
    image: '/images/services/rental-cleanout.jpg',
    category: 'Property Management',
    relatedBlogs: [
      {
        title: 'Rental Property Cleanouts in Henderson: Turnover Services for Landlords',
        slug: 'rental-property-cleanouts-henderson',
      },
    ],
    relatedServices: ['residential-cleanout', 'commercial-cleanout'],
  },
  {
    id: 'yard-waste-removal',
    title: 'Yard Waste Removal',
    description: 'We can remove all types of yard waste, including leaves, branches, and grass clippings. We can also help with storm cleanup.',
    items: ['Leaf removal', 'Branch removal', 'Grass clipping removal', 'Storm cleanup'],
    image: '/images/services/yard-waste.jpg',
    category: 'Yard Services',
    relatedBlogs: [
      {
        title: 'Yard Waste Removal in Owensboro: Seasonal Cleanup and Landscaping Debris',
        slug: 'yard-waste-removal-owensboro',
      },
    ],
    relatedServices: ['construction-debris', 'residential-cleanout'],
  },
  {
    id: 'basement-cleanout',
    title: 'Basement Cleanout',
    description: 'We can help you reclaim your basement. We can remove all types of junk, including old furniture, appliances, and boxes.',
    items: ['Furniture removal', 'Appliance removal', 'Box removal', 'General junk removal'],
    image: '/images/services/basement-cleanout.jpg',
    category: 'Home Improvement',
    relatedBlogs: [
      {
        title: 'Basement Cleanout Services: Reclaiming Your Underground Space in Indiana',
        slug: 'basement-cleanout-services-indiana',
      },
    ],
    relatedServices: ['residential-cleanout', 'furniture-removal'],
  },
  {
    id: 'hoarding-cleanup',
    title: 'Hoarding Cleanup',
    description: 'We provide compassionate and discreet hoarding cleanup services. We can help you or a loved one reclaim your home.',
    items: ['Clutter removal', 'Junk removal', 'Donation coordination', 'Deep cleaning'],
    image: '/images/services/hoarding-cleanup.jpg',
    category: 'Specialized Services',
    relatedBlogs: [
      {
        title: 'Hoarding Cleanup Services: Compassionate Support for Evansville Families',
        slug: 'hoarding-cleanup-evansville',
      },
    ],
    relatedServices: ['estate-cleanout', 'residential-cleanout'],
  },
  {
    id: 'moving-day-junk-removal',
    title: 'Moving Day Junk Removal',
    description: 'We can help you get rid of unwanted items before, during, or after your move. We can also help with packing and unpacking.',
    items: ['Junk removal', 'Packing and unpacking', 'Furniture moving', 'Donation coordination'],
    image: '/images/services/moving-day.jpg',
    category: 'Moving Services',
    relatedBlogs: [
      {
        title: 'Moving Day Junk Removal: Simplifying Relocations in the Tri-State Area',
        slug: 'moving-day-junk-removal-tri-state',
      },
    ],
    relatedServices: ['residential-cleanout', 'furniture-removal'],
  },
];
