
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-brand-navy text-white pt-24 pb-28">
      {/* Add a subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
      
      <div className="container-custom grid md:grid-cols-2 gap-8 items-center">
        <div className="z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Uncle Sam Wants YOU... <br className="hidden sm:block" />
            <span className="text-brand-red">to Live Junk-Free!</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Professional junk removal services in the Tri-State area. 
            We handle the heavy lifting so you don't have to!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-brand-red hover:bg-opacity-90 text-white font-bold text-lg"
            >
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-brand-navy font-medium text-lg"
            >
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
        <div className="relative hidden md:flex justify-center items-center">
          <div className="absolute -left-4 -top-4 w-24 h-24 bg-brand-blue opacity-20 rounded-full blur-xl"></div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-red opacity-20 rounded-full blur-xl"></div>
          <img
            src="/lovable-uploads/acf3ac1c-8d3b-4125-896d-7a7416fab53a.png"
            alt="Uncle Sam Junk Removal"
            className="w-full max-w-md mx-auto animate-fade-in rounded-lg shadow-xl relative z-10"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
    </section>
  );
};

export default HeroSection;
