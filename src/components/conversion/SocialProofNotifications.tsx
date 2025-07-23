import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { useAnalyticsContext } from '@/providers/AnalyticsProvider';

interface SocialProofItem {
  id: string;
  type: 'booking' | 'review' | 'completion' | 'milestone';
  name: string;
  location: string;
  action: string;
  timeAgo: string;
  rating?: number;
  service?: string;
  icon: React.ReactNode;
  color: string;
}

const SocialProofNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState<SocialProofItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useResponsiveLayout();
  const { trackEvent } = useAnalyticsContext();

  // Sample social proof data - in production, this would come from real data
  const socialProofItems: SocialProofItem[] = [
    {
      id: '1',
      type: 'booking',
      name: 'Sarah M.',
      location: 'Evansville, IN',
      action: 'just booked a furniture removal',
      timeAgo: '2 minutes ago',
      service: 'Furniture Removal',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'review',
      name: 'Mike R.',
      location: 'Henderson, KY',
      action: 'left a 5-star review',
      timeAgo: '5 minutes ago',
      rating: 5,
      service: 'Full House Cleanout',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'text-yellow-500'
    },
    {
      id: '3',
      type: 'completion',
      name: 'Jennifer L.',
      location: 'Newburgh, IN',
      action: 'completed their junk removal',
      timeAgo: '8 minutes ago',
      service: 'Appliance Removal',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'text-blue-600'
    },
    {
      id: '4',
      type: 'booking',
      name: 'David K.',
      location: 'Owensboro, KY',
      action: 'scheduled same-day service',
      timeAgo: '12 minutes ago',
      service: 'Construction Debris',
      icon: <Clock className="w-4 h-4" />,
      color: 'text-orange-600'
    },
    {
      id: '5',
      type: 'milestone',
      name: '47 people',
      location: 'Tri-State Area',
      action: 'used our service this week',
      timeAgo: '15 minutes ago',
      icon: <Users className="w-4 h-4" />,
      color: 'text-purple-600'
    },
    {
      id: '6',
      type: 'booking',
      name: 'Lisa T.',
      location: 'Mt. Carmel, IL',
      action: 'requested a quote',
      timeAgo: '18 minutes ago',
      service: 'Yard Waste Removal',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'text-green-600'
    },
    {
      id: '7',
      type: 'review',
      name: 'Robert H.',
      location: 'Evansville, IN',
      action: 'recommended us to friends',
      timeAgo: '22 minutes ago',
      rating: 5,
      service: 'Office Cleanout',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'text-yellow-500'
    },
    {
      id: '8',
      type: 'completion',
      name: 'Amanda S.',
      location: 'Henderson, KY',
      action: 'saved $200 with our service',
      timeAgo: '25 minutes ago',
      service: 'Estate Cleanout',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'text-green-600'
    }
  ];

  useEffect(() => {
    if (isMobile) return; // Don't show on mobile to avoid clutter

    let currentIndex = 0;
    
    const showNextNotification = () => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentNotification(socialProofItems[currentIndex]);
        setIsVisible(true);
        currentIndex = (currentIndex + 1) % socialProofItems.length;
        
        // Track social proof impression
        trackEvent({
          action: 'social_proof_shown',
          category: 'engagement',
          label: socialProofItems[currentIndex].type
        });
      }, 500);
    };

    // Show first notification after 10 seconds
    const initialTimer = setTimeout(showNextNotification, 10000);
    
    // Then show every 15 seconds
    const interval = setInterval(showNextNotification, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isMobile, trackEvent]);

  const handleNotificationClick = () => {
    if (!currentNotification) return;
    
    trackEvent({
      action: 'social_proof_click',
      category: 'engagement',
      label: currentNotification.type
    });

    // Navigate to appropriate page based on notification type
    if (currentNotification.type === 'booking' || currentNotification.type === 'milestone') {
      window.location.href = '/quote';
    } else if (currentNotification.type === 'review') {
      window.location.href = '/about#testimonials';
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setCurrentNotification(null);
    
    trackEvent({
      action: 'social_proof_dismiss',
      category: 'engagement',
      label: currentNotification?.type || 'unknown'
    });
  };

  if (isMobile || !currentNotification) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-40 max-w-sm"
        >
          <Card 
            className="cursor-pointer shadow-xl border-2 border-brand-red/20 hover:border-brand-red/40 transition-colors"
            onClick={handleNotificationClick}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-medium">
                    {currentNotification.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`${currentNotification.color}`}>
                      {currentNotification.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {currentNotification.type === 'milestone' ? 'Popular' : 'Recent'}
                    </Badge>
                  </div>

                  <p className="text-sm font-medium text-gray-900 mb-1">
                    <span className="font-semibold">{currentNotification.name}</span>{' '}
                    {currentNotification.action}
                  </p>

                  {currentNotification.service && (
                    <p className="text-xs text-gray-600 mb-1">
                      Service: {currentNotification.service}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{currentNotification.location}</span>
                    <span>•</span>
                    <span>{currentNotification.timeAgo}</span>
                  </div>

                  {currentNotification.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(currentNotification.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xs">★</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Call to action hint */}
              <div className="mt-3 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  Click to {currentNotification.type === 'review' ? 'see more reviews' : 'get your quote'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofNotifications;