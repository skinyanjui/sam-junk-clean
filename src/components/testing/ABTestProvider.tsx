import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';
import { conversionTracking } from '@/services/conversionTracking';

interface ABTest {
  id: string;
  name: string;
  variants: ABVariant[];
  isActive: boolean;
  trafficAllocation: number; // Percentage of users to include in test
  startDate: string;
  endDate?: string;
}

interface ABVariant {
  id: string;
  name: string;
  weight: number; // Percentage allocation within test
  config: Record<string, any>;
}

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
  const [userTests, setUserTests] = useState<Record<string, ABTestResult>>({});
  const { trackEvent } = useAnalyticsContext();

  // Define active A/B tests
  const activeTests: ABTest[] = [
    {
      id: 'hero-cta-test',
      name: 'Hero CTA Button Optimization',
      variants: [
        {
          id: 'control',
          name: 'Control - Get Free Quote',
          weight: 50,
          config: {
            buttonText: 'Get Free Quote',
            buttonColor: 'bg-brand-red',
            buttonSize: 'lg'
          }
        },
        {
          id: 'variant-a',
          name: 'Variant A - Urgent CTA',
          weight: 50,
          config: {
            buttonText: 'Get Instant Quote',
            buttonColor: 'bg-green-600',
            buttonSize: 'lg'
          }
        }
      ],
      isActive: true,
      trafficAllocation: 100,
      startDate: '2025-01-16',
      endDate: '2025-02-16'
    },
    {
      id: 'pricing-display-test',
      name: 'Pricing Display Format',
      variants: [
        {
          id: 'control',
          name: 'Control - Range Format',
          weight: 50,
          config: {
            format: 'range',
            showStartingAt: false,
            emphasizeValue: false
          }
        },
        {
          id: 'variant-a',
          name: 'Variant A - Starting At Format',
          weight: 50,
          config: {
            format: 'starting-at',
            showStartingAt: true,
            emphasizeValue: true
          }
        }
      ],
      isActive: true,
      trafficAllocation: 50,
      startDate: '2025-01-16',
      endDate: '2025-02-16'
    },
    {
      id: 'testimonial-layout-test',
      name: 'Testimonial Section Layout',
      variants: [
        {
          id: 'control',
          name: 'Control - Grid Layout',
          weight: 33,
          config: {
            layout: 'grid',
            showPhotos: true,
            showRatings: true
          }
        },
        {
          id: 'variant-a',
          name: 'Variant A - Carousel Layout',
          weight: 33,
          config: {
            layout: 'carousel',
            showPhotos: true,
            showRatings: true
          }
        },
        {
          id: 'variant-b',
          name: 'Variant B - Single Featured',
          weight: 34,
          config: {
            layout: 'featured',
            showPhotos: false,
            showRatings: true
          }
        }
      ],
      isActive: true,
      trafficAllocation: 75,
      startDate: '2025-01-16',
      endDate: '2025-03-16'
    }
  ];

  // Generate consistent user ID for test assignment
  const getUserId = (): string => {
    let userId = localStorage.getItem('ab-test-user-id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('ab-test-user-id', userId);
    }
    return userId;
  };

  // Hash function for consistent variant assignment
  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  // Assign user to test variant
  const assignVariant = (test: ABTest): ABTestResult | null => {
    const userId = getUserId();
    const testKey = `${test.id}_${userId}`;
    
    // Check if user should be included in test
    const userHash = hashString(testKey);
    const trafficThreshold = (test.trafficAllocation / 100) * 100;
    
    if ((userHash % 100) >= trafficThreshold) {
      return null; // User not in test
    }

    // Assign variant based on weights
    const variantHash = hashString(`${testKey}_variant`);
    const variantThreshold = variantHash % 100;
    
    let cumulativeWeight = 0;
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight;
      if (variantThreshold < cumulativeWeight) {
        return {
          testId: test.id,
          variantId: variant.id,
          config: variant.config
        };
      }
    }
    
    // Fallback to first variant
    return {
      testId: test.id,
      variantId: test.variants[0].id,
      config: test.variants[0].config
    };
  };

  // Initialize user test assignments
  useEffect(() => {
    const assignments: Record<string, ABTestResult> = {};
    
    activeTests.forEach(test => {
      if (!test.isActive) return;
      
      // Check if user already has assignment stored
      const storedAssignment = localStorage.getItem(`ab-test-${test.id}`);
      if (storedAssignment) {
        try {
          assignments[test.id] = JSON.parse(storedAssignment);
          return;
        } catch (e) {
          // Invalid stored data, reassign
        }
      }
      
      // Assign new variant
      const assignment = assignVariant(test);
      if (assignment) {
        assignments[test.id] = assignment;
        localStorage.setItem(`ab-test-${test.id}`, JSON.stringify(assignment));
        
        // Track test assignment
        trackEvent({
          action: 'ab_test_assigned',
          category: 'testing',
          label: `${test.id}_${assignment.variantId}`
        });
        
        conversionTracking.trackEvent('ab_test_assignment', {
          test_id: test.id,
          variant_id: assignment.variantId,
          test_name: test.name
        });
      }
    });
    
    setUserTests(assignments);
  }, [trackEvent]);

  const getTestVariant = (testId: string): ABTestResult | null => {
    return userTests[testId] || null;
  };

  const trackConversion = (testId: string, conversionType: string = 'conversion', value?: number) => {
    const testResult = userTests[testId];
    if (!testResult) return;
    
    trackEvent({
      action: 'ab_test_conversion',
      category: 'testing',
      label: `${testId}_${testResult.variantId}_${conversionType}`,
      value: value
    });
    
    conversionTracking.trackEvent('ab_test_conversion', {
      test_id: testId,
      variant_id: testResult.variantId,
      conversion_type: conversionType,
      conversion_value: value
    });
  };

  const isUserInTest = (testId: string): boolean => {
    return testId in userTests;
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