// React Hook for Card Interactions
// Custom hook to manage card states, animations, and interactions

import { useCallback, useEffect, useRef, useState } from 'react';
import { CardUtils } from '@/components/ui/card-utils';

export interface UseCardInteractionsOptions {
  interactive?: boolean;
  animateOnMount?: boolean;
  hoverDelay?: number;
  clickDelay?: number;
  trackVisibility?: boolean;
}

export interface CardInteractionState {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
  isVisible: boolean;
  isLoading: boolean;
  state: 'error' | 'success' | 'warning' | null;
}

export function useCardInteractions(options: UseCardInteractionsOptions = {}) {
  const {
    interactive = false,
    animateOnMount = false,
    hoverDelay = 0,
    clickDelay = 150,
    trackVisibility = false
  } = options;

  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const clickTimeoutRef = useRef<NodeJS.Timeout>();

  const [state, setState] = useState<CardInteractionState>({
    isHovered: false,
    isFocused: false,
    isPressed: false,
    isVisible: false,
    isLoading: false,
    state: null
  });

  // Handle mouse enter with optional delay
  const handleMouseEnter = useCallback(() => {
    if (!interactive) return;

    if (hoverDelay > 0) {
      hoverTimeoutRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, isHovered: true }));
      }, hoverDelay);
    } else {
      setState(prev => ({ ...prev, isHovered: true }));
    }
  }, [interactive, hoverDelay]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    if (!interactive) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setState(prev => ({ ...prev, isHovered: false }));
  }, [interactive]);

  // Handle focus
  const handleFocus = useCallback(() => {
    if (!interactive) return;
    setState(prev => ({ ...prev, isFocused: true }));
  }, [interactive]);

  // Handle blur
  const handleBlur = useCallback(() => {
    if (!interactive) return;
    setState(prev => ({ ...prev, isFocused: false }));
  }, [interactive]);

  // Handle mouse down
  const handleMouseDown = useCallback(() => {
    if (!interactive) return;
    setState(prev => ({ ...prev, isPressed: true }));
  }, [interactive]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (!interactive) return;
    setState(prev => ({ ...prev, isPressed: false }));
  }, [interactive]);

  // Handle click with optional delay
  const handleClick = useCallback((callback?: () => void) => {
    if (!interactive || !callback) return;

    if (clickDelay > 0) {
      clickTimeoutRef.current = setTimeout(callback, clickDelay);
    } else {
      callback();
    }
  }, [interactive, clickDelay]);

  // Set loading state
  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
    
    if (cardRef.current) {
      CardUtils.setCardLoading(cardRef.current, loading);
    }
  }, []);

  // Set card state (error, success, warning)
  const setCardState = useCallback((newState: 'error' | 'success' | 'warning' | null) => {
    setState(prev => ({ ...prev, state: newState }));
    
    if (cardRef.current) {
      CardUtils.setCardState(cardRef.current, newState);
    }
  }, []);

  // Animate card in
  const animateIn = useCallback(() => {
    if (cardRef.current) {
      CardUtils.animateCardIn(cardRef.current);
    }
  }, []);

  // Animate card out
  const animateOut = useCallback(async () => {
    if (cardRef.current) {
      await CardUtils.animateCardOut(cardRef.current);
    }
  }, []);

  // Check visibility
  const checkVisibility = useCallback(() => {
    if (!trackVisibility || !cardRef.current) return;

    const isVisible = CardUtils.isCardInViewport(cardRef.current);
    setState(prev => ({ ...prev, isVisible }));
  }, [trackVisibility]);

  // Set up intersection observer for visibility tracking
  useEffect(() => {
    if (!trackVisibility || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(prev => ({ ...prev, isVisible: entry.isIntersecting }));
      },
      { threshold: 0.1 }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [trackVisibility]);

  // Animate on mount if requested
  useEffect(() => {
    if (animateOnMount && cardRef.current) {
      // Small delay to ensure element is rendered
      setTimeout(() => {
        animateIn();
      }, 50);
    }
  }, [animateOnMount, animateIn]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  // Event handlers object
  const eventHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onClick: (callback?: () => void) => handleClick(callback)
  };

  // Actions object
  const actions = {
    setLoading,
    setCardState,
    animateIn,
    animateOut,
    checkVisibility
  };

  return {
    cardRef,
    state,
    eventHandlers,
    actions
  };
}

// Hook for managing card collections (grids, lists)
export function useCardCollection<T>(
  items: T[],
  options: {
    animateOnMount?: boolean;
    staggerDelay?: number;
    trackVisibility?: boolean;
  } = {}
) {
  const { animateOnMount = false, staggerDelay = 100, trackVisibility = false } = options;
  
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [loadingItems, setLoadingItems] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, items.length);
  }, [items.length]);

  // Animate items on mount with stagger
  useEffect(() => {
    if (!animateOnMount) return;

    items.forEach((_, index) => {
      setTimeout(() => {
        const element = cardRefs.current[index];
        if (element) {
          CardUtils.animateCardIn(element);
        }
      }, index * staggerDelay);
    });
  }, [items, animateOnMount, staggerDelay]);

  // Set up intersection observers for visibility tracking
  useEffect(() => {
    if (!trackVisibility) return;

    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleItems(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(index);
            } else {
              newSet.delete(index);
            }
            return newSet;
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [items, trackVisibility]);

  // Set loading state for specific item
  const setItemLoading = useCallback((index: number, loading: boolean) => {
    setLoadingItems(prev => {
      const newSet = new Set(prev);
      if (loading) {
        newSet.add(index);
      } else {
        newSet.delete(index);
      }
      return newSet;
    });

    const element = cardRefs.current[index];
    if (element) {
      CardUtils.setCardLoading(element, loading);
    }
  }, []);

  // Animate specific item
  const animateItem = useCallback((index: number) => {
    const element = cardRefs.current[index];
    if (element) {
      CardUtils.animateCardIn(element);
    }
  }, []);

  // Get ref for specific item
  const getItemRef = useCallback((index: number) => {
    return (element: HTMLDivElement | null) => {
      cardRefs.current[index] = element;
    };
  }, []);

  return {
    visibleItems,
    loadingItems,
    setItemLoading,
    animateItem,
    getItemRef
  };
}