
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Phone, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';

const CtaSection = () => {
  const { toast } = useToast();
  const { isMobile, isTablet } = useResponsiveLayout();
  
  const handleCallClick = () => {
    toast({
      title: "Calling...",
      description: "Connecting you to our customer service team.",
      duration: 3000,
    });
  };

  return (
    <section className="py-16 px-4 md:py-20 lg:py-24 bg-gradient-to-b from-brand-gray to-white">
      <div className="container-custom max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-[1.01] duration-500 transition-all">
          {/* Background pattern overlay */}
          <div className="absolute inset-0 bg-brand-navy opacity-10 z-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnptMTIgMTJjMy4zMTQgMCA2LTIuNjg2IDYtNnMtMi42ODYtNi02LTZjLTMuMzE0IDAtNiAyLjY4Ni02IDZzMi42ODYgNiA2IDZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0xMiAzNmMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+')] opacity-50"></div>
          </div>
          
          {/* Content container */}
          <div className="relative flex flex-col md:flex-row bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80 z-10">
            {/* Left image section - visible on md+ screens */}
            <div className="hidden md:block md:w-2/5 lg:w-1/3 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3')",
                  filter: "brightness(0.8) saturate(1.2)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy from-5% to-transparent"></div>
            </div>
            
            {/* Content section */}
            <div className="w-full md:w-3/5 lg:w-2/3 p-8 md:p-10 lg:p-16 text-white">
              <div className="max-w-2xl">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-sm">
                  <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-brand-red"></span>
                  Ready for a clean start?
                </div>
                
                <h2 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold mb-4 tracking-tight`}>
                  Ready to Clear the Clutter <span className="relative inline-block">
                    <span className="relative z-10">Today?</span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-red/20 z-0"></span>
                  </span>
                </h2>
                
                <p className={`text-white/80 ${isMobile ? 'text-base' : 'text-lg'} max-w-xl leading-relaxed mb-8`}>
                  Contact us for a free, no-obligation quote. Our team of junk removal specialists will handle all your needs with professionalism and care.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild 
                    size={isMobile ? "default" : "lg"}
                    className="bg-brand-red hover:bg-brand-red/90 border-2 border-transparent hover:border-brand-red/20 text-white font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <Link to="/quote" className="flex items-center">
                      Get a Free Quote
                      <ArrowUpRight size={18} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size={isMobile ? "default" : "lg"}
                    className="border-2 border-white/50 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-brand-navy font-bold tracking-wide transition-all duration-300 hover:-translate-y-1"
                    onClick={handleCallClick}
                  >
                    <Phone size={18} className="mr-2" />
                    <a href={getPhoneLink()}>{PHONE_NUMBER}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
