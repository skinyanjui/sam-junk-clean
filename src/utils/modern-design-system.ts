/**
 * Modern Design System Utilities
 * 
 * This file contains utilities for the modern design system used in the redesigned pages.
 * It includes typography, spacing, color, and animation utilities.
 */

// Modern Typography System
export const typography = {
  // Heading styles with more dramatic size contrast and enhanced weight hierarchy
  headings: {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
    h2: 'text-3xl md:text-4xl font-bold leading-tight tracking-tight',
    h3: 'text-2xl md:text-3xl font-semibold leading-snug',
    h4: 'text-xl md:text-2xl font-semibold leading-snug',
    h5: 'text-lg md:text-xl font-medium leading-normal',
    subtitle: 'text-xl md:text-2xl font-normal leading-relaxed text-gray-600 dark:text-gray-300',
  },
  
  // Body text styles with improved readability
  body: {
    large: 'text-lg leading-relaxed',
    base: 'text-base leading-relaxed',
    small: 'text-sm leading-normal',
    xs: 'text-xs leading-normal',
  },
  
  // Accent text styles for highlighting key information
  accent: {
    primary: 'text-brand-red font-medium',
    secondary: 'text-brand-navy font-medium',
    highlight: 'bg-yellow-100 text-yellow-800 px-1 rounded',
    badge: 'inline-flex items-center rounded-full bg-brand-red/10 px-2 py-1 text-xs font-medium text-brand-red',
  }
};

// Modern Spacing System
export const spacing = {
  // Enhanced vertical rhythm with consistent spacing multiples
  section: {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-20 md:py-32',
  },
  
  // Content spacing
  content: {
    tight: 'space-y-2',
    base: 'space-y-4',
    relaxed: 'space-y-6',
    loose: 'space-y-8 md:space-y-12',
  },
  
  // Component spacing
  component: {
    tight: 'gap-2',
    base: 'gap-4',
    relaxed: 'gap-6',
    loose: 'gap-8',
  }
};

// Modern Color System
export const colors = {
  // Gradient backgrounds
  gradients: {
    primary: 'bg-gradient-to-br from-brand-red to-brand-red/90',
    secondary: 'bg-gradient-to-br from-brand-navy to-brand-navy/90',
    subtle: 'bg-gradient-to-br from-gray-50 to-gray-100',
    accent: 'bg-gradient-to-r from-brand-red/90 to-brand-navy/90',
  },
  
  // Background patterns
  patterns: {
    dots: 'bg-[url("/images/patterns/dots.svg")] bg-repeat bg-blend-overlay',
    grid: 'bg-[url("/images/patterns/grid.svg")] bg-repeat bg-blend-overlay',
    lines: 'bg-[url("/images/patterns/lines.svg")] bg-repeat bg-blend-overlay',
  },
  
  // Glass effects
  glass: {
    light: 'bg-white/70 backdrop-blur-sm',
    medium: 'bg-white/50 backdrop-blur-md',
    dark: 'bg-black/30 backdrop-blur-md text-white',
  },
  
  // Accent colors
  accents: {
    primary: 'text-brand-red',
    secondary: 'text-brand-navy',
    success: 'text-green-600',
    warning: 'text-amber-600',
    error: 'text-red-600',
  }
};

// Modern Animation and Transition Utilities
export const animations = {
  // Transition presets
  transitions: {
    fast: 'transition-all duration-200 ease-in-out',
    base: 'transition-all duration-300 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out',
    bounce: 'transition-all duration-300 ease-out hover:scale-105',
  },
  
  // Entrance animations
  entrance: {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    slideDown: 'animate-slideDown',
    slideLeft: 'animate-slideLeft',
    slideRight: 'animate-slideRight',
    zoomIn: 'animate-zoomIn',
  },
  
  // Hover effects
  hover: {
    lift: 'hover:-translate-y-1 hover:shadow-md transition-all duration-300',
    grow: 'hover:scale-105 transition-all duration-300',
    glow: 'hover:shadow-lg hover:shadow-brand-red/20 transition-all duration-300',
    highlight: 'hover:bg-brand-red/10 transition-all duration-300',
  }
};

// Card variants for modern design
export interface ModernCardProps {
  accentColor?: 'red' | 'navy' | 'gray' | 'none';
  glassEffect?: 'none' | 'light' | 'medium' | 'heavy';
  animationLevel?: 'none' | 'subtle' | 'moderate' | 'enhanced';
  borderStyle?: 'none' | 'solid' | 'dashed' | 'gradient';
  contentLayout?: 'standard' | 'split' | 'overlapping' | 'stacked';
}

// Generate card classes based on props
export const getCardClasses = (props: ModernCardProps): string => {
  const {
    accentColor = 'none',
    glassEffect = 'none',
    animationLevel = 'subtle',
    borderStyle = 'solid',
    contentLayout = 'standard'
  } = props;
  
  // Base classes
  let classes = 'rounded-xl overflow-hidden ';
  
  // Accent color
  switch (accentColor) {
    case 'red':
      classes += borderStyle === 'gradient' 
        ? 'border-2 border-transparent bg-gradient-to-br from-brand-red to-brand-navy border-box-decoration ' 
        : 'border-2 border-brand-red ';
      break;
    case 'navy':
      classes += borderStyle === 'gradient' 
        ? 'border-2 border-transparent bg-gradient-to-br from-brand-navy to-brand-navy/60 border-box-decoration ' 
        : 'border-2 border-brand-navy ';
      break;
    case 'gray':
      classes += 'border-2 border-gray-200 ';
      break;
    case 'none':
      classes += borderStyle !== 'none' ? 'border border-gray-100 ' : '';
      break;
  }
  
  // Glass effect
  switch (glassEffect) {
    case 'light':
      classes += 'bg-white/70 backdrop-blur-sm ';
      break;
    case 'medium':
      classes += 'bg-white/50 backdrop-blur-md ';
      break;
    case 'heavy':
      classes += 'bg-white/30 backdrop-blur-lg ';
      break;
    case 'none':
    default:
      classes += 'bg-white ';
      break;
  }
  
  // Animation level
  switch (animationLevel) {
    case 'subtle':
      classes += 'transition-all duration-300 hover:shadow-md ';
      break;
    case 'moderate':
      classes += 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ';
      break;
    case 'enhanced':
      classes += 'transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.01] ';
      break;
    case 'none':
    default:
      break;
  }
  
  // Content layout
  switch (contentLayout) {
    case 'split':
      classes += 'grid md:grid-cols-2 ';
      break;
    case 'overlapping':
      classes += 'relative ';
      break;
    case 'stacked':
      classes += 'flex flex-col ';
      break;
    case 'standard':
    default:
      break;
  }
  
  return classes;
};

// Accessibility utilities
export const accessibility = {
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2',
  srOnly: 'sr-only',
  reducedMotion: 'motion-reduce:transform-none motion-reduce:transition-none',
};

// Export all utilities as a single object
export const modernDesign = {
  typography,
  spacing,
  colors,
  animations,
  getCardClasses,
  accessibility
};

export default modernDesign;