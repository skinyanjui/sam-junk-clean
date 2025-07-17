// Design System - Card Configuration Interfaces
// This file contains all the TypeScript interfaces for the unified card system

import { CardVariant, CardSize, CardElevation } from './card';

// Base Card Configuration Interface
export interface CardConfig {
  variant: CardVariant;
  size: CardSize;
  elevation: CardElevation;
  interactive: boolean;
  spacing: CardSize;
  hasImage: boolean;
  hasFooter: boolean;
  hasBadge: boolean;
}

// Section-Specific Card Configurations

// Home Section Cards
export interface ServiceCardConfig extends Partial<CardConfig> {
  variant: 'compact';
  size: 'sm';
  hasImage: true;
  overlay: boolean;
  popularity?: 'high' | 'medium' | 'low';
}

export interface TestimonialCardConfig extends Partial<CardConfig> {
  variant: 'featured';
  size: 'md';
  elevation: 'lg';
  hasQuoteIcon: boolean;
}

export interface PricingOverviewCardConfig extends Partial<CardConfig> {
  variant: 'featured';
  size: 'md';
  hasBadge?: boolean;
  popular?: boolean;
}

export interface FeaturedProjectCardConfig extends Partial<CardConfig> {
  variant: 'standard';
  size: 'md';
  hasImage: true;
  hasTags: boolean;
}

export interface BenefitCardConfig extends Partial<CardConfig> {
  variant: 'compact';
  size: 'xs';
  hasIcon: boolean;
  glassEffect?: boolean;
}

export interface StatsCardConfig extends Partial<CardConfig> {
  variant: 'standard';
  size: 'md';
  hasStats: boolean;
  gridLayout?: boolean;
}

// Blog Section Cards
export interface BlogCardConfig extends Partial<CardConfig> {
  variant: 'standard';
  size: 'md';
  hasImage: true;
  featured?: boolean;
  showTags?: boolean;
  showAuthor?: boolean;
  showReadTime?: boolean;
}

export interface BlogNewsletterCardConfig extends Partial<CardConfig> {
  variant: 'featured';
  size: 'lg';
  gradient?: boolean;
  successState?: boolean;
}

// Career Section Cards
export interface JobCardConfig extends Partial<CardConfig> {
  variant: 'interactive';
  size: 'lg';
  hasTabs: true;
  hasFooter: true;
  tabCount?: number;
}

// Location Section Cards
export interface ServiceAreaCardConfig extends Partial<CardConfig> {
  variant: 'interactive';
  size: 'lg';
  hasImage: true;
  hasTabs: true;
  hasFooter: true;
  contactInfo?: boolean;
}

// Pricing Section Cards
export interface PricingDisplayCardConfig extends Partial<CardConfig> {
  variant: 'standard';
  size: 'md';
  interactive: true;
  borderHighlight?: boolean;
  priceDisplay?: boolean;
}

export interface TruckVisualizerCardConfig extends Partial<CardConfig> {
  variant: 'process';
  size: 'lg';
  hasVisualizer: boolean;
  interactive?: boolean;
}

export interface AdditionalPricingCardConfig extends Partial<CardConfig> {
  variant: 'standard';
  size: 'md';
  hasTable?: boolean;
  hasList?: boolean;
}

// Contact Section Cards
export interface ContactFormCardConfig extends Partial<CardConfig> {
  variant: 'glass';
  size: 'lg';
  backdropBlur: boolean;
  formFields?: boolean;
}

// FAQ Section Cards
export interface FaqCategoryCardConfig extends Partial<CardConfig> {
  variant: 'process';
  size: 'md';
  collapsible: true;
  hasAccordion: true;
  expandable?: boolean;
}

// Quote Section Cards
export interface QuoteFormCardConfig extends Partial<CardConfig> {
  variant: 'standard';
  size: 'lg';
  elevation: 'md';
  hasSteps?: boolean;
}

export interface ProcessStepCardConfig extends Partial<CardConfig> {
  variant: 'process';
  size: 'md';
  hasStepNumber: boolean;
  activeState?: boolean;
  stepIndex?: number;
}

export interface PricingReferenceCardConfig extends Partial<CardConfig> {
  variant: 'standard';
  size: 'md';
  informational: boolean;
  hasReference?: boolean;
}

// Conversion Component Cards
export interface NotificationCardConfig extends Partial<CardConfig> {
  variant: 'notification';
  size: 'sm';
  elevation: 'xl';
  hasAvatar?: boolean;
  borderAccent?: boolean;
  overlay?: boolean;
}

export interface ExitIntentCardConfig extends Partial<CardConfig> {
  variant: 'notification';
  size: 'md';
  elevation: 'xl';
  hasOffer?: boolean;
  urgency?: boolean;
}

// Design Token Constants
export const CARD_DESIGN_TOKENS = {
  spacing: {
    xs: '8px',   // p-2
    sm: '12px',  // p-3
    md: '16px',  // p-4
    lg: '20px',  // p-5
    xl: '24px'   // p-6
  },
  borderRadius: '8px', // rounded-lg
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },
  borders: {
    default: '1px solid rgb(243 244 246)', // border-gray-100
    accent: '1px solid rgb(229 231 235)',  // border-gray-200
    glass: '1px solid rgb(255 255 255 / 0.2)' // border-white/20
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease'
  }
} as const;

// Utility function to get card configuration by type
export function getCardConfig(type: keyof typeof CARD_CONFIGS): Partial<CardConfig> {
  return CARD_CONFIGS[type];
}

// Pre-defined card configurations for common use cases
export const CARD_CONFIGS = {
  // Home section
  service: { variant: 'compact', size: 'sm', elevation: 'sm', interactive: true } as ServiceCardConfig,
  testimonial: { variant: 'featured', size: 'md', elevation: 'lg' } as TestimonialCardConfig,
  pricingOverview: { variant: 'featured', size: 'md', elevation: 'md' } as PricingOverviewCardConfig,
  featuredProject: { variant: 'standard', size: 'md', elevation: 'sm', hasImage: true } as FeaturedProjectCardConfig,
  benefit: { variant: 'compact', size: 'xs', elevation: 'sm' } as BenefitCardConfig,
  
  // Blog section
  blogPost: { variant: 'standard', size: 'md', elevation: 'sm', hasImage: true } as BlogCardConfig,
  blogNewsletter: { variant: 'featured', size: 'lg', elevation: 'md' } as BlogNewsletterCardConfig,
  
  // Interactive sections
  job: { variant: 'interactive', size: 'lg', elevation: 'sm', hasTabs: true } as JobCardConfig,
  serviceArea: { variant: 'interactive', size: 'lg', elevation: 'sm', hasImage: true } as ServiceAreaCardConfig,
  
  // Forms and processes
  contactForm: { variant: 'glass', size: 'lg', elevation: 'md' } as ContactFormCardConfig,
  processStep: { variant: 'process', size: 'md', elevation: 'sm' } as ProcessStepCardConfig,
  faqCategory: { variant: 'process', size: 'md', elevation: 'sm', collapsible: true } as FaqCategoryCardConfig,
  
  // Notifications
  notification: { variant: 'notification', size: 'sm', elevation: 'xl' } as NotificationCardConfig,
  exitIntent: { variant: 'notification', size: 'md', elevation: 'xl' } as ExitIntentCardConfig
} as const;

// Type helper for card configuration keys
export type CardConfigKey = keyof typeof CARD_CONFIGS;