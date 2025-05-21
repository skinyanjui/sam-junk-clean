
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Phone, ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
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
    <motion.section 
      className="py-10 px-4 md:py-14 lg:py-16 bg-gradient-to-b from-brand-gray to-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-custom max-w-5xl">
        <motion.div 
          className="relative overflow-hidden rounded-xl shadow-xl transform hover:scale-[1.01] duration-500 transition-all border border-brand-navy/10"
          whileInView={{ y: 0 }}
          initial={{ y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Background pattern overlay */}
          <div className="absolute inset-0 bg-brand-navy opacity-10 z-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnptMTIgMTJjMy4zMTQgMCA2LTIuNjg2IDYtNnMtMi42ODYtNi02LTZjLTMuMzE0IDAtNiAyLjY4Ni02IDZzMi42ODYgNiA2IDZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0xMiAzNmMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+')] opacity-50"></div>
          </div>
          
          {/* Content container */}
          <div className="relative flex flex-col md:flex-row bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80 z-10 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
              <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-brand-red opacity-10 blur-2xl"></div>
            </div>
          
            {/* Left image section - visible on md+ screens */}
            <div className="hidden md:block md:w-2/5 lg:w-1/3 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3')",
                  filter: "brightness(0.8) saturate(1.2)"
                }}
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy from-5% to-transparent"></div>
            </div>
            
            {/* Content section */}
            <div className="w-full md:w-3/5 lg:w-2/3 p-6 md:p-8 text-white flex flex-col">
              <div className="max-w-2xl space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 text-sm"
                >
                  <Clock className="h-3 w-3 mr-2 text-brand-red" />
                  <span className="text-xs">LIMITED TIME OFFER - Same Day Service Available</span>
                </motion.div>
                
                <motion.h2 
                  className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Ready to Clear the Clutter <span className="relative inline-block">
                    <span className="relative z-10">Today?</span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-red/30 z-0"></span>
                  </span>
                </motion.h2>
                
                <motion.p 
                  className={`text-white/80 ${isMobile ? 'text-sm' : 'text-base'} max-w-xl leading-relaxed`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Contact us for a free, no-obligation quote. Our team of junk removal specialists will handle all your needs with professionalism and care.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button 
                    asChild 
                    size={isMobile ? "default" : "lg"}
                    className="bg-brand-red hover:bg-brand-red/90 border border-brand-red/20 text-white font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <Link to="/quote" className="flex items-center">
                      Get a Free Quote
                      <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size={isMobile ? "default" : "lg"}
                    className="border border-white/60 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-brand-navy font-bold tracking-wide transition-all duration-300 hover:-translate-y-1"
                    onClick={handleCallClick}
                  >
                    <Phone size={16} className="mr-2" />
                    <a href={getPhoneLink()}>{PHONE_NUMBER}</a>
                  </Button>
                </motion.div>
                
                <div className="flex items-center justify-start pt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border border-white"></div>
                    ))}
                  </div>
                  <div className="ml-2 text-xs text-white/80">Join 200+ satisfied customers this month</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CtaSection;
