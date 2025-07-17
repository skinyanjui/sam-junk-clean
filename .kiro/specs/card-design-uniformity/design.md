# Design Document

## Overview

This design establishes a unified card system that creates visual consistency across all sections while maintaining flexibility for different content types. The current implementation shows significant variation in card designs - from the compact ServiceCard in the home section to the complex tabbed JobCard in careers. This design will create a cohesive foundation while preserving the unique functionality each section requires.

## Architecture

### Base Card System
The design centers around an enhanced base card component that provides consistent visual foundation while supporting multiple variants through a systematic approach. Based on comprehensive analysis, the system needs to support:

```typescript
interface UnifiedCardProps {
  variant: 'compact' | 'standard' | 'featured' | 'interactive' | 'glass' | 'notification' | 'process';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  elevation: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  hasImage?: boolean;
  hasTabs?: boolean;
  collapsible?: boolean;
  className?: string;
}
```

### Card Variant Categories
Based on analysis of all implementations, cards fall into these categories:

1. **Compact Cards**: ServiceCard, BenefitCard - Small, image-focused with minimal content
2. **Standard Cards**: BlogCard, FeaturedProjects - Medium size with balanced content
3. **Featured Cards**: TestimonialsSection, PricingOverview - Emphasized with enhanced styling
4. **Interactive Cards**: JobCard, ServiceAreaCard - Complex with tabs/collapsible content
5. **Glass Cards**: ContactForm - Semi-transparent with backdrop blur
6. **Notification Cards**: SocialProofNotifications, PersonalizedExitIntent - Overlay/popup style
7. **Process Cards**: ProcessSteps, FAQ categories - Sequential/workflow focused

### Design Token System
Establish consistent design tokens for all card implementations:

- **Spacing**: 12px, 16px, 20px, 24px (3, 4, 5, 6 in Tailwind)
- **Border Radius**: 8px (rounded-lg) for all cards
- **Shadows**: 
  - sm: `shadow-sm` (subtle)
  - md: `shadow-md` (default hover)
  - lg: `shadow-lg` (featured/elevated)
- **Borders**: `border border-gray-100` (consistent across all)
- **Transitions**: `transition-all duration-300` (uniform animation timing)

## Components and Interfaces

### 1. Enhanced Base Card Component

```typescript
// Enhanced card.tsx
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', size = 'md', elevation = 'sm', interactive = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Base styles
        "rounded-lg border border-gray-100 bg-white text-card-foreground",
        // Elevation system
        {
          'shadow-none': elevation === 'none',
          'shadow-sm': elevation === 'sm',
          'shadow-md': elevation === 'md',
          'shadow-lg': elevation === 'lg',
        },
        // Interactive states
        interactive && "hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer",
        // Size variants
        {
          'max-w-sm': size === 'sm',
          'max-w-md': size === 'md', 
          'max-w-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
);
```

### 2. Standardized Card Variants

#### Compact Card (ServiceCard style)
- **Use case**: Service grids, feature lists
- **Dimensions**: Fixed height with flexible content
- **Key features**: Image overlay, compact content, minimal padding

#### Standard Card (BlogCard style)  
- **Use case**: Blog posts, general content
- **Dimensions**: Flexible height, aspect-ratio images
- **Key features**: Full content area, standard padding, footer actions

#### Featured Card (Testimonials, Pricing)
- **Use case**: Highlighted content, pricing tiers
- **Dimensions**: Enhanced spacing and prominence
- **Key features**: Larger padding, enhanced shadows, optional badges

#### Interactive Card (JobCard, LocationCard style)
- **Use case**: Complex content with tabs/interactions
- **Dimensions**: Flexible with internal component management
- **Key features**: Tab support, multiple content sections, action footers

### 3. Unified Spacing System

```scss
// Consistent padding system
.card-padding-sm { padding: 12px; }      // p-3
.card-padding-md { padding: 16px; }      // p-4  
.card-padding-lg { padding: 20px; }      // p-5
.card-padding-xl { padding: 24px; }      // p-6

// Header spacing
.card-header-sm { padding: 12px 12px 8px; }   // p-3 pb-2
.card-header-md { padding: 16px 16px 12px; }  // p-4 pb-3
.card-header-lg { padding: 20px 20px 16px; }  // p-5 pb-4
```

### 4. Consistent Interactive States

All cards will implement the same interaction patterns:

```scss
// Hover states
.card-hover {
  @apply hover:shadow-md hover:-translate-y-0.5 transition-all duration-300;
}

// Focus states (accessibility)
.card-focus {
  @apply focus-within:ring-2 focus-within:ring-brand-red/50 focus-within:ring-offset-2;
}

// Active states
.card-active {
  @apply ring-2 ring-brand-red/80 ring-offset-1;
}
```

## Data Models

### Card Configuration Model
```typescript
interface CardConfig {
  variant: 'compact' | 'standard' | 'featured' | 'interactive';
  size: 'sm' | 'md' | 'lg';
  elevation: 'none' | 'sm' | 'md' | 'lg';
  interactive: boolean;
  spacing: 'sm' | 'md' | 'lg' | 'xl';
  hasImage: boolean;
  hasFooter: boolean;
  hasBadge: boolean;
}
```

### Section-Specific Adaptations
```typescript
// Home section cards
interface ServiceCardConfig extends CardConfig {
  variant: 'compact';
  size: 'sm';
  hasImage: true;
  overlay: boolean;
  popularity?: 'high' | 'medium' | 'low';
}

interface TestimonialCardConfig extends CardConfig {
  variant: 'featured';
  size: 'md';
  elevation: 'lg';
  hasQuoteIcon: boolean;
}

interface PricingOverviewCardConfig extends CardConfig {
  variant: 'featured';
  size: 'md';
  hasBadge?: boolean;
  popular?: boolean;
}

interface FeaturedProjectCardConfig extends CardConfig {
  variant: 'standard';
  size: 'md';
  hasImage: true;
  hasTags: boolean;
}

interface BenefitCardConfig extends CardConfig {
  variant: 'compact';
  size: 'xs';
  hasIcon: boolean;
  glassEffect?: boolean;
}

// Blog section cards
interface BlogCardConfig extends CardConfig {
  variant: 'standard';
  size: 'md';
  hasImage: true;
  featured?: boolean;
  showTags?: boolean;
}

interface BlogNewsletterCardConfig extends CardConfig {
  variant: 'featured';
  size: 'lg';
  gradient?: boolean;
}

// Career section cards
interface JobCardConfig extends CardConfig {
  variant: 'interactive';
  size: 'lg';
  hasTabs: true;
  hasFooter: true;
}

// Location section cards
interface ServiceAreaCardConfig extends CardConfig {
  variant: 'interactive';
  size: 'lg';
  hasImage: true;
  hasTabs: true;
  hasFooter: true;
}

// Pricing section cards
interface PricingDisplayCardConfig extends CardConfig {
  variant: 'standard';
  size: 'md';
  interactive: true;
  borderHighlight?: boolean;
}

interface TruckVisualizerCardConfig extends CardConfig {
  variant: 'process';
  size: 'lg';
  hasVisualizer: boolean;
}

// Contact section cards
interface ContactFormCardConfig extends CardConfig {
  variant: 'glass';
  size: 'lg';
  backdropBlur: boolean;
}

// FAQ section cards
interface FaqCategoryCardConfig extends CardConfig {
  variant: 'process';
  size: 'md';
  collapsible: true;
  hasAccordion: true;
}

// Quote section cards
interface QuoteFormCardConfig extends CardConfig {
  variant: 'standard';
  size: 'lg';
  elevation: 'md';
}

interface ProcessStepCardConfig extends CardConfig {
  variant: 'process';
  size: 'md';
  hasStepNumber: boolean;
  activeState?: boolean;
}

// Conversion component cards
interface NotificationCardConfig extends CardConfig {
  variant: 'notification';
  size: 'sm';
  elevation: 'xl';
  hasAvatar?: boolean;
  borderAccent?: boolean;
}
```

## Error Handling

### Graceful Degradation
- **Missing images**: Consistent placeholder with proper aspect ratios
- **Long content**: Uniform text truncation with ellipsis
- **Responsive breakpoints**: Consistent behavior across all card types

### Accessibility Fallbacks
- **Screen readers**: Consistent ARIA labeling patterns
- **Keyboard navigation**: Uniform focus management
- **High contrast**: Consistent border and shadow adjustments

## Testing Strategy

### Visual Regression Testing
1. **Cross-section consistency**: Automated screenshots comparing cards across different sections
2. **Responsive behavior**: Test card layouts at all breakpoints
3. **Interactive states**: Verify hover, focus, and active states are consistent

### Accessibility Testing
1. **Screen reader compatibility**: Test with NVDA, JAWS, and VoiceOver
2. **Keyboard navigation**: Ensure consistent tab order and focus indicators
3. **Color contrast**: Verify all text meets WCAG AA standards

### Component Testing
1. **Variant rendering**: Test all card variants render correctly
2. **Props validation**: Ensure proper TypeScript typing and validation
3. **Integration testing**: Verify cards work correctly within their sections

### Performance Testing
1. **Bundle size impact**: Measure impact of unified system on bundle size
2. **Rendering performance**: Test with large numbers of cards
3. **Animation performance**: Verify smooth transitions across devices

## Implementation Phases

### Phase 1: Foundation
- Enhance base card component with variant system
- Establish design tokens and CSS custom properties
- Create comprehensive TypeScript interfaces

### Phase 2: Migration
- Update ServiceCard to use new system
- Migrate BlogCard to unified approach  
- Convert JobCard and LocationCard to new patterns

### Phase 3: Optimization
- Implement performance optimizations
- Add comprehensive testing suite
- Create documentation and usage guidelines

### Phase 4: Enhancement
- Add advanced features (animations, micro-interactions)
- Implement accessibility enhancements
- Create design system documentation