
import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '@/hooks/use-analytics';
import { useABTesting } from '@/hooks/use-ab-testing';
import { conversionTracking } from '@/services/conversionTracking';

interface AnalyticsContextType {
  trackEvent: (event: { action: string; category: string; label?: string; value?: number }) => void;
  trackConversion: (event: any) => void;
  getTestVariant: (testId: string) => any;
  trackABConversion: (testId: string, conversionType?: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { trackEvent, trackConversion, trackPageView } = useAnalytics();
  const { getTestVariant, trackABConversion } = useABTesting();

  // Track page views on route changes
  useEffect(() => {
    const pageTitle = document.title;
    trackPageView(pageTitle, window.location.href);
    conversionTracking.trackPageView(pageTitle);
  }, [location, trackPageView]);

  // Track scroll depth
  useEffect(() => {
    let maxScrollPercentage = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercentage > maxScrollPercentage && scrollPercentage % 25 === 0) {
        maxScrollPercentage = scrollPercentage;
        conversionTracking.trackScrollDepth(scrollPercentage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track exit intent
  useEffect(() => {
    const handleBeforeUnload = () => {
      conversionTracking.trackEvent('session_end', {
        session_duration: Date.now() - performance.timing.navigationStart
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const value: AnalyticsContextType = {
    trackEvent,
    trackConversion,
    getTestVariant,
    trackABConversion
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
