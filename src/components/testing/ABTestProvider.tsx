
import { createContext, useContext, ReactNode } from 'react';

interface ABTestResult {
  testId: string;
  variantId: string;
  config: Record<string, any>;
}

interface ABTestContextType {
  getTestVariant: (testId: string) => ABTestResult | null;
  trackConversion: (testId: string, conversionType?: string, value?: number) => void;
  isUserInTest: (testId: string) => boolean;
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

export const useABTest = () => {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useABTest must be used within ABTestProvider');
  }
  return context;
};

interface ABTestProviderProps {
  children: ReactNode;
}

export const ABTestProvider = ({ children }: ABTestProviderProps) => {
  console.log('ABTestProvider initialized - simplified mode');
  
  // Completely simplified - no complex logic that might import phantom services
  const getTestVariant = (testId: string): ABTestResult | null => {
    console.log('A/B test variant requested (simplified):', testId);
    return null;
  };

  const trackConversion = (testId: string, conversionType: string = 'conversion', value?: number) => {
    console.log('A/B Test Conversion (simplified):', testId, conversionType, value);
  };

  const isUserInTest = (testId: string): boolean => {
    console.log('A/B test user check (simplified):', testId);
    return false;
  };

  const contextValue: ABTestContextType = {
    getTestVariant,
    trackConversion,
    isUserInTest
  };

  return (
    <ABTestContext.Provider value={contextValue}>
      {children}
    </ABTestContext.Provider>
  );
};

export default ABTestProvider;
