
import React, { useState, useEffect } from 'react';

const QuoteHero = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    const handleBannerVisibilityChange = (event: any) => {
      setIsBannerVisible(event.detail.isVisible);
    };

    document.addEventListener('promoBannerVisibilityChanged', handleBannerVisibilityChange);
    return () => {
      document.removeEventListener('promoBannerVisibilityChanged', handleBannerVisibilityChange);
    };
  }, []);

  return (
    <section className={`${isBannerVisible ? 'pt-24' : 'pt-16'} pb-20 bg-brand-navy text-white relative`}>
      {/* Add a subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
      
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center z-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get a Free Quote</h1>
          <p className="text-lg md:text-xl opacity-90">
            Fill out the form below for a free, no-obligation quote for your junk removal needs.
          </p>
        </div>
      </div>
      
      {/* Add a subtle diagonal cutout at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
    </section>
  );
};

export default QuoteHero;
