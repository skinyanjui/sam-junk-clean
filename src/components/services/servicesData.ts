
export interface RelatedBlog {
  title: string;
  slug: string;
}

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  items: string[];
  image: string;
  relatedBlogs: RelatedBlog[];
  relatedServices: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: 'residential',
    title: 'Residential Junk Removal',
    description: 'Clear out your home, garage, yard, or entire property with our thorough residential junk removal services.',
    items: [
      'Home cleanouts and decluttering',
      'Garage and basement junk removal',
      'Yard debris and waste cleanup',
      'Furniture and appliance removal',
      'Moving debris cleanup',
      'Hoarding cleanup assistance'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    relatedBlogs: [
      {
        title: "The Ultimate Guide to Decluttering Your Garage",
        slug: "ultimate-guide-decluttering-garage"
      },
      {
        title: "10 Items You Should Never Throw in the Trash",
        slug: "10-items-never-throw-in-trash"
      }
    ],
    relatedServices: ["appliance-removal", "estate-cleanouts"]
  },
  {
    id: 'commercial',
    title: 'Commercial Junk Removal',
    description: 'Keep your business space clean and professional with our efficient commercial junk removal services.',
    items: [
      'Office cleanouts and relocations',
      'Retail space renovation debris',
      'Construction waste removal',
      'Office furniture and equipment disposal',
      'Commercial property cleanups',
      'Warehouse and storage space clearing'
    ],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    relatedBlogs: [
      {
        title: "How Junk Removal Services Are Becoming More Eco-Friendly",
        slug: "eco-friendly-junk-removal"
      }
    ],
    relatedServices: ["light-demolition"]
  },
  {
    id: 'appliance-removal',
    title: 'Appliance Removal',
    description: 'We safely remove and dispose of old appliances from your home or business.',
    items: [
      'Refrigerators and freezers',
      'Washers and dryers',
      'Stoves and ovens',
      'Dishwashers',
      'Air conditioners and HVAC units',
      'Water heaters'
    ],
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5',
    relatedBlogs: [
      {
        title: "10 Items You Should Never Throw in the Trash",
        slug: "10-items-never-throw-in-trash"
      }
    ],
    relatedServices: ["residential", "commercial"]
  },
  {
    id: 'light-demolition',
    title: 'Light Demolition',
    description: 'Our team handles small demolition projects quickly and safely.',
    items: [
      'Shed and deck removal',
      'Fence demolition',
      'Interior wall removal',
      'Kitchen and bathroom demo',
      'Concrete patio removal',
      'Small structure teardowns'
    ],
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    relatedBlogs: [
      {
        title: "Preparing for a Home Renovation? Here's How to Handle the Debris",
        slug: "handle-renovation-debris"
      }
    ],
    relatedServices: ["commercial"]
  },
  {
    id: 'estate-cleanouts',
    title: 'Estate Cleanouts',
    description: 'Get compassionate, thorough help clearing out an entire estate.',
    items: [
      'Complete property clearance',
      'Donation coordination for valuable items',
      'Respectful and efficient service',
      'Proper disposal of all materials',
      'Documentation for estate purposes',
      'Final property sweep and cleaning'
    ],
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    relatedBlogs: [],
    relatedServices: ["residential", "appliance-removal"]
  },
  {
    id: 'curbside-pickups',
    title: 'Curbside Pickups',
    description: 'Set your items out and we\'ll take care of the rest with our convenient curbside pickup service.',
    items: [
      'Quick and easy removal',
      'No heavy lifting required on your part',
      'Same-day service often available',
      'Perfect for smaller loads',
      'Scheduled pickups available',
      'Contact-free service options'
    ],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    relatedBlogs: [],
    relatedServices: ["residential"]
  }
];
