
import { useEffect } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface ConversionEvent {
  event_name: string;
  currency?: string;
  value?: number;
  items?: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
}

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    fbq: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    // Initialize Google Analytics 4
    const initGA4 = () => {
      if (typeof window !== 'undefined' && !window.gtag) {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `;
        document.head.appendChild(script2);
      }
    };

    // Initialize Facebook Pixel
    const initFBPixel = () => {
      if (typeof window !== 'undefined' && !window.fbq) {
        const script = document.createElement('script');
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'FB_PIXEL_ID');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
      }
    };

    initGA4();
    initFBPixel();
  }, []);

  const trackEvent = (event: AnalyticsEvent) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', event.action, {
        content_category: event.category,
        content_name: event.label,
        value: event.value
      });
    }

    console.log('Event tracked:', event);
  };

  const trackConversion = (event: ConversionEvent) => {
    // Enhanced ecommerce tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.event_name, {
        currency: event.currency || 'USD',
        value: event.value,
        items: event.items
      });
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        value: event.value,
        currency: event.currency || 'USD'
      });
    }

    console.log('Conversion tracked:', event);
  };

  const trackPageView = (page_title: string, page_location: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title,
        page_location
      });
    }
  };

  return {
    trackEvent,
    trackConversion,
    trackPageView
  };
};
