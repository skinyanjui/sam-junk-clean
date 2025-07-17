
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { Phone } from 'lucide-react';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';

const ServicesCta = () => {
  const { isMobile } = useResponsiveLayout();
  
  return (
    <section className={`py-12 ${isMobile ? 'px-4' : 'py-16'} bg-brand-gray`}>
      <div className="container-custom">
        <div className="bg-brand-navy text-white p-6 md:p-12 rounded-xl shadow-lg text-center border border-gray-600 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Need a Service Not Listed?</h2>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8">
            We handle many other types of junk removal situations. Contact us to discuss your specific needs and get a customized solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-brand-red hover:bg-brand-red/90 text-white font-bold tracking-wide border border-gray-500 shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white bg-white/10 hover:bg-white hover:text-brand-navy font-bold tracking-wide border-2 transition-all duration-300 hover:scale-[1.02]"
            >
              <a href={getPhoneLink()} className="flex items-center">
                <Phone size={18} className="mr-2" />
                Call {PHONE_NUMBER}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCta;
