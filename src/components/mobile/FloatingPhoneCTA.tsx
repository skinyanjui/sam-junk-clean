import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';

import { motion, AnimatePresence } from 'framer-motion';

const FloatingPhoneCTA = () => {
  const { isMobile } = useResponsiveLayout();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { trackEvent } = useAnalyticsContext();

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      // Show after scrolling 300px down
      const shouldShow = window.scrollY > 300 && !isDismissed;
      setIsVisible(shouldShow);
    };

    // Check if user has dismissed it in this session
    const dismissed = sessionStorage.getItem('floating-phone-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, isDismissed]);

  const handlePhoneClick = () => {
    trackEvent({
      action: 'floating_phone_click',
      category: 'mobile_cta',
      label: 'floating_button'
    });

  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('floating-phone-dismissed', 'true');
    
    trackEvent({
      action: 'floating_phone_dismiss',
      category: 'mobile_cta',
      label: 'dismiss_button'
    });
  };

  if (!isMobile || isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="relative">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs z-10 shadow-lg"
              aria-label="Dismiss phone button"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Main phone button */}
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red/90 text-white shadow-2xl rounded-full w-16 h-16 p-0 border-4 border-white"
              onClick={handlePhoneClick}
            >
              <a href={getPhoneLink()} className="flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </a>
            </Button>

            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-brand-red opacity-30 animate-ping"></div>
          </div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-brand-navy text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
          >
            Call for instant quote!
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-brand-navy border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingPhoneCTA;