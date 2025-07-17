
import { useState, useEffect, useCallback } from 'react';

interface UseExitIntentOptions {
  enabled?: boolean;
  threshold?: number;
  delay?: number;
  aggressive?: boolean;
  onExitIntent?: () => void;
}

export const useExitIntent = ({
  enabled = true,
  threshold = 50,
  delay = 0,
  aggressive = false,
  onExitIntent
}: UseExitIntentOptions = {}) => {
  const [hasTriggered, setHasTriggered] = useState(false);
  const [exitDetected, setExitDetected] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (!enabled || hasTriggered) return;
    
    // Check if mouse is leaving from the top of the page
    if (e.clientY <= threshold && e.clientX >= 0 && e.clientX <= window.innerWidth) {
      setTimeout(() => {
        if (!hasTriggered) {
          setHasTriggered(true);
          setExitDetected(true);
          onExitIntent?.();
        }
      }, delay);
    }
  }, [enabled, hasTriggered, threshold, delay, onExitIntent]);

  const handleScroll = useCallback(() => {
    if (!enabled || hasTriggered || !aggressive) return;
    
    // Trigger on aggressive scroll behavior (mobile)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // If user scrolled back to top quickly (potential exit behavior)
    if (scrollTop < 100 && scrollHeight > clientHeight * 2) {
      setTimeout(() => {
        if (!hasTriggered) {
          setHasTriggered(true);
          setExitDetected(true);
          onExitIntent?.();
        }
      }, delay);
    }
  }, [enabled, hasTriggered, delay, aggressive, onExitIntent]);

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
    
    if (aggressive) {
      window.addEventListener('scroll', handleScrollWithTimer);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (aggressive) {
        window.removeEventListener('scroll', handleScrollWithTimer);
      }
      clearTimeout(scrollTimer);
    };
  }, [handleMouseLeave, handleScroll, enabled, aggressive]);

  const reset = useCallback(() => {
    setHasTriggered(false);
    setExitDetected(false);
  }, []);

  return {
    hasTriggered,
    exitDetected,
    reset,
    trigger: () => {
      if (!hasTriggered) {
        setHasTriggered(true);
        setExitDetected(true);
        onExitIntent?.();
      }
    }
  };
};
