
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const MobileCta = () => {
  const { isLandscapeMobile } = useResponsiveLayout();

  // Position the CTA at the bottom right in landscape mode
  if (isLandscapeMobile) {
    return (
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-3 right-3 md:hidden z-40"
      >
        <Button 
          asChild
          className="bg-brand-red hover:bg-brand-red/90 text-white py-1.5 px-4 text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg rounded-full touch-target"
        >
          <Link to="/quote">Get Quote</Link>
        </Button>
      </motion.div>
    );
  }

  // Default bottom bar in portrait mode
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="fixed bottom-0 left-0 w-full md:hidden bg-white shadow-lg p-3 z-40 border-t border-gray-100"
    >
      <Button 
        asChild
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white py-2.5 text-base font-medium tracking-wide transition-all duration-300 shadow-md rounded-md touch-target"
      >
        <Link to="/quote">Get a Free Quote</Link>
      </Button>
    </motion.div>
  );
};

export default MobileCta;
