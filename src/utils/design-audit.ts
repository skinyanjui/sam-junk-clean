/**
 * Design System Audit Utilities
 * Ensures consistent design patterns across the application
 */

// Brand Colors - Single source of truth
export const BRAND_COLORS = {
  red: '#B22234',
  navy: '#1A1F71', 
  gray: '#F4F4F4',
  text: '#333333',
  yellow: '#FFD700',
  blue: '#3B9EDC',
  green: '#6C8E6B'
} as const;

// Pricing Structure - Single source of truth
export const PRICING_STRUCTURE = {
  range: '$75-$850',
  minimum: 75,
  maximum: 850,
  tiers: [
    { name: '1/8 Truck Load', range: '$75-$125', min: 75, max: 125 },
    { name: '1/4 Truck Load', range: '$125-$175', min: 125, max: 175 },
    { name: '1/2 Truck Load', range: '$250-$350', min: 250, max: 350 },
    { name: '3/4 Truck Load', range: '$350-$450', min: 350, max: 450 },
    { name: 'Full Truck Load', range: '$450-$550', min: 450, max: 550 },
    { name: 'XL Truck Load', range: '$550-$850', min: 550, max: 850 }
  ]
} as const;

// Contact Information - Single source of truth
export const CONTACT_INFO = {
  phone: '(812) 610-1657',
  phoneHref: '+18126101657',
  email: 'info@unclesamjunkremoval.com',
  address: {
    street: '123 Freedom Lane',
    city: 'Evansville',
    state: 'IN',
    zip: '47715',
    full: '123 Freedom Lane, Evansville, IN 47715'
  }
} as const;

// Business Hours - Single source of truth
export const BUSINESS_HOURS = {
  weekdays: 'Monday-Friday: 7AM-7PM',
  saturday: 'Saturday: 9AM-3PM',
  sunday: 'Sunday: Closed (emergency calls available)',
  display: 'Mon-Sat: 7AM-7PM'
} as const;

// Copy Standards - Single source of truth
export const COPY_STANDARDS = {
  businessName: 'Uncle Sam Junk Removal',
  taglines: {
    primary: 'Fast & Reliable Junk Removal',
    secondary: 'Your trusted partner for residential and commercial junk removal services',
    patriotic: 'Uncle Sam wants YOU to live junk-free!'
  },
  serviceArea: 'Tri-State area',
  features: [
    'Licensed & Insured',
    'Veteran Owned',
    'Eco-Friendly Disposal',
    'Same-Day Service Available',
    'Transparent Pricing',
    'No Hidden Fees'
  ]
} as const;

// Typography Scale - Single source of truth
export const TYPOGRAPHY_SCALE = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-extrabold',
  h2: 'text-3xl md:text-4xl font-bold',
  h3: 'text-2xl md:text-3xl font-bold',
  h4: 'text-xl md:text-2xl font-bold',
  h5: 'text-lg md:text-xl font-semibold',
  h6: 'text-base md:text-lg font-semibold',
  body: 'text-base',
  small: 'text-sm',
  xs: 'text-xs'
} as const;

// Spacing Scale - Single source of truth
export const SPACING_SCALE = {
  section: 'py-16 md:py-20',
  sectionCompact: 'py-12 md:py-16',
  container: 'container-custom',
  gap: {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  }
} as const;

// Button Variants - Single source of truth
export const BUTTON_VARIANTS = {
  primary: 'bg-brand-red hover:bg-brand-red/90 text-white',
  secondary: 'bg-brand-navy hover:bg-brand-navy/90 text-white',
  outline: 'border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white',
  ghost: 'text-brand-navy hover:bg-brand-navy/10'
} as const;

// Validation functions
export const validateDesignConsistency = {
  pricing: (price: string): boolean => {
    const validPrices = PRICING_STRUCTURE.tiers.map(tier => tier.range);
    validPrices.push(PRICING_STRUCTURE.range);
    return validPrices.includes(price);
  },
  
  phone: (phone: string): boolean => {
    return phone === CONTACT_INFO.phone || phone === CONTACT_INFO.phoneHref;
  },
  
  colors: (color: string): boolean => {
    return Object.values(BRAND_COLORS).includes(color as any);
  },
  
  copy: (text: string): boolean => {
    const standardCopy = [
      ...Object.values(COPY_STANDARDS.taglines),
      COPY_STANDARDS.businessName,
      COPY_STANDARDS.serviceArea,
      ...COPY_STANDARDS.features
    ];
    return standardCopy.some(standard => text.includes(standard));
  }
};

// Audit functions for development
export const auditDesignConsistency = {
  logInconsistencies: () => {
    if (process.env.NODE_ENV === 'development') {
      console.group('🎨 Design Consistency Audit');
      console.log('Brand Colors:', BRAND_COLORS);
      console.log('Pricing Structure:', PRICING_STRUCTURE);
      console.log('Contact Info:', CONTACT_INFO);
      console.log('Copy Standards:', COPY_STANDARDS);
      console.groupEnd();
    }
  },
  
  validateComponent: (componentName: string, props: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      const issues: string[] = [];
      
      // Check for pricing consistency
      if (props.price && !validateDesignConsistency.pricing(props.price)) {
        issues.push(`Invalid price format: ${props.price}`);
      }
      
      // Check for phone consistency
      if (props.phone && !validateDesignConsistency.phone(props.phone)) {
        issues.push(`Inconsistent phone number: ${props.phone}`);
      }
      
      if (issues.length > 0) {
        console.warn(`🚨 Design inconsistencies in ${componentName}:`, issues);
      }
    }
  }
};