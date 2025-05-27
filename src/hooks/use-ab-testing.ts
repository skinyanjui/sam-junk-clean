
import { useState, useEffect } from 'react';

interface ABTest {
  id: string;
  name: string;
  variants: ABVariant[];
  active: boolean;
  trafficAllocation: number;
}

interface ABVariant {
  id: string;
  name: string;
  weight: number;
  config: Record<string, any>;
}

interface ABTestResult {
  testId: string;
  variantId: string;
  config: Record<string, any>;
}

// Mock AB tests - in production, this would come from a backend service
const AB_TESTS: ABTest[] = [
  {
    id: 'hero-cta-test',
    name: 'Hero CTA Button Test',
    active: true,
    trafficAllocation: 1.0,
    variants: [
      {
        id: 'control',
        name: 'Control - Get Free Quote',
        weight: 50,
        config: {
          buttonText: 'Get Free Quote',
          buttonColor: 'brand-red'
        }
      },
      {
        id: 'variant-a',
        name: 'Variant A - Book Now',
        weight: 50,
        config: {
          buttonText: 'Book Now - Free Quote',
          buttonColor: 'green-600'
        }
      }
    ]
  },
  {
    id: 'pricing-display-test',
    name: 'Pricing Display Test',
    active: true,
    trafficAllocation: 0.8,
    variants: [
      {
        id: 'control',
        name: 'Control - Standard Layout',
        weight: 50,
        config: {
          layout: 'standard',
          showDiscount: false
        }
      },
      {
        id: 'variant-b',
        name: 'Variant B - With Discount Badge',
        weight: 50,
        config: {
          layout: 'standard',
          showDiscount: true,
          discountText: 'Save 20% Today!'
        }
      }
    ]
  }
];

export const useABTesting = () => {
  const [userTests, setUserTests] = useState<Record<string, ABTestResult>>({});

  useEffect(() => {
    // Load existing test assignments from localStorage
    const storedTests = localStorage.getItem('ab-tests');
    if (storedTests) {
      try {
        setUserTests(JSON.parse(storedTests));
      } catch (error) {
        console.error('Failed to parse stored AB tests:', error);
      }
    }
  }, []);

  const getTestVariant = (testId: string): ABTestResult | null => {
    // Return cached result if exists
    if (userTests[testId]) {
      return userTests[testId];
    }

    const test = AB_TESTS.find(t => t.id === testId);
    if (!test || !test.active) {
      return null;
    }

    // Check if user should be included in test
    if (Math.random() > test.trafficAllocation) {
      return null;
    }

    // Select variant based on weights
    const totalWeight = test.variants.reduce((sum, variant) => sum + variant.weight, 0);
    let randomWeight = Math.random() * totalWeight;
    
    let selectedVariant = test.variants[0];
    for (const variant of test.variants) {
      randomWeight -= variant.weight;
      if (randomWeight <= 0) {
        selectedVariant = variant;
        break;
      }
    }

    const result: ABTestResult = {
      testId,
      variantId: selectedVariant.id,
      config: selectedVariant.config
    };

    // Store the assignment
    const newUserTests = { ...userTests, [testId]: result };
    setUserTests(newUserTests);
    localStorage.setItem('ab-tests', JSON.stringify(newUserTests));

    return result;
  };

  const trackABConversion = (testId: string, conversionType: string = 'conversion') => {
    const testResult = userTests[testId];
    if (!testResult) return;

    // Track conversion with analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_conversion', {
        test_id: testId,
        variant_id: testResult.variantId,
        conversion_type: conversionType
      });
    }

    console.log('AB Test Conversion:', {
      testId,
      variantId: testResult.variantId,
      conversionType
    });
  };

  return {
    getTestVariant,
    trackABConversion,
    userTests
  };
};
