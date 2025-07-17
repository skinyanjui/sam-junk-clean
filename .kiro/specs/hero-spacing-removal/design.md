# Design Document

## Overview

This design document outlines the approach for removing excessive top and bottom padding/spacing from all hero sections across the website. The goal is to create a more streamlined user experience by reducing unnecessary vertical space, bringing important content higher on the page, and maintaining a consistent look and feel across all pages.

## Architecture

The current implementation of hero sections varies across different page types, but they generally follow these patterns:

1. **Direct Tailwind Classes**: Most hero sections use Tailwind CSS classes like `py-16`, `py-20`, `pt-24 pb-20` directly in the component's JSX.

2. **Responsive Conditionals**: Many hero components use conditional logic to apply different padding based on device size:
   ```jsx
   className={`${isMobile ? 'py-10' : 'py-20'} ${isLandscape && isMobile ? 'py-8' : ''} bg-brand-navy text-white`}
   ```

3. **Component-Specific Implementation**: Each hero component (BlogHero, ContactHero, PricingHero, etc.) has its own implementation rather than using a shared base component.

The proposed architecture changes will:

1. Create a centralized approach to manage hero spacing
2. Ensure consistency across all hero components
3. Make future spacing adjustments easier to implement

## Components and Interfaces

### Shared Hero Component or Style Module

We'll create a shared styling approach that can be applied across all hero components. This could be implemented in two ways:

#### Option 1: Shared CSS Variables

Create CSS variables in a central location that define the hero section padding:

```css
:root {
  --hero-padding-y: 0.5rem; /* Minimal padding */
  --hero-padding-y-mobile: 0.25rem;
}
```

#### Option 2: Shared Tailwind Classes

Create a set of shared Tailwind utility classes in the project's Tailwind configuration:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'hero-y': '0.5rem',
        'hero-y-mobile': '0.25rem',
      },
    },
  },
}
```

### Component Modifications

Each hero component will need to be modified to use the shared spacing approach. The changes will involve:

1. Removing or reducing the existing padding classes
2. Applying the new standardized padding
3. Ensuring responsive behavior is maintained

## Data Models

No data model changes are required for this feature as it only affects the presentation layer.

## Error Handling

The changes are purely presentational and don't involve error-prone operations. However, we should ensure that:

1. The reduced spacing doesn't cause layout issues on any screen sizes
2. The visual hierarchy remains clear despite reduced spacing
3. Adjacent elements don't overlap due to reduced spacing

## Testing Strategy

1. **Visual Regression Testing**: Compare before/after screenshots of each hero section to ensure the spacing reduction looks good and doesn't cause layout issues.

2. **Responsive Testing**: Test the modified hero sections across different device sizes to ensure they adapt correctly.

3. **Cross-Browser Testing**: Verify the changes work consistently across different browsers.

4. **Accessibility Testing**: Ensure the reduced spacing doesn't impact the accessibility of the hero sections.

## Implementation Approach

We'll take a systematic approach to implementing the changes:

1. Create a shared styling solution (CSS variables or Tailwind classes)
2. Modify each hero component individually
3. Test each component after modification
4. Deploy the changes together to maintain consistency

This approach allows us to make targeted changes to each component while ensuring a consistent outcome across the site.

## Design Decisions and Rationale

### Decision 1: Minimal vs. Zero Padding

We've chosen to use minimal padding (0.5rem) rather than completely removing padding to maintain some visual separation between sections. This strikes a balance between reducing unnecessary space and maintaining visual hierarchy.

### Decision 2: Centralized Styling Approach

By centralizing the hero spacing definitions, we make future adjustments easier and ensure consistency across the site. This approach aligns with the requirement for a unified look and feel.

### Decision 3: Maintaining Responsive Behavior

We're preserving the responsive behavior of hero sections by maintaining different padding values for mobile and desktop, just with reduced values. This ensures the site remains optimized for all devices.