
import { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromoLBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-brand-navy py-3 px-4 text-center relative animate-fade-in">
      <div className="container-custom flex items-center justify-center">
        <p className="text-white text-sm md:text-base font-medium py-0.5">
          <span className="mr-2">🎉 Spring cleaning special: 15% off your first junk removal!</span>
          <Link 
            to="/quote" 
            className="underline hover:text-brand-yellow transition-colors font-semibold"
          >
            Get a quote today
          </Link>
        </p>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          aria-label="Close promotion banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default PromoLBanner;
