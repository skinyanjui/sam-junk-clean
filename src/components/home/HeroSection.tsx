
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-brand-navy pt-32 pb-36 overflow-hidden">
      {/* Full background image with overlay */}
      <div className="absolute inset-0 bg-black/50 z-0">
        <img 
          src="https://images.unsplash.com/photo-1571568154021-5a3580633ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Junk removal service" 
          className="w-full h-full object-cover mix-blend-overlay opacity-80"
        />
      </div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-red opacity-10 rounded-full blur-3xl z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-blue opacity-10 rounded-full blur-3xl z-10"></div>
      
      <div className="container-custom relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white backdrop-blur-sm bg-black/30 p-8 rounded-xl border border-white/10 shadow-2xl">
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
          <div className="relative hidden md:block">
            <img
              src="/lovable-uploads/acf3ac1c-8d3b-4125-896d-7a7416fab53a.png"
              alt="Uncle Sam Junk Removal"
              className="w-full max-w-md mx-auto drop-shadow-2xl rounded-xl relative z-10 hover-scale transition-all duration-500"
            />
          </div>
        </div>
      </div>
      
      {/* Diagonal cutout at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-white z-20" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
    </section>
  );
};

export default HeroSection;
