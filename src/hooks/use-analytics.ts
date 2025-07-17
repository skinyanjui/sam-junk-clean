
import { useEffect } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  // Remove all external analytics initialization for now
  useEffect(() => {
    console.log('Analytics initialized (simplified)');
  }, []);

  const trackEvent = (event: AnalyticsEvent) => {
    console.log('Event tracked:', event);
  };

  // Remove trackConversion completely to eliminate phantom import
  const trackPageView = (page_title: string, page_location: string) => {
    console.log('Page view:', page_title, page_location);
  };

  return {
    trackEvent,
    trackPageView
  };
};
