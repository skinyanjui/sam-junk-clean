# Card Accessibility Implementation Guide

This guide provides comprehensive instructions for implementing accessible card components across all 7 variants in our unified card system.

## Table of Contents

1. [ARIA Attributes by Card Variant](#aria-attributes-by-card-variant)
2. [Keyboard Navigation Patterns](#keyboard-navigation-patterns)
3. [Screen Reader Support](#screen-reader-support)
4. [Focus Management](#focus-management)
5. [Color Contrast Requirements](#color-contrast-requirements)
6. [Touch Target Sizes](#touch-target-sizes)
7. [Reduced Motion Support](#reduced-motion-support)
8. [High Contrast Mode](#high-contrast-mode)
9. [Implementation Examples](#implementation-examples)

## ARIA Attributes by Card Variant

### Compact Cards
```tsx
<Card 
  variant="compact"
  ariaLabel="Service name"
  role="link"
  tabIndex={0}
>
  <CardHeader>
    <CardTitle>Service Title</CardTitle>
  </CardHeader>
  <CardContent>
    <CardDescription>Service description</CardDescription>
  </CardContent>
</Card>
```

### Standard Cards
```tsx
<Card 
  variant="standard"
  ariaLabel="Blog post title"
  role="article"
>
  <CardHeader>
    <CardTitle>Blog Post Title</CardTitle>
    <CardDescription>Posted on January 1, 2023</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Blog post excerpt...</p>
  </CardContent>
  <CardFooter>
    <button aria-label="Read more about Blog Post Title">Read More</button>
  </CardFooter>
</Card>
```

### Featured Cards
```tsx
<Card 
  variant="featured"
  ariaLabel="Testimonial from John Doe"
  role="region"
>
  <CardHeader>
    <CardTitle>John Doe</CardTitle>
    <CardDescription>Customer since 2020</CardDescription>
  </CardHeader>
  <CardContent>
    <blockquote aria-label="Testimonial quote">
      This service is amazing...
    </blockquote>
  </CardContent>
</Card>
```

### Interactive Cards
```tsx
<Card 
  variant="interactive"
  interactive={true}
  ariaLabel="Job: Software Engineer"
  role="button"
  ariaExpanded={expanded}
  ariaControls="job-details-123"
  tabIndex={0}
>
  <CardHeader>
    <CardTitle>Software Engineer</CardTitle>
    <CardDescription>Full-time position</CardDescription>
  </CardHeader>
  <CardContent id="job-details-123" aria-hidden={!expanded}>
    <p>Job details...</p>
  </CardContent>
  <CardFooter>
    <button aria-label="Apply for Software Engineer position">Apply Now</button>
  </CardFooter>
</Card>
```

### Glass Cards
```tsx
<Card 
  variant="glass"
  glassEffect={true}
  ariaLabel="Contact form"
  role="form"
>
  <CardHeader>
    <CardTitle>Contact Us</CardTitle>
  </CardHeader>
  <CardContent>
    <form>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" aria-required="true" />
      <!-- Additional form fields -->
    </form>
  </CardContent>
</Card>
```

### Notification Cards
```tsx
<Card 
  variant="notification"
  ariaLabel="New message notification"
  role="alert"
  ariaLive="polite"
  ariaAtomic={true}
>
  <CardHeader>
    <CardTitle>New Message</CardTitle>
  </CardHeader>
  <CardContent>
    <p>You have received a new message from John Doe.</p>
  </CardContent>
  <CardFooter>
    <button aria-label="View message">View</button>
    <button aria-label="Dismiss notification">Dismiss</button>
  </CardFooter>
</Card>
```

### Process Cards
```tsx
<Card 
  variant="process"
  ariaLabel="Step 1: Choose service"
  role="region"
  ariaCurrent="step"
>
  <CardHeader>
    <CardTitle>Step 1: Choose Service</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Select the service you need from our options.</p>
  </CardContent>
  <CardFooter>
    <button aria-label="Continue to step 2">Continue</button>
  </CardFooter>
</Card>
```

## Keyboard Navigation Patterns

### Basic Card Navigation
- **Tab**: Move focus to the card (if interactive) or to the next focusable element
- **Shift+Tab**: Move focus to the previous focusable element
- **Enter/Space**: Activate the card (if interactive)

### Interactive Cards with Tabs
```tsx
<Card variant="interactive" hasTabs={true}>
  <div role="tablist" aria-label="Job details">
    <CardTab id="details" label="Details" active={activeTab === 'details'} onActivate={() => setActiveTab('details')}>
      Details
    </CardTab>
    <CardTab id="requirements" label="Requirements" active={activeTab === 'requirements'} onActivate={() => setActiveTab('requirements')}>
      Requirements
    </CardTab>
  </div>
  <CardTabPanel id="details" label="Job details" active={activeTab === 'details'}>
    <p>Job details content...</p>
  </CardTabPanel>
  <CardTabPanel id="requirements" label="Job requirements" active={activeTab === 'requirements'}>
    <p>Job requirements content...</p>
  </CardTabPanel>
</Card>
```

**Keyboard Navigation for Tabs:**
- **Tab**: Move focus to the tablist
- **Arrow Left/Right**: Navigate between tabs
- **Enter/Space**: Activate the focused tab
- **Tab** (when on last tab): Move focus to the tab panel content

### Collapsible Cards
```tsx
<Card variant="process" collapsible={true}>
  <CardCollapsible id="faq-1" label="How do I get started?" expanded={expanded} onToggle={setExpanded}>
    <p>Getting started is easy. Simply sign up for an account...</p>
  </CardCollapsible>
</Card>
```

**Keyboard Navigation for Collapsible:**
- **Tab**: Move focus to the collapsible trigger
- **Enter/Space**: Toggle the collapsible content
- **Tab** (when expanded): Move focus to the content

### Notification Cards
```tsx
<Card 
  variant="notification"
  role="alert"
  announcement={{ 
    message: "New notification: You have a new message", 
    politeness: "polite" 
  }}
>
  <CardHeader>
    <CardTitle>New Message</CardTitle>
  </CardHeader>
  <CardContent>
    <p>You have received a new message from John Doe.</p>
  </CardContent>
  <CardFooter>
    <button aria-label="View message">View</button>
    <button aria-label="Dismiss notification">Dismiss</button>
  </CardFooter>
</Card>
```

**Keyboard Navigation for Notifications:**
- **Tab**: Move focus to the notification card
- **Escape**: Dismiss the notification (if dismissible)
- **Tab**: Navigate through actionable elements in the notification

## Screen Reader Support

### Live Regions for Dynamic Content
Use the `announcement` prop to create screen reader announcements:

```tsx
<Card
  variant="notification"
  announcement={{
    message: "New notification: You have a new message",
    politeness: "polite",
    timeout: 5000
  }}
>
  {/* Card content */}
</Card>
```

### Skip Links for Complex Cards
For cards with complex content, provide skip links:

```tsx
<Card variant="interactive" hasTabs={true}>
  <CardSkipLink targetId="main-card-content" label="Skip to main content" />
  
  {/* Tab navigation */}
  <div role="tablist">
    {/* Tabs */}
  </div>
  
  {/* Main content */}
  <CardContent id="main-card-content" mainContent={true}>
    {/* Content */}
  </CardContent>
</Card>
```

### Screen Reader Only Text
Use visually hidden text to provide additional context:

```tsx
<CardTitle>
  Premium Plan
  <span className="sr-only">$99 per month</span>
</CardTitle>
```

## Focus Management

### Focus Indicators
All interactive elements must have visible focus indicators:

```css
.card-accessible:focus-visible {
  outline: 2px solid var(--card-brand-red);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.15);
}
```

### Focus Trapping for Modal Cards
For cards that act as modals, trap focus within the card:

```tsx
<Card variant="notification">
  <CardKeyboardNavigation
    cardId="modal-card"
    onEscape={() => closeModal()}
    onTab={() => focusNextElement()}
    onShiftTab={() => focusPreviousElement()}
  />
  {/* Card content */}
</Card>
```

## Color Contrast Requirements

- Text must have a contrast ratio of at least 4.5:1 against its background
- UI controls must have a contrast ratio of at least 3:1 against adjacent colors
- Focus indicators must have a contrast ratio of at least 3:1 against adjacent colors

```tsx
// Example of ensuring proper contrast
<Card 
  variant="glass" 
  style={{ 
    // Ensure text has sufficient contrast on glass background
    color: "rgba(0, 0, 0, 0.87)" 
  }}
>
  {/* Card content */}
</Card>
```

## Touch Target Sizes

All interactive elements should have a minimum touch target size of 44x44 pixels:

```css
@media (pointer: coarse) {
  .card-accessible button,
  .card-accessible a,
  .card-tab,
  .card-collapsible-trigger {
    min-height: 44px;
    min-width: 44px;
    padding: 12px;
  }
}
```

## Reduced Motion Support

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .card-hover,
  .card-focus,
  .card-animate-in,
  .card-animate-out {
    transition: none;
    animation: none;
  }
  
  .card-hover:hover {
    transform: none;
  }
}
```

## High Contrast Mode

Support high contrast mode:

```css
@media (prefers-contrast: high) {
  .card-accessible {
    border-width: 2px;
    border-color: currentColor;
  }
  
  .card-glass {
    background: white;
    backdrop-filter: none;
    border: 2px solid currentColor;
  }
  
  .card-accessible:focus-visible {
    outline: 4px solid currentColor;
    outline-offset: 2px;
  }
}
```

## Implementation Examples

### Basic Accessible Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui";

export function AccessibleServiceCard() {
  return (
    <Card
      variant="compact"
      interactive={true}
      ariaLabel="Lawn Mowing Service"
      role="button"
      onClick={() => window.location.href = '/services/lawn-mowing'}
    >
      <CardHeader>
        <CardTitle>Lawn Mowing</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Professional lawn mowing services starting at $25</CardDescription>
      </CardContent>
      <CardFooter>
        <span className="sr-only">Click to learn more about our lawn mowing service</span>
      </CardFooter>
    </Card>
  );
}
```

### Interactive Card with Tabs
```tsx
import { useState } from "react";
import { 
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  CardTab, CardTabPanel, CardAccessibilityProvider
} from "@/components/ui";

export function AccessibleJobCard() {
  const [activeTab, setActiveTab] = useState('details');
  
  return (
    <CardAccessibilityProvider>
      <Card
        variant="interactive"
        hasTabs={true}
        ariaLabel="Software Engineer job posting"
      >
        <CardHeader>
          <CardTitle>Software Engineer</CardTitle>
        </CardHeader>
        
        <div role="tablist" aria-label="Job information">
          <CardTab 
            id="details" 
            label="Job Details" 
            active={activeTab === 'details'} 
            onActivate={() => setActiveTab('details')}
          >
            Details
          </CardTab>
          <CardTab 
            id="requirements" 
            label="Requirements" 
            active={activeTab === 'requirements'} 
            onActivate={() => setActiveTab('requirements')}
          >
            Requirements
          </CardTab>
        </div>
        
        <CardTabPanel 
          id="details" 
          label="Job Details" 
          active={activeTab === 'details'}
        >
          <p>Full-time position with competitive salary...</p>
        </CardTabPanel>
        
        <CardTabPanel 
          id="requirements" 
          label="Requirements" 
          active={activeTab === 'requirements'}
        >
          <ul>
            <li>3+ years of experience</li>
            <li>React expertise</li>
          </ul>
        </CardTabPanel>
        
        <CardFooter>
          <button aria-label="Apply for Software Engineer position">
            Apply Now
          </button>
        </CardFooter>
      </Card>
    </CardAccessibilityProvider>
  );
}
```

### Notification Card with Screen Reader Announcement
```tsx
import { 
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  CardScreenReaderAnnouncement
} from "@/components/ui";

export function AccessibleNotificationCard() {
  return (
    <Card
      variant="notification"
      role="alert"
      ariaLive="polite"
      ariaAtomic={true}
    >
      <CardScreenReaderAnnouncement 
        announcement={{
          message: "New notification: Limited time offer available",
          politeness: "polite",
          timeout: 5000
        }}
      />
      
      <CardHeader>
        <CardTitle>Limited Time Offer</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p>Get 20% off your next service when you book this week!</p>
      </CardContent>
      
      <CardFooter>
        <button aria-label="Book service with 20% discount">Book Now</button>
        <button aria-label="Dismiss offer notification">Dismiss</button>
      </CardFooter>
    </Card>
  );
}
```

### Process Card with Collapsible Content
```tsx
import { useState } from "react";
import { 
  Card, CardHeader, CardTitle, CardContent,
  CardCollapsible, CardAccessibilityProvider
} from "@/components/ui";

export function AccessibleFaqCard() {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <CardAccessibilityProvider>
      <Card
        variant="process"
        collapsible={true}
        ariaLabel="Frequently Asked Questions"
      >
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        
        <CardContent>
          <CardCollapsible 
            id="faq-1" 
            label="How do I schedule a service?" 
            expanded={expanded} 
            onToggle={setExpanded}
          >
            <p>You can schedule a service by visiting our booking page or calling our customer service line.</p>
          </CardCollapsible>
        </CardContent>
      </Card>
    </CardAccessibilityProvider>
  );
}
```