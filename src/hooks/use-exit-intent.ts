
import { useState, useEffect, useCallback } from 'react';

interface UseExitIntentOptions {
  enabled?: boolean;
  threshold?: number;
  delay?: number;
  onExitIntent?: () => void;
}

export const useExitIntent = ({
  enabled = true,
  threshold = 50,
  delay = 0,
  onExitIntent
}: UseExitIntentOptions = {}) => {
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (!enabled || hasTriggered) return;
    
    // Check if mouse is leaving from the top of the page
    if (e.clientY <= threshold && e.clientX >= 0 && e.clientX <= window.innerWidth) {
      setTimeout(() => {
        if (!hasTriggered) {
          setHasTriggered(true);
          onExitIntent?.();
        }
      }, delay);
    }
  }, [enabled, hasTriggered, threshold, delay, onExitIntent]);

  const handleScroll = useCallback(() => {
    if (!enabled || hasTriggered) return;
    
    // Trigger on aggressive scroll behavior (mobile)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // If user scrolled back to top quickly (potential exit behavior)
    if (scrollTop < 100 && scrollHeight > clientHeight * 2) {
      setTimeout(() => {
        if (!hasTriggered) {
          setHasTriggered(true);
          onExitIntent?.();
        }
      }, delay);
    }
  }, [enabled, hasTriggered, delay, onExitIntent]);

  useEffect(() => {
    if (!enabled) return;

    // Desktop exit intent (mouse leave)
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Mobile exit intent (scroll behavior)
    let scrollTimer: NodeJS.Timeout;
    const handleScrollWithTimer = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScroll, 100);
    };
    
    window.addEventListener('scroll', handleScrollWithTimer);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScrollWithTimer);
      clearTimeout(scrollTimer);
    };
  }, [handleMouseLeave, handleScroll, enabled]);

  const reset = useCallback(() => {
    setHasTriggered(false);
  }, []);

  return {
    hasTriggered,
    reset,
    trigger: () => {
      if (!hasTriggered) {
        setHasTriggered(true);
        onExitIntent?.();
      }
    }
  };
};
