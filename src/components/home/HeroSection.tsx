
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-brand-navy to-brand-navy/95 text-white pt-32 pb-36 overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-red opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-blue opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Uncle Sam Wants YOU... <br className="hidden sm:block" />
              <span className="text-brand-red drop-shadow-sm">to Live Junk-Free!</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Professional junk removal services in the Tri-State area. 
              We handle the heavy lifting so you don't have to!
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button 
                asChild 
                size="lg" 
                className="bg-brand-red hover:bg-opacity-90 text-white font-bold text-lg shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
              >
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white border-2 text-white hover:bg-white hover:text-brand-navy font-medium text-lg shadow-md transition-all duration-300 hover:translate-y-[-2px]"
              >
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:flex justify-end items-center">
            <div className="absolute -left-8 -top-8 w-40 h-40 bg-brand-blue opacity-20 rounded-full blur-2xl"></div>
            <div className="absolute -right-12 -bottom-12 w-56 h-56 bg-brand-red opacity-20 rounded-full blur-2xl"></div>
            <img
              src="/lovable-uploads/acf3ac1c-8d3b-4125-896d-7a7416fab53a.png"
              alt="Uncle Sam Junk Removal"
              className="w-full max-w-md mx-auto animate-fade-in rounded-xl shadow-2xl border-4 border-white/10 relative z-10 hover-scale transition-all duration-500"
            />
          </div>
        </div>
      </div>
      
      {/* Diagonal cutout at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
    </section>
  );
};

export default HeroSection;
