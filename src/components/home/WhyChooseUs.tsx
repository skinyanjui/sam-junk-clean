
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('WhyChooseUs: Component mounted, starting data load...');
    
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('WhyChooseUs: Fetching benefits and stats...');
        const [benefitsData, statsData] = await Promise.all([
          fetchCompanyBenefits(),
          fetchCompanyStats()
        ]);
        
        console.log('WhyChooseUs: Data loaded successfully', {
          benefits: benefitsData.length,
          stats: statsData.length
        });
        
        setBenefits(benefitsData);
        setStats(statsData);
      } catch (error) {
        console.error('WhyChooseUs: Error loading company data:', error);
        setError('Failed to load company data');
        
        // Set fallback data to ensure something displays and align with About Us page
        setBenefits([
          {
            id: 'fallback-1',
            title: 'Veteran-Owned',
            description: 'U.S. Marine Corps veteran owned and operated business',
            icon: 'Award',
            color_class: 'bg-blue-100 text-blue-800',
            sort_order: 1,
            created_at: new Date().toISOString()
          },
          {
            id: 'fallback-2',
            title: 'Licensed & Insured',
            description: 'Fully licensed and insured for your protection',
            icon: 'Shield',
            color_class: 'bg-green-100 text-green-800',
            sort_order: 2,
            created_at: new Date().toISOString()
          },
          {
            id: 'fallback-3',
            title: 'Eco-Friendly',
            description: 'We donate and recycle whenever possible',
            icon: 'Leaf',
            color_class: 'bg-emerald-100 text-emerald-800',
            sort_order: 3,
            created_at: new Date().toISOString()
          },
          {
            id: 'fallback-4',
            title: 'Transparent Pricing',
            description: 'Upfront pricing with no hidden fees',
            icon: 'DollarSign',
            color_class: 'bg-amber-100 text-amber-800',
            sort_order: 4,
            created_at: new Date().toISOString()
          },
          {
            id: 'fallback-5',
            title: 'Flexible Scheduling',
            description: 'Same-day service available',
            icon: 'Calendar',
            color_class: 'bg-purple-100 text-purple-800',
            sort_order: 5,
            created_at: new Date().toISOString()
          },
          {
            id: 'fallback-6',
            title: '100% Satisfaction',
            description: 'Guaranteed satisfaction with every job',
            icon: 'Star',
            color_class: 'bg-red-100 text-red-800',
            sort_order: 6,
            created_at: new Date().toISOString()
          },
          {
            id: 'fallback-7',
            title: 'Professional Team',
            description: 'Experienced team of trained professionals',
            icon: 'Users',
            color_class: 'bg-indigo-100 text-indigo-800',
            sort_order: 7,
            created_at: new Date().toISOString()
          },
          {
            id: 'fallback-8',
            title: 'Tri-State Service',
            description: 'Proudly serving the entire Tri-State area',
            icon: 'Truck',
            color_class: 'bg-cyan-100 text-cyan-800',
            sort_order: 8,
            created_at: new Date().toISOString()
          }
        ]);
        setStats([
          {
            id: 'fallback-1',
            value: '100%',
            label: 'Reliable Service',
            sort_order: 1,
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        console.log('WhyChooseUs: Setting loading to false');
        setIsLoading(false);
      }
    };

    loadData();

    // Setup intersection observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('WhyChooseUs: Section became visible');
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const sectionElement = document.getElementById('why-choose-us-section');
      if (sectionElement) {
        console.log('WhyChooseUs: Observing section element');
        observer.observe(sectionElement);
      } else {
        console.warn('WhyChooseUs: Section element not found');
        setIsVisible(true); // Fallback to visible
      }
    }, 100);
    
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  console.log('WhyChooseUs: Rendering with state', { isLoading, benefits: benefits.length, stats: stats.length, error });

  // Show loading skeleton
  if (isLoading) {
    console.log('WhyChooseUs: Showing loading skeleton');
    return <LoadingSkeleton />;
  }

  // Show error state if needed
  if (error && benefits.length === 0) {
    console.log('WhyChooseUs: Showing error state');
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="container-custom text-center">
          <p className="text-gray-600">Unable to load content. Please try again later.</p>
        </div>
      </section>
    );
  }

  console.log('WhyChooseUs: Rendering full component');

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
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-red/10 text-brand-red font-semibold text-sm uppercase tracking-wider mb-3">Why Choose Uncle Sam</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-navy to-brand-navy/80 bg-clip-text text-transparent">
            Experience The Uncle Sam Difference
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-red to-brand-red/60 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-600">
            We're not just another junk removal company. Our veteran-owned and operated business, 
            environmental responsibility, and commitment to 100% customer satisfaction set us apart.
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
