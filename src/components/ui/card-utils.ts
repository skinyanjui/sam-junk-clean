// Card System Utilities
// Helper functions and hooks for the unified card system

import { CardVariant, CardSize, CardElevation } from './card';
import { CARD_CONFIGS, CardConfigKey } from './design-system';

// Utility function to generate card classes based on props
export function getCardClasses({
  variant = 'standard',
  size = 'md',
  elevation = 'sm',
  interactive = false,
  glassEffect = false,
  gradient = false,
  borderAccent = false,
  responsive = true,
  loading = false,
  state
}: {
  variant?: CardVariant;
  size?: CardSize;
  elevation?: CardElevation;
  interactive?: boolean;
  glassEffect?: boolean;
  gradient?: boolean;
  borderAccent?: boolean;
  responsive?: boolean;
  loading?: boolean;
  state?: 'error' | 'success' | 'warning';
}): string {
  const classes: string[] = [];

  // Base card classes
  classes.push('card-accessible');

  // Interactive states
  if (interactive) {
    classes.push('card-interactive', 'card-hover', 'card-focus');
  }

  // Special effects
  if (glassEffect) {
    classes.push('card-glass');
  }

  if (gradient) {
    classes.push('card-gradient');
  }

  if (borderAccent) {
    classes.push('card-border-accent');
  }

  // Responsive behavior
  if (responsive) {
    classes.push('card-responsive');
  }

  // Loading state
  if (loading) {
    classes.push('card-loading');
  }

  // State classes
  if (state) {
    classes.push(`card-${state}`);
  }

  // Notification specific
  if (variant === 'notification') {
    classes.push('card-notification');
  }

  return classes.join(' ');
}

// Utility function to get predefined card configuration
export function useCardConfig(configKey: CardConfigKey) {
  return CARD_CONFIGS[configKey];
}

// Utility function to get responsive padding based on size
export function getCardPadding(size: CardSize): string {
  const paddingMap = {
    xs: 'card-padding-xs',
    sm: 'card-padding-sm',
    md: 'card-padding-md',
    lg: 'card-padding-lg',
    xl: 'card-padding-xl'
  };
  
  return paddingMap[size];
}

// Utility function to get header padding based on size
export function getCardHeaderPadding(size: CardSize): string {
  const paddingMap = {
    xs: 'card-header-xs',
    sm: 'card-header-sm',
    md: 'card-header-md',
    lg: 'card-header-lg',
    xl: 'card-header-xl'
  };
  
  return paddingMap[size];
}

// Utility function to determine if a card should be interactive
export function shouldBeInteractive(variant: CardVariant): boolean {
  const interactiveVariants: CardVariant[] = ['interactive', 'notification', 'process'];
  return interactiveVariants.includes(variant);
}

// Utility function to get appropriate elevation for variant
export function getVariantElevation(variant: CardVariant): CardElevation {
  const elevationMap: Record<CardVariant, CardElevation> = {
    compact: 'sm',
    standard: 'sm',
    featured: 'md',
    interactive: 'sm',
    glass: 'md',
    notification: 'xl',
    process: 'sm'
  };
  
  return elevationMap[variant];
}

// Utility function to get appropriate size for variant
export function getVariantSize(variant: CardVariant): CardSize {
  const sizeMap: Record<CardVariant, CardSize> = {
    compact: 'sm',
    standard: 'md',
    featured: 'md',
    interactive: 'lg',
    glass: 'lg',
    notification: 'sm',
    process: 'md'
  };
  
  return sizeMap[variant];
}

// Animation utility functions
export function animateCardIn(element: HTMLElement): void {
  element.classList.add('card-animate-in');
  
  // Remove animation class after animation completes
  setTimeout(() => {
    element.classList.remove('card-animate-in');
  }, 300);
}

export function animateCardOut(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    element.classList.add('card-animate-out');
    
    setTimeout(() => {
      element.classList.remove('card-animate-out');
      resolve();
    }, 300);
  });
}

// Card state management utilities
export function setCardState(element: HTMLElement, state: 'error' | 'success' | 'warning' | null): void {
  // Remove existing state classes
  element.classList.remove('card-error', 'card-success', 'card-warning');
  
  // Add new state class if provided
  if (state) {
    element.classList.add(`card-${state}`);
  }
}

export function setCardLoading(element: HTMLElement, loading: boolean): void {
  if (loading) {
    element.classList.add('card-loading');
  } else {
    element.classList.remove('card-loading');
  }
}

// Enhanced Accessibility utilities
export interface AccessibilityOptions {
  // Basic ARIA attributes
  role?: string;
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
  tabIndex?: number;
  // Card-specific accessibility
  cardVariant?: CardVariant;
  interactive?: boolean;
  collapsible?: boolean;
  hasTabs?: boolean;
  // State attributes
  busy?: boolean;
  checked?: boolean | 'mixed';
  disabled?: boolean;
  expanded?: boolean;
  selected?: boolean;
  // Screen reader announcement
  announcement?: {
    message: string;
    politeness?: 'polite' | 'assertive';
    timeout?: number;
  };
}

export function makeCardAccessible(element: HTMLElement, options: AccessibilityOptions): void {
  const {
    role,
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
    tabIndex,
    cardVariant,
    interactive,
    collapsible,
    hasTabs,
    busy,
    checked,
    disabled,
    expanded,
    selected
  } = options;
  
  // Determine appropriate role based on variant and props
  const determineRole = () => {
    if (role) return role;
    
    if (interactive) return 'button';
    if (cardVariant === 'notification') return 'alert';
    if (cardVariant === 'process' && collapsible) return 'region';
    if (hasTabs) return 'tabpanel';
    
    return undefined;
  };
  
  // Determine appropriate tabIndex
  const determineTabIndex = () => {
    if (tabIndex !== undefined) return tabIndex;
    
    if (interactive || cardVariant === 'interactive' || 
        (cardVariant === 'process' && collapsible) || 
        (cardVariant === 'notification')) {
      return 0;
    }
    
    return undefined;
  };
  
  // Set basic ARIA attributes
  const finalRole = determineRole();
  if (finalRole) {
    element.setAttribute('role', finalRole);
  }
  
  if (ariaLabel) {
    element.setAttribute('aria-label', ariaLabel);
  }
  
  if (ariaLabelledBy) {
    element.setAttribute('aria-labelledby', ariaLabelledBy);
  }
  
  if (ariaDescribedBy) {
    element.setAttribute('aria-describedby', ariaDescribedBy);
  }
  
  if (ariaControls) {
    element.setAttribute('aria-controls', ariaControls);
  }
  
  if (ariaExpanded !== undefined) {
    element.setAttribute('aria-expanded', ariaExpanded.toString());
  }
  
  if (ariaHaspopup !== undefined) {
    element.setAttribute('aria-haspopup', ariaHaspopup.toString());
  }
  
  if (ariaSelected !== undefined) {
    element.setAttribute('aria-selected', ariaSelected.toString());
  }
  
  if (ariaCurrent !== undefined) {
    element.setAttribute('aria-current', ariaCurrent.toString());
  }
  
  if (ariaLive) {
    element.setAttribute('aria-live', ariaLive);
  }
  
  if (ariaAtomic !== undefined) {
    element.setAttribute('aria-atomic', ariaAtomic.toString());
  }
  
  if (ariaRelevant) {
    element.setAttribute('aria-relevant', ariaRelevant);
  }
  
  if (ariaPressed !== undefined) {
    element.setAttribute('aria-pressed', ariaPressed.toString());
  }
  
  const finalTabIndex = determineTabIndex();
  if (finalTabIndex !== undefined) {
    element.setAttribute('tabindex', finalTabIndex.toString());
  }
  
  // Set state attributes
  if (busy !== undefined) {
    element.setAttribute('aria-busy', busy.toString());
  }
  
  if (checked !== undefined) {
    element.setAttribute('aria-checked', checked.toString());
  }
  
  if (disabled !== undefined) {
    element.setAttribute('aria-disabled', disabled.toString());
    if (disabled) {
      element.setAttribute('tabindex', '-1');
    }
  }
  
  if (expanded !== undefined) {
    element.setAttribute('aria-expanded', expanded.toString());
  }
  
  if (selected !== undefined) {
    element.setAttribute('aria-selected', selected.toString());
  }
  
  // Set data attributes for CSS targeting
  if (cardVariant) {
    element.setAttribute('data-variant', cardVariant);
  }
  
  if (interactive) {
    element.setAttribute('data-interactive', 'true');
  }
  
  if (collapsible) {
    element.setAttribute('data-collapsible', 'true');
  }
  
  if (hasTabs) {
    element.setAttribute('data-has-tabs', 'true');
  }
}

// Create a screen reader announcement
export function announceToScreenReader(message: string, options: {
  politeness?: 'polite' | 'assertive';
  timeout?: number;
} = {}): void {
  const { politeness = 'polite', timeout = 5000 } = options;
  
  // Create or get existing live region
  let liveRegion = document.getElementById('card-live-region');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'card-live-region';
    liveRegion.className = 'card-live-region';
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
  }
  
  // Set the announcement message
  liveRegion.textContent = message;
  
  // Clear after timeout
  if (timeout) {
    setTimeout(() => {
      liveRegion.textContent = '';
    }, timeout);
  }
}

// Add keyboard navigation to interactive cards
export function setupCardKeyboardNavigation(element: HTMLElement, options: {
  onClick?: () => void;
  onExpand?: () => void;
  onCollapse?: () => void;
  onTabChange?: (direction: 'next' | 'prev') => void;
}): () => void {
  const { onClick, onExpand, onCollapse, onTabChange } = options;
  
  const handleKeyDown = (event: KeyboardEvent) => {
    // Handle interactive cards
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      
      if (onClick) {
        onClick();
      } else {
        // Trigger click event for interactive cards
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });
        element.dispatchEvent(clickEvent);
      }
      
      // Handle collapsible state
      const isExpanded = element.getAttribute('aria-expanded') === 'true';
      if (isExpanded && onCollapse) {
        onCollapse();
      } else if (!isExpanded && onExpand) {
        onExpand();
      }
    }
    
    // Handle tab navigation for cards with tabs
    if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && 
        element.hasAttribute('data-has-tabs')) {
      event.preventDefault();
      
      const direction = event.key === 'ArrowLeft' ? 'prev' : 'next';
      if (onTabChange) {
        onTabChange(direction);
      } else {
        // Dispatch custom event for tab navigation
        const tabNavigationEvent = new CustomEvent('card-tab-navigation', {
          bubbles: true,
          detail: { direction }
        });
        element.dispatchEvent(tabNavigationEvent);
      }
    }
  };
  
  // Add event listener
  element.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

// Setup focus trap for complex cards (like modals)
export function setupCardFocusTrap(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  // Add event listener
  element.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

// Card measurement utilities
export function getCardDimensions(element: HTMLElement): {
  width: number;
  height: number;
  aspectRatio: number;
} {
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    aspectRatio: rect.width / rect.height
  };
}

// Card visibility utilities
export function isCardInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Card grid utilities
export function calculateOptimalCardColumns(
  containerWidth: number,
  cardMinWidth: number,
  gap: number = 16
): number {
  const availableWidth = containerWidth - gap;
  const cardWithGap = cardMinWidth + gap;
  const columns = Math.floor(availableWidth / cardWithGap);
  return Math.max(1, columns);
}

// Card performance utilities
export function debounceCardInteraction(
  callback: () => void,
  delay: number = 150
): () => void {
  let timeoutId: NodeJS.Timeout;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}

// Card theme utilities
export function applyCardTheme(element: HTMLElement, theme: 'light' | 'dark'): void {
  element.classList.remove('card-theme-light', 'card-theme-dark');
  element.classList.add(`card-theme-${theme}`);
}

// Export all utilities as a single object for easier importing
export const CardUtils = {
  getCardClasses,
  useCardConfig,
  getCardPadding,
  getCardHeaderPadding,
  shouldBeInteractive,
  getVariantElevation,
  getVariantSize,
  animateCardIn,
  animateCardOut,
  setCardState,
  setCardLoading,
  makeCardAccessible,
  getCardDimensions,
  isCardInViewport,
  calculateOptimalCardColumns,
  debounceCardInteraction,
  applyCardTheme
};