
import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsContextType {
  trackEvent: (event: { action: string; category: string; label?: string; value?: number }) => void;
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

  // Track page views on route changes
  useEffect(() => {
    console.log('Page view:', location.pathname);
  }, [location]);

  // Simplified event tracking - just console log for now
  const trackEvent = (event: { action: string; category: string; label?: string; value?: number }) => {
    console.log('Event tracked:', event);
  };

  // Simplified A/B testing - return null for now
  const getTestVariant = (testId: string) => {
    console.log('A/B test requested:', testId);
    return null;
  };

  // Simplified A/B conversion tracking - just console log
  const trackABConversion = (testId: string, conversionType?: string) => {
    console.log('A/B conversion:', testId, conversionType);
  };

  const value: AnalyticsContextType = {
    trackEvent,
    getTestVariant,
    trackABConversion
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
