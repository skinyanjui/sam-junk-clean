
// Navigation structure with dropdowns
export const navStructure = [
  { name: 'Home', path: '/', hasDropdown: false },
  { 
    name: 'Services', 
    path: '/services', 
    hasDropdown: true,
    dropdownItems: [
      { name: 'Residential', path: '/services#residential' },
      { name: 'Commercial', path: '/services#commercial' },
      { name: 'Recycling', path: '/services#recycling' },
      { name: 'Specialized', path: '/services#specialized' },
      { name: 'Pricing', path: '/pricing' }
    ]
  },
  { 
    name: 'Service Locations', 
    path: '/locations', 
    hasDropdown: true,
    dropdownItems: [
      { name: 'Indiana', path: '/locations#indiana' },
      { name: 'Kentucky', path: '/locations#kentucky' },
      { name: 'Illinois', path: '/locations#illinois' }
    ]
  },
  { 
    name: 'About', 
    path: '/about', 
    hasDropdown: true,
    dropdownItems: [
      { name: 'Our Story', path: '/about' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Blog', path: '/blog' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' }
    ]
  },
];
