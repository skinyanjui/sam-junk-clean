
import SEO from '@/components/SEO';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { Mail } from 'lucide-react';

const ContactHero = () => {
  const { isMobile, orientation } = useResponsiveLayout();
  const isLandscape = orientation === 'landscape';
  
  return (
    <>
      <SEO
        title="Contact Us | Uncle Sam Junk Removal"
        description="Get in touch with our team for all your junk removal needs. Quick responses and exceptional service guaranteed."
      />
      
      {/* Hero Section */}
      <section className={`${isMobile ? 'py-10' : 'py-20'} ${isLandscape && isMobile ? 'py-8' : ''} bg-brand-navy text-white`}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-brand-red/20">
              <Mail className="h-8 w-8 text-brand-red" />
            </span>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl xl:text-6xl'} font-bold ${isMobile ? 'mb-3' : 'mb-6'}`}>
              Contact Us
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} opacity-95 max-w-2xl mx-auto`}>
              Have questions or need a quote? Our team is standing by to help you reclaim your space!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactHero;
