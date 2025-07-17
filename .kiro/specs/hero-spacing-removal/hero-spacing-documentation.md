# Hero Spacing Standard Documentation

## Overview

This document outlines the standardized approach to hero section spacing implemented across the website. The goal of this standard is to create a consistent, streamlined user experience by reducing excessive vertical space in hero sections, bringing important content higher on the page, and maintaining a uniform look and feel across all pages.

## Implementation

### CSS Variables

Hero spacing is controlled through CSS variables defined in `src/index.css`:

```css
:root {
  /* Hero spacing variables */
  --hero-padding-y: 0.5rem;
  --hero-padding-y-mobile: 0.25rem;
  --hero-padding-y-tablet: 0.375rem;
}
```

### Hero Section Class

A shared `.hero-section` class applies these variables with responsive behavior:

```css
.hero-section {
  padding-top: var(--hero-padding-y);
  padding-bottom: var(--hero-padding-y);
}

@media (max-width: 767px) {
  .hero-section {
    padding-top: var(--hero-padding-y-mobile);
    padding-bottom: var(--hero-padding-y-mobile);
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .hero-section {
    padding-top: var(--hero-padding-y-tablet);
    padding-bottom: var(--hero-padding-y-tablet);
  }
}
```

## Usage

To apply the standardized hero spacing to a component:

1. Add the `hero-section` class to the section element:

```jsx
<section className="hero-section bg-brand-navy text-white">
  {/* Hero content */}
</section>
```

2. You can combine it with other classes as needed:

```jsx
<section className="hero-section relative overflow-hidden bg-gradient-to-br from-brand-navy to-brand-navy/90">
  {/* Hero content */}
</section>
```

## Accessibility Considerations

When implementing hero sections with this standard:

1. Always include an `aria-labelledby` attribute on the section element that references the ID of the main heading:

```jsx
<section className="hero-section bg-brand-navy text-white" aria-labelledby="page-hero-heading">
  <div className="container-custom">
    <h1 id="page-hero-heading">Page Title</h1>
    {/* Other content */}
  </div>
</section>
```

2. Ensure sufficient visual separation between the hero section and adjacent content through background colors, content spacing, or other visual cues.

## Modifying the Standard

If adjustments to the hero spacing are needed in the future:

1. Update the CSS variables in `src/index.css` to change the spacing globally
2. For page-specific exceptions, add additional classes to the specific hero component

## Components Using This Standard

The following components use the hero spacing standard:

- `src/components/home/HeroSection.tsx`
- `src/components/blog/BlogHero.tsx`
- `src/components/pricing/PricingHero.tsx`
- `src/components/services/ServicesHero.tsx`
- `src/components/locations/LocationsHero.tsx`
- `src/components/careers/CareerHero.tsx`
- `src/components/quote/QuoteHero.tsx`
- `src/components/contact/ContactHero.tsx`

## Benefits

This standardized approach to hero spacing:

1. Creates a consistent user experience across all pages
2. Reduces unnecessary vertical space, bringing important content higher on the page
3. Makes future spacing adjustments easier by centralizing the definition
4. Maintains responsive behavior for different screen sizes
5. Preserves accessibility through proper semantic structure and ARIA attributes