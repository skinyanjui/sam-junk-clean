
import { useState, useEffect } from 'react';
import { X, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomerActivity {
  id: string;
  name: string;
  location: string;
  service: string;
  timeAgo: string;
  avatar?: string;
}

const SocialProofNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState<CustomerActivity | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mock customer activities - in real app, this would come from your backend
  const customerActivities: CustomerActivity[] = [
    {
      id: '1',
      name: 'Sarah M.',
      location: 'Evansville',
      service: 'furniture removal',
      timeAgo: '2 hours ago'
    },
    {
      id: '2',
      name: 'Mike R.',
      location: 'Henderson',
      service: 'appliance pickup',
      timeAgo: '4 hours ago'
    },
    {
      id: '3',
      name: 'Jennifer L.',
      location: 'Newburgh',
      service: 'estate cleanout',
      timeAgo: '6 hours ago'
    },
    {
      id: '4',
      name: 'David K.',
      location: 'Owensboro',
      service: 'construction debris removal',
      timeAgo: '8 hours ago'
    }
  ];

  useEffect(() => {
    if (customerActivities.length === 0) return;

    let currentIndex = 0;
    
    const showNotification = () => {
      setCurrentNotification(customerActivities[currentIndex]);
      setIsVisible(true);
      
      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      
      currentIndex = (currentIndex + 1) % customerActivities.length;
    };

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(showNotification, 3000);
    
    // Then show subsequent notifications every 15 seconds
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && currentNotification && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 z-50 bg-white shadow-lg border border-gray-200 rounded-lg p-4 max-w-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {/* Avatar placeholder */}
              <div className="w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center">
                <span className="text-brand-red font-semibold text-sm">
                  {currentNotification.name.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  <span className="text-brand-red">{currentNotification.name}</span> just booked {currentNotification.service}
                </p>
                
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{currentNotification.location}</span>
                  <Clock className="h-3 w-3 ml-2 mr-1" />
                  <span>{currentNotification.timeAgo}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* Trust indicator */}
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-600 font-medium">✓ Verified Customer</span>
              <span className="text-gray-500">Join 2,500+ happy customers</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofNotifications;
