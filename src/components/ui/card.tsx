
import * as React from "react"

import { cn } from "@/lib/utils"

// Enhanced Card Types and Interfaces
export type CardVariant = 'compact' | 'standard' | 'featured' | 'interactive' | 'glass' | 'notification' | 'process';
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CardElevation = 'none' | 'sm' | 'md' | 'lg' | 'xl';

// Enhanced accessibility interface for screen reader announcements
export interface AccessibilityAnnouncement {
  message: string;
  politeness?: 'polite' | 'assertive';
  timeout?: number;
}

export interface UnifiedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  elevation?: CardElevation;
  interactive?: boolean;
  hasImage?: boolean;
  hasTabs?: boolean;
  collapsible?: boolean;
  glassEffect?: boolean;
  gradient?: boolean;
  borderAccent?: boolean;
  // Enhanced accessibility props
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaHaspopup?: boolean | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
  ariaSelected?: boolean;
  ariaCurrent?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  ariaLive?: 'polite' | 'assertive' | 'off';
  ariaAtomic?: boolean;
  ariaRelevant?: 'additions' | 'removals' | 'text' | 'all';
  ariaPressed?: boolean | 'mixed';
  role?: string;
  tabIndex?: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  // Screen reader announcement
  announcement?: AccessibilityAnnouncement;
  // Accessibility state
  accessibilityState?: {
    busy?: boolean;
    checked?: boolean | 'mixed';
    disabled?: boolean;
    expanded?: boolean;
    selected?: boolean;
  };
}

const Card = React.forwardRef<HTMLDivElement, UnifiedCardProps>(
  ({ 
    className, 
    variant = 'standard', 
    size = 'md', 
    elevation = 'sm', 
    interactive = false,
    hasImage = false,
    hasTabs = false,
    collapsible = false,
    glassEffect = false,
    gradient = false,
    borderAccent = false,
    // Enhanced accessibility props
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaControls,
    ariaExpanded,
    ariaHaspopup,
    ariaSelected,
    ariaCurrent,
    ariaLive,
    ariaAtomic,
    ariaRelevant,
    ariaPressed,
    role,
    tabIndex,
    onKeyDown,
    announcement,
    accessibilityState,
    ...props 
  }, ref) => {
    // Create a ref for the live region
    const liveRegionRef = React.useRef<HTMLDivElement>(null);
    
    // Base styles that apply to all cards
    const baseStyles = "rounded-lg transition-all duration-300";
    
    // Variant-specific styles with enhanced accessibility
    const variantStyles = {
      compact: "bg-white border border-gray-100",
      standard: "bg-white border border-gray-100", 
      featured: "bg-white border border-gray-100",
      interactive: "bg-white border border-gray-100 card-interactive-a11y",
      glass: "bg-white/80 backdrop-blur-sm border border-white/20",
      notification: "bg-white border border-gray-200 card-notification-a11y",
      process: "bg-white border border-gray-100 card-process-a11y"
    };
    
    // Elevation styles
    const elevationStyles = {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md", 
      lg: "shadow-lg",
      xl: "shadow-xl"
    };
    
    // Interactive styles with enhanced accessibility
    const interactiveStyles = interactive 
      ? "hover:shadow-md hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-within:ring-2 focus-within:ring-brand-red/50 focus-within:ring-offset-2"
      : "";
    
    // Special effect styles
    const effectStyles = cn(
      glassEffect && "backdrop-blur-md bg-white/70",
      gradient && "bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white",
      borderAccent && "border-l-4 border-l-brand-red"
    );
    
    // Determine appropriate role based on variant and props
    const determineRole = () => {
      if (role) return role;
      
      if (interactive) return 'button';
      if (variant === 'notification') return 'alert';
      if (variant === 'process' && collapsible) return 'region';
      if (hasTabs) return 'tabpanel';
      
      return undefined;
    };
    
    // Determine appropriate tabIndex
    const determineTabIndex = () => {
      if (tabIndex !== undefined) return tabIndex;
      
      if (interactive || variant === 'interactive' || 
          (variant === 'process' && collapsible) || 
          (variant === 'notification')) {
        return 0;
      }
      
      return undefined;
    };
    
    // Comprehensive accessibility attributes
    const accessibilityProps = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-controls': ariaControls,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHaspopup,
      'aria-selected': ariaSelected,
      'aria-current': ariaCurrent,
      'aria-live': ariaLive,
      'aria-atomic': ariaAtomic,
      'aria-relevant': ariaRelevant,
      'aria-pressed': ariaPressed,
      'aria-busy': accessibilityState?.busy,
      'aria-checked': accessibilityState?.checked,
      'aria-disabled': accessibilityState?.disabled,
      role: determineRole(),
      tabIndex: determineTabIndex(),
      'data-variant': variant, // Add data attribute for CSS targeting
      'data-interactive': interactive ? 'true' : undefined,
      'data-collapsible': collapsible ? 'true' : undefined,
      'data-has-tabs': hasTabs ? 'true' : undefined,
    };
    
    // Enhanced keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Handle interactive cards
      if (interactive && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        // Trigger click event for interactive cards
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });
        event.currentTarget.dispatchEvent(clickEvent);
      }
      
      // Handle tab navigation for cards with tabs
      if (hasTabs && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        // This will be handled by the tab component, but we can dispatch a custom event
        const tabNavigationEvent = new CustomEvent('card-tab-navigation', {
          bubbles: true,
          detail: { direction: event.key === 'ArrowLeft' ? 'prev' : 'next' }
        });
        event.currentTarget.dispatchEvent(tabNavigationEvent);
      }
      
      // Handle collapsible cards
      if (collapsible && (event.key === 'Enter' || event.key === ' ')) {
        // This will be handled by the collapsible component
        const toggleEvent = new CustomEvent('card-toggle', {
          bubbles: true
        });
        event.currentTarget.dispatchEvent(toggleEvent);
      }
      
      // Call custom onKeyDown handler if provided
      if (onKeyDown) {
        onKeyDown(event);
      }
    };
    
    // Handle screen reader announcements
    React.useEffect(() => {
      if (announcement && liveRegionRef.current) {
        liveRegionRef.current.textContent = announcement.message;
        
        // Clear announcement after timeout
        if (announcement.timeout) {
          const timer = setTimeout(() => {
            if (liveRegionRef.current) {
              liveRegionRef.current.textContent = '';
            }
          }, announcement.timeout);
          
          return () => clearTimeout(timer);
        }
      }
    }, [announcement]);
    
    return (
      <>
        <div
          ref={ref}
          className={cn(
            baseStyles,
            variantStyles[variant],
            elevationStyles[elevation],
            interactiveStyles,
            effectStyles,
            "card-accessible", // Add accessibility utility class
            className
          )}
          onKeyDown={handleKeyDown}
          {...accessibilityProps}
          {...props}
        />
        
        {/* Screen reader announcements live region */}
        {announcement && (
          <div 
            ref={liveRegionRef}
            className="card-live-region"
            aria-live={announcement.politeness || "polite"}
            aria-atomic="true"
          />
        )}
        
        {/* Skip link for complex cards with multiple interactive elements */}
        {(hasTabs || collapsible) && (
          <a href="#main-content" className="card-skip-link">
            Skip to main content
          </a>
        )}
      </>
    );
  }
);
Card.displayName = "Card"

// Enhanced Card Sub-component Interfaces with accessibility props
interface CardSubComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
  // Accessibility props for sub-components
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
}

interface CardHeaderProps extends CardSubComponentProps {
  // Header-specific accessibility props
  headingId?: string; // ID for the header to be referenced by aria-labelledby
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size = 'md', ariaLabel, ariaLabelledBy, ariaDescribedBy, role, headingId, ...props }, ref) => {
    // Size-based padding for headers
    const headerPadding = {
      xs: "p-2 pb-1", // 8px, 4px bottom
      sm: "p-3 pb-2", // 12px, 8px bottom  
      md: "p-4 pb-3", // 16px, 12px bottom
      lg: "p-5 pb-4", // 20px, 16px bottom
      xl: "p-6 pb-5"  // 24px, 20px bottom
    };
    
    // Accessibility attributes for header
    const accessibilityProps = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'role': role || 'banner', // Default role for header
      'id': headingId, // Optional ID for aria-labelledby references
    };
    
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1", headerPadding[size], className)}
        {...accessibilityProps}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: CardSize;
  // Title-specific accessibility props
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6; // Allow specifying heading level for proper document structure
  visuallyHidden?: boolean; // Option to visually hide but keep accessible to screen readers
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size = 'md', headingLevel = 3, visuallyHidden = false, ...props }, ref) => {
    // Size-based typography for titles
    const titleSizes = {
      xs: "text-sm font-semibold",
      sm: "text-base font-semibold",
      md: "text-lg font-semibold", 
      lg: "text-xl font-bold",
      xl: "text-2xl font-bold"
    };
    
    // Create the appropriate heading element based on headingLevel
    const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
    
    return (
      <HeadingTag
        ref={ref}
        className={cn(
          titleSizes[size],
          "leading-tight tracking-tight",
          visuallyHidden && "sr-only", // Screen reader only if visuallyHidden
          className
        )}
        {...props}
      />
    );
  }
) as React.ForwardRefExoticComponent<CardTitleProps & React.RefAttributes<HTMLHeadingElement>>;
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps extends CardSubComponentProps {
  visuallyHidden?: boolean; // Option to visually hide but keep accessible to screen readers
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size = 'md', ariaLabel, ariaDescribedBy, visuallyHidden = false, ...props }, ref) => {
    // Size-based typography for descriptions
    const descriptionSizes = {
      xs: "text-xs text-muted-foreground",
      sm: "text-sm text-muted-foreground",
      md: "text-sm text-muted-foreground",
      lg: "text-base text-muted-foreground", 
      xl: "text-lg text-muted-foreground"
    };
    
    // Accessibility attributes for description
    const accessibilityProps = {
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    };
    
    return (
      <p
        ref={ref}
        className={cn(
          descriptionSizes[size], 
          visuallyHidden && "sr-only",
          className
        )}
        {...accessibilityProps}
        {...props}
      />
    );
  }
);
CardDescription.displayName = "CardDescription";

interface CardContentProps extends CardSubComponentProps {
  // Content-specific accessibility props
  mainContent?: boolean; // Whether this is the main content area (for skip links)
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size = 'md', ariaLabel, ariaLabelledBy, ariaDescribedBy, role, mainContent = false, ...props }, ref) => {
    // Size-based padding for content
    const contentPadding = {
      xs: "p-2 pt-0",
      sm: "p-3 pt-0", 
      md: "p-4 pt-0",
      lg: "p-5 pt-0",
      xl: "p-6 pt-0"
    };
    
    // Accessibility attributes for content
    const accessibilityProps = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'role': role || (mainContent ? 'main' : undefined),
      'id': mainContent ? 'main-content' : undefined, // ID for skip link target
      'tabIndex': mainContent ? -1 : undefined, // Make focusable for skip links but not in tab order
    };
    
    return (
      <div 
        ref={ref} 
        className={cn(contentPadding[size], className)} 
        {...accessibilityProps}
        {...props} 
      />
    );
  }
);
CardContent.displayName = "CardContent";

interface CardFooterProps extends CardSubComponentProps {
  // Footer-specific accessibility props
  actionLabels?: Record<string, string>; // Labels for action buttons for screen readers
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size = 'md', ariaLabel, ariaLabelledBy, ariaDescribedBy, role, actionLabels, ...props }, ref) => {
    // Size-based padding for footers
    const footerPadding = {
      xs: "p-2 pt-0",
      sm: "p-3 pt-0",
      md: "p-4 pt-0", 
      lg: "p-5 pt-0",
      xl: "p-6 pt-0"
    };
    
    // Accessibility attributes for footer
    const accessibilityProps = {
      'aria-label': ariaLabel || 'Card actions',
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'role': role || 'contentinfo',
    };
    
    return (
      <div
        ref={ref}
        className={cn("flex items-center", footerPadding[size], className)}
        {...accessibilityProps}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
