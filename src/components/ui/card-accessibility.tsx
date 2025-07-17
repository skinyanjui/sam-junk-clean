import * as React from "react";
import { AccessibilityAnnouncement } from "./card";

/**
 * CardAccessibilityContext - Context for managing card accessibility features
 * This provides screen reader announcements and keyboard navigation support
 */
interface CardAccessibilityContextType {
  // Screen reader announcements
  announce: (message: string, options?: { politeness?: 'polite' | 'assertive', timeout?: number }) => void;
  // Keyboard navigation
  registerKeyHandler: (id: string, handler: (event: KeyboardEvent) => void) => void;
  unregisterKeyHandler: (id: string) => void;
  // Focus management
  setFocusableElements: (elements: HTMLElement[]) => void;
  focusNext: () => void;
  focusPrevious: () => void;
  // Tab management for interactive cards
  registerTab: (id: string, element: HTMLElement) => void;
  unregisterTab: (id: string) => void;
  activateTab: (id: string) => void;
  // Collapsible content management
  registerCollapsible: (id: string, element: HTMLElement, content: HTMLElement) => void;
  unregisterCollapsible: (id: string) => void;
  toggleCollapsible: (id: string) => void;
}

const CardAccessibilityContext = React.createContext<CardAccessibilityContextType | undefined>(undefined);

/**
 * CardAccessibilityProvider - Provider component for card accessibility features
 */
export const CardAccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Ref for live region element
  const liveRegionRef = React.useRef<HTMLDivElement | null>(null);
  
  // State for keyboard handlers, focusable elements, tabs, and collapsibles
  const keyHandlers = React.useRef<Record<string, (event: KeyboardEvent) => void>>({});
  const [focusableElements, setFocusableElements] = React.useState<HTMLElement[]>([]);
  const tabs = React.useRef<Record<string, HTMLElement>>({});
  const collapsibles = React.useRef<Record<string, { trigger: HTMLElement, content: HTMLElement, expanded: boolean }>>({});
  
  // Create live region on mount
  React.useEffect(() => {
    if (!liveRegionRef.current) {
      const liveRegion = document.createElement('div');
      liveRegion.className = 'card-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      document.body.appendChild(liveRegion);
      liveRegionRef.current = liveRegion;
    }
    
    return () => {
      if (liveRegionRef.current) {
        document.body.removeChild(liveRegionRef.current);
      }
    };
  }, []);
  
  // Screen reader announcement function
  const announce = React.useCallback((message: string, options?: { politeness?: 'polite' | 'assertive', timeout?: number }) => {
    if (!liveRegionRef.current) return;
    
    const { politeness = 'polite', timeout = 5000 } = options || {};
    
    // Set politeness level
    liveRegionRef.current.setAttribute('aria-live', politeness);
    
    // Set the announcement message
    liveRegionRef.current.textContent = message;
    
    // Clear after timeout
    if (timeout) {
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = '';
        }
      }, timeout);
    }
  }, []);
  
  // Keyboard navigation registration
  const registerKeyHandler = React.useCallback((id: string, handler: (event: KeyboardEvent) => void) => {
    keyHandlers.current[id] = handler;
  }, []);
  
  const unregisterKeyHandler = React.useCallback((id: string) => {
    delete keyHandlers.current[id];
  }, []);
  
  // Focus management
  const focusNext = React.useCallback(() => {
    if (focusableElements.length === 0) return;
    
    const activeIndex = focusableElements.findIndex(el => el === document.activeElement);
    const nextIndex = activeIndex < focusableElements.length - 1 ? activeIndex + 1 : 0;
    
    focusableElements[nextIndex].focus();
  }, [focusableElements]);
  
  const focusPrevious = React.useCallback(() => {
    if (focusableElements.length === 0) return;
    
    const activeIndex = focusableElements.findIndex(el => el === document.activeElement);
    const prevIndex = activeIndex > 0 ? activeIndex - 1 : focusableElements.length - 1;
    
    focusableElements[prevIndex].focus();
  }, [focusableElements]);
  
  // Tab management
  const registerTab = React.useCallback((id: string, element: HTMLElement) => {
    tabs.current[id] = element;
  }, []);
  
  const unregisterTab = React.useCallback((id: string) => {
    delete tabs.current[id];
  }, []);
  
  const activateTab = React.useCallback((id: string) => {
    const tabElement = tabs.current[id];
    if (!tabElement) return;
    
    // Update ARIA attributes for all tabs
    Object.entries(tabs.current).forEach(([tabId, element]) => {
      const isActive = tabId === id;
      element.setAttribute('aria-selected', isActive.toString());
      element.tabIndex = isActive ? 0 : -1;
      
      // Find associated panel by aria-controls
      const panelId = element.getAttribute('aria-controls');
      if (panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.setAttribute('aria-hidden', (!isActive).toString());
        }
      }
    });
    
    // Focus the active tab
    tabElement.focus();
    
    // Announce tab change to screen readers
    const tabLabel = tabElement.getAttribute('aria-label') || tabElement.textContent;
    if (tabLabel) {
      announce(`${tabLabel} tab activated`, { politeness: 'polite' });
    }
  }, [announce]);
  
  // Collapsible content management
  const registerCollapsible = React.useCallback((id: string, trigger: HTMLElement, content: HTMLElement) => {
    collapsibles.current[id] = { 
      trigger, 
      content, 
      expanded: trigger.getAttribute('aria-expanded') === 'true'
    };
  }, []);
  
  const unregisterCollapsible = React.useCallback((id: string) => {
    delete collapsibles.current[id];
  }, []);
  
  const toggleCollapsible = React.useCallback((id: string) => {
    const collapsible = collapsibles.current[id];
    if (!collapsible) return;
    
    const { trigger, content, expanded } = collapsible;
    const newExpandedState = !expanded;
    
    // Update state
    collapsibles.current[id].expanded = newExpandedState;
    
    // Update ARIA attributes
    trigger.setAttribute('aria-expanded', newExpandedState.toString());
    content.setAttribute('aria-hidden', (!newExpandedState).toString());
    
    // Toggle visibility
    content.style.display = newExpandedState ? 'block' : 'none';
    
    // Announce state change to screen readers
    const triggerLabel = trigger.getAttribute('aria-label') || trigger.textContent;
    if (triggerLabel) {
      announce(`${triggerLabel} ${newExpandedState ? 'expanded' : 'collapsed'}`, { politeness: 'polite' });
    }
  }, [announce]);
  
  // Global keyboard event handler
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Execute all registered key handlers
      Object.values(keyHandlers.current).forEach(handler => {
        handler(event);
      });
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const contextValue = React.useMemo(() => ({
    announce,
    registerKeyHandler,
    unregisterKeyHandler,
    setFocusableElements,
    focusNext,
    focusPrevious,
    registerTab,
    unregisterTab,
    activateTab,
    registerCollapsible,
    unregisterCollapsible,
    toggleCollapsible
  }), [
    announce, 
    registerKeyHandler, 
    unregisterKeyHandler, 
    setFocusableElements,
    focusNext, 
    focusPrevious, 
    registerTab, 
    unregisterTab, 
    activateTab,
    registerCollapsible,
    unregisterCollapsible,
    toggleCollapsible
  ]);
  
  return (
    <CardAccessibilityContext.Provider value={contextValue}>
      {children}
    </CardAccessibilityContext.Provider>
  );
};

/**
 * useCardAccessibility - Hook for accessing card accessibility features
 */
export const useCardAccessibility = () => {
  const context = React.useContext(CardAccessibilityContext);
  if (!context) {
    throw new Error('useCardAccessibility must be used within a CardAccessibilityProvider');
  }
  return context;
};

/**
 * CardScreenReaderAnnouncement - Component for screen reader announcements
 */
interface CardScreenReaderAnnouncementProps {
  announcement: AccessibilityAnnouncement;
}

export const CardScreenReaderAnnouncement: React.FC<CardScreenReaderAnnouncementProps> = ({ 
  announcement 
}) => {
  const { announce } = useCardAccessibility();
  
  React.useEffect(() => {
    if (announcement) {
      announce(announcement.message, {
        politeness: announcement.politeness,
        timeout: announcement.timeout
      });
    }
  }, [announcement, announce]);
  
  return null;
};

/**
 * CardKeyboardNavigation - Component for keyboard navigation in complex cards
 */
interface CardKeyboardNavigationProps {
  cardId: string;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEnter?: () => void;
  onSpace?: () => void;
  onEscape?: () => void;
  onHome?: () => void;
  onEnd?: () => void;
  onTab?: () => void;
  onShiftTab?: () => void;
}

export const CardKeyboardNavigation: React.FC<CardKeyboardNavigationProps> = ({
  cardId,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onEnter,
  onSpace,
  onEscape,
  onHome,
  onEnd,
  onTab,
  onShiftTab
}) => {
  const { registerKeyHandler, unregisterKeyHandler } = useCardAccessibility();
  
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if (onArrowUp) {
            event.preventDefault();
            onArrowUp();
          }
          break;
        case 'ArrowDown':
          if (onArrowDown) {
            event.preventDefault();
            onArrowDown();
          }
          break;
        case 'ArrowLeft':
          if (onArrowLeft) {
            event.preventDefault();
            onArrowLeft();
          }
          break;
        case 'ArrowRight':
          if (onArrowRight) {
            event.preventDefault();
            onArrowRight();
          }
          break;
        case 'Enter':
          if (onEnter) {
            event.preventDefault();
            onEnter();
          }
          break;
        case ' ':
          if (onSpace) {
            event.preventDefault();
            onSpace();
          }
          break;
        case 'Escape':
          if (onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;
        case 'Home':
          if (onHome) {
            event.preventDefault();
            onHome();
          }
          break;
        case 'End':
          if (onEnd) {
            event.preventDefault();
            onEnd();
          }
          break;
        case 'Tab':
          if (event.shiftKey && onShiftTab) {
            onShiftTab();
          } else if (!event.shiftKey && onTab) {
            onTab();
          }
          break;
      }
    };
    
    registerKeyHandler(cardId, handleKeyDown);
    
    return () => {
      unregisterKeyHandler(cardId);
    };
  }, [
    cardId,
    registerKeyHandler,
    unregisterKeyHandler,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onEnter,
    onSpace,
    onEscape,
    onHome,
    onEnd,
    onTab,
    onShiftTab
  ]);
  
  return null;
};

/**
 * CardTabPanel - Accessible tab panel component for interactive cards
 */
interface CardTabPanelProps {
  id: string;
  label: string;
  children: React.ReactNode;
  active?: boolean;
  onActivate?: () => void;
}

export const CardTab: React.FC<Omit<CardTabPanelProps, 'label'>> = ({
  id,
  children,
  active = false,
  onActivate
}) => {
  const { registerTab, unregisterTab } = useCardAccessibility();
  const tabRef = React.useRef<HTMLButtonElement>(null);
  
  React.useEffect(() => {
    if (tabRef.current) {
      registerTab(id, tabRef.current);
    }
    
    return () => {
      unregisterTab(id);
    };
  }, [id, registerTab, unregisterTab]);
  
  const handleClick = () => {
    if (onActivate) {
      onActivate();
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onActivate) {
        onActivate();
      }
    }
  };
  
  return (
    <button
      ref={tabRef}
      id={`tab-${id}`}
      role="tab"
      aria-selected={active}
      aria-controls={`tabpanel-${id}`}
      tabIndex={active ? 0 : -1}
      className={`card-tab ${active ? 'active' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
      <span className="sr-only">{active ? '(Selected)' : ''}</span>
    </button>
  );
};

export const CardTabPanel: React.FC<CardTabPanelProps> = ({
  id,
  label,
  children,
  active = false
}) => {
  return (
    <div
      id={`tabpanel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      aria-hidden={!active}
      tabIndex={0}
      className="card-tabpanel"
      style={{ display: active ? 'block' : 'none' }}
    >
      {children}
    </div>
  );
};

/**
 * CardCollapsible - Accessible collapsible component for cards
 */
interface CardCollapsibleProps {
  id: string;
  label: string;
  children: React.ReactNode;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
}

export const CardCollapsible: React.FC<CardCollapsibleProps> = ({
  id,
  label,
  children,
  expanded = false,
  onToggle
}) => {
  const { registerCollapsible, unregisterCollapsible, toggleCollapsible } = useCardAccessibility();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = React.useState(expanded);
  
  React.useEffect(() => {
    if (triggerRef.current && contentRef.current) {
      registerCollapsible(id, triggerRef.current, contentRef.current);
    }
    
    return () => {
      unregisterCollapsible(id);
    };
  }, [id, registerCollapsible, unregisterCollapsible]);
  
  const handleToggle = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    if (onToggle) {
      onToggle(newExpandedState);
    }
    
    toggleCollapsible(id);
  };
  
  return (
    <div className="card-collapsible">
      <button
        ref={triggerRef}
        id={`collapsible-trigger-${id}`}
        className="card-collapsible-trigger"
        aria-expanded={isExpanded}
        aria-controls={`collapsible-content-${id}`}
        onClick={handleToggle}
      >
        {label}
        <span className="card-collapsible-icon">
          {isExpanded ? '▲' : '▼'}
        </span>
        <span className="sr-only">
          {isExpanded ? 'Collapse' : 'Expand'}
        </span>
      </button>
      <div
        ref={contentRef}
        id={`collapsible-content-${id}`}
        role="region"
        aria-labelledby={`collapsible-trigger-${id}`}
        aria-hidden={!isExpanded}
        className="card-collapsible-content"
        style={{ display: isExpanded ? 'block' : 'none' }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * CardSkipLink - Component for skip links in complex cards
 */
interface CardSkipLinkProps {
  targetId: string;
  label?: string;
}

export const CardSkipLink: React.FC<CardSkipLinkProps> = ({
  targetId,
  label = 'Skip to content'
}) => {
  return (
    <a href={`#${targetId}`} className="card-skip-link">
      {label}
    </a>
  );
};

/**
 * CardAccessibleImage - Component for accessible images in cards
 */
interface CardAccessibleImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  decorative?: boolean;
}

export const CardAccessibleImage: React.FC<CardAccessibleImageProps> = ({
  alt,
  decorative = false,
  ...props
}) => {
  return (
    <img
      {...props}
      alt={decorative ? '' : alt}
      aria-hidden={decorative}
    />
  );
};