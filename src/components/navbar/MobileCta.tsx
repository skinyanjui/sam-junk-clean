
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useResponsiveLayout } from '@/hooks/use-mobile';

const MobileCta = () => {
  const { isLandscapeMobile } = useResponsiveLayout();

  // Position the CTA at the bottom right in landscape mode
  if (isLandscapeMobile) {
    return (
      <div className="fixed bottom-4 right-4 md:hidden z-40">
        <Button 
          asChild
          className="bg-brand-red hover:bg-brand-red/90 text-white py-2 px-4 text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_4px_12px_rgba(178,34,52,0.25)] rounded-full touch-target"
        >
          <Link to="/quote">Get Quote</Link>
        </Button>
      </div>
    );
  }

  // Default bottom bar in portrait mode
  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.12)] p-4 z-40 border-t border-gray-100">
      <Button 
        asChild
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white py-6 text-base font-semibold tracking-wide transition-all duration-300 shadow-[0_4px_12px_rgba(178,34,52,0.25)] touch-target"
      >
        <Link to="/quote">Get a Free Quote</Link>
      </Button>
    </div>
  );
};

export default MobileCta;
