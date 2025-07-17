
import { useEffect } from 'react';

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Simplified performance monitoring - just console log for now
    console.log('Performance monitoring initialized (simplified)');
    
    // Remove all complex browser API usage that might cause issues
    // Just log basic info
    if (typeof window !== 'undefined') {
      console.log('Page loaded at:', new Date().toISOString());
    }
  }, []);
};
