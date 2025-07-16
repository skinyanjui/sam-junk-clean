import { useEffect, useRef } from 'react';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';

interface PerformanceMetrics {
    lcp?: number; // Largest Contentful Paint
    fid?: number; // First Input Delay
    cls?: number; // Cumulative Layout Shift
    fcp?: number; // First Contentful Paint
    ttfb?: number; // Time to First Byte
}

export const usePerformanceMonitoring = () => {
    const { trackEvent } = useAnalyticsContext();
    const metricsRef = useRef<PerformanceMetrics>({});

    useEffect(() => {
        // Core Web Vitals monitoring
        const observeWebVitals = () => {
            // LCP - Largest Contentful Paint
            if ('PerformanceObserver' in window) {
                try {
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1] as any;
                        const lcp = lastEntry.startTime;

                        metricsRef.current.lcp = lcp;

                        trackEvent({
                            action: 'web_vital_lcp',
                            category: 'performance',
                            label: 'largest_contentful_paint',
                            value: Math.round(lcp)
                        });
                    });

                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                    // FID - First Input Delay
                    const fidObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        entries.forEach((entry: any) => {
                            const fid = entry.processingStart - entry.startTime;

                            metricsRef.current.fid = fid;

                            trackEvent({
                                action: 'web_vital_fid',
                                category: 'performance',
                                label: 'first_input_delay',
                                value: Math.round(fid)
                            });
                        });
                    });

                    fidObserver.observe({ entryTypes: ['first-input'] });

                    // CLS - Cumulative Layout Shift
                    let clsValue = 0;
                    const clsObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        entries.forEach((entry: any) => {
                            if (!entry.hadRecentInput) {
                                clsValue += entry.value;
                            }
                        });

                        metricsRef.current.cls = clsValue;
                    });

                    clsObserver.observe({ entryTypes: ['layout-shift'] });

                    // Report CLS on page unload
                    const reportCLS = () => {
                        trackEvent({
                            action: 'web_vital_cls',
                            category: 'performance',
                            label: 'cumulative_layout_shift',
                            value: Math.round(clsValue * 1000) // Convert to milliseconds
                        });
                    };

                    window.addEventListener('beforeunload', reportCLS);

                    return () => {
                        lcpObserver.disconnect();
                        fidObserver.disconnect();
                        clsObserver.disconnect();
                        window.removeEventListener('beforeunload', reportCLS);
                    };
                } catch (error) {
                    console.warn('Performance monitoring setup failed:', error);
                }
            }
        };

        // Navigation Timing API
        const measureNavigationTiming = () => {
            if ('performance' in window && 'getEntriesByType' in performance) {
                const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

                if (navigation) {
                    const ttfb = navigation.responseStart - navigation.requestStart;
                    const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;

                    metricsRef.current.ttfb = ttfb;
                    metricsRef.current.fcp = fcp;

                    // Track TTFB
                    trackEvent({
                        action: 'navigation_timing_ttfb',
                        category: 'performance',
                        label: 'time_to_first_byte',
                        value: Math.round(ttfb)
                    });

                    // Track FCP
                    if (fcp > 0) {
                        trackEvent({
                            action: 'web_vital_fcp',
                            category: 'performance',
                            label: 'first_contentful_paint',
                            value: Math.round(fcp)
                        });
                    }
                }
            }
        };

        // Resource timing
        const measureResourceTiming = () => {
            if ('performance' in window && 'getEntriesByType' in performance) {
                const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

                // Track slow resources (> 1 second)
                const slowResources = resources.filter(resource =>
                    resource.duration > 1000 &&
                    (resource.initiatorType === 'script' || resource.initiatorType === 'link')
                );

                slowResources.forEach(resource => {
                    trackEvent({
                        action: 'slow_resource',
                        category: 'performance',
                        label: resource.name.split('/').pop() || 'unknown',
                        value: Math.round(resource.duration)
                    });
                });
            }
        };

        // Memory usage (if available)
        const measureMemoryUsage = () => {
            if ('memory' in performance) {
                const memory = (performance as any).memory;

                trackEvent({
                    action: 'memory_usage',
                    category: 'performance',
                    label: 'js_heap_size',
                    value: Math.round(memory.usedJSHeapSize / 1024 / 1024) // MB
                });
            }
        };

        // Initialize monitoring
        const initMonitoring = () => {
            // Wait for page load
            if (document.readyState === 'complete') {
                measureNavigationTiming();
                measureResourceTiming();
                measureMemoryUsage();
            } else {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        measureNavigationTiming();
                        measureResourceTiming();
                        measureMemoryUsage();
                    }, 0);
                });
            }

            observeWebVitals();
        };

        initMonitoring();
    }, [trackEvent]);

    // Return current metrics for debugging
    return metricsRef.current;
};

// Hook for component-level performance monitoring
export const useComponentPerformance = (componentName: string) => {
    const { trackEvent } = useAnalyticsContext();
    const startTimeRef = useRef<number>();

    useEffect(() => {
        startTimeRef.current = performance.now();

        return () => {
            if (startTimeRef.current) {
                const renderTime = performance.now() - startTimeRef.current;

                // Only track if render time is significant (> 16ms, one frame)
                if (renderTime > 16) {
                    trackEvent({
                        action: 'component_render_time',
                        category: 'performance',
                        label: componentName,
                        value: Math.round(renderTime)
                    });
                }
            }
        };
    }, [componentName, trackEvent]);
};