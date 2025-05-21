
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Award, Users, Truck, Calendar, Shield, Leaf, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { CompanyBenefit, CompanyStat, fetchCompanyBenefits, fetchCompanyStats } from '@/integrations/supabase/companyService';
import { Skeleton } from '@/components/ui/skeleton';

const WhyChooseUs = () => {
  const { isMobile, isTablet, isDesktop } = useResponsiveLayout();
  const [benefits, setBenefits] = useState<CompanyBenefit[]>([]);
  const [stats, setStats] = useState<CompanyStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [benefitsData, statsData] = await Promise.all([
          fetchCompanyBenefits(),
          fetchCompanyStats()
        ]);
        setBenefits(benefitsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading company data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // Setup intersection observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    // Find the section element to observe
    const sectionElement = document.getElementById('why-choose-us-section');
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    
    return () => observer.disconnect();
  }, []);

  // Helper function to get the right icon component based on string name
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Shield': <Shield className="h-6 w-6" />,
      'Calendar': <Calendar className="h-6 w-6" />,
      'Leaf': <Leaf className="h-6 w-6" />,
      'Truck': <Truck className="h-6 w-6" />,
      'Award': <Award className="h-6 w-6" />,
      'Users': <Users className="h-6 w-6" />,
      'Star': <Star className="h-6 w-6" />,
    };

    return iconMap[iconName] || <Shield className="h-6 w-6" />;
  };

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Stats animations
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: item => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: item * 0.1
      }
    })
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section 
        id="why-choose-us-section"
        className="py-16 px-4 md:py-20 lg:py-24 bg-gradient-to-br from-white via-brand-gray/30 to-white relative overflow-hidden"
      >
        <div className="container-custom relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <Skeleton className="h-4 w-36 mx-auto mb-3" />
            <Skeleton className="h-12 w-64 md:w-96 mx-auto mb-4" />
            <Skeleton className="h-1 w-20 mx-auto mb-6" />
            <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`}>
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="h-full">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg h-full p-6">
                  <Skeleton className="w-14 h-14 rounded-full mb-5" />
                  <Skeleton className="h-6 w-36 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 mb-10">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="bg-white p-6 md:p-8 text-center">
                    <Skeleton className="h-10 w-24 mx-auto mb-2" />
                    <Skeleton className="h-4 w-32 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <Skeleton className="w-full h-40 rounded-2xl" />
          </div>
          
          <div className="text-center">
            <Skeleton className="h-10 w-40 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="why-choose-us-section"
      className="py-16 px-4 md:py-20 lg:py-24 bg-gradient-to-br from-white via-brand-gray/30 to-white relative overflow-hidden"
    >
      {/* Abstract background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-brand-navy blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-brand-red blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-brand-yellow blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-red/10 text-brand-red font-semibold text-sm uppercase tracking-wider mb-3">Your Best Choice</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-navy to-brand-navy/80 bg-clip-text text-transparent">
            Experience The Difference
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-red to-brand-red/60 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-600">
            We're not just another junk removal company. Our veteran leadership, environmental commitment, 
            and dedication to customer satisfaction set us apart.
          </p>
        </motion.div>
        
        {/* Benefits Grid */}
        <motion.div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16`}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={benefit.id} variants={itemVariants}>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden group">
                <CardContent className="p-6 md:p-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-transparent group-hover:to-brand-gray/20 transition-all duration-500"></div>
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-full ${benefit.color_class} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      {getIconComponent(benefit.icon)}
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Stats Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.id} 
                  className="p-6 md:p-8 text-center"
                  custom={index}
                  variants={statsVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                >
                  <motion.p 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-brand-navy to-brand-navy/70 bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Customer Promise */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white rounded-2xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-10 text-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
              </div>
              
              <div className="relative">
                <Badge className="bg-brand-red border-0 mb-4 px-3 py-1">Our Pledge To You</Badge>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  100% <span className="text-brand-yellow">Satisfaction</span> Guarantee
                </h3>
                <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
                  <div className="flex items-center">
                    <div className="mr-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Star className="h-5 w-5 text-brand-yellow" />
                    </div>
                    <span className="text-white/90">Top-rated service</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white/90">Background-checked team</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white/90">Fully insured service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Centered CTA Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Button 
            asChild 
            size={isMobile ? "default" : "lg"}
            className="bg-brand-navy hover:bg-brand-navy/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <Link to="/about" className="flex items-center">
              Learn More About Us
              <motion.span 
                className="ml-1"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
