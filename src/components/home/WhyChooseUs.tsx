
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { CompanyBenefit, CompanyStat, fetchCompanyBenefits, fetchCompanyStats } from '@/integrations/supabase/companyService';
import BenefitsGrid from './components/BenefitsGrid';
import StatsSection from './components/StatsSection';
import CustomerPromise from './components/CustomerPromise';
import LoadingSkeleton from './components/LoadingSkeleton';

const WhyChooseUs = () => {
  const { isMobile } = useResponsiveLayout();
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

  // If loading, show skeleton
  if (isLoading) {
    return <LoadingSkeleton />;
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
        
        {/* Benefits Grid Component */}
        <BenefitsGrid benefits={benefits} isVisible={isVisible} />
        
        {/* Stats Section Component */}
        <StatsSection stats={stats} isVisible={isVisible} />
        
        {/* Customer Promise Component */}
        <CustomerPromise isVisible={isVisible} />
        
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
