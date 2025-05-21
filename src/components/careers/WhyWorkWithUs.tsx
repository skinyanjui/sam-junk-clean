
import { Users, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResponsiveLayout } from '@/hooks/use-mobile';

const WhyWorkWithUs = () => {
  const { isMobile } = useResponsiveLayout();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section className="py-12 px-4 md:py-16 lg:py-20 bg-gradient-to-b from-white to-brand-gray/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-64 -right-64 w-96 h-96 rounded-full bg-brand-navy/5"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-brand-red/5"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy font-medium text-sm mb-3">Join Our Team</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-navy mb-4">Why Work With Us</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Join a team that values hard work, camaraderie, and customer satisfaction. 
            We're not just employees - we're a family on a mission to help our community.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div 
            className="relative group" 
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 to-brand-navy/0 rounded-lg transform group-hover:scale-[1.03] transition-all duration-300 ease-out"></div>
            <div className="relative p-6 md:p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100 group-hover:-translate-y-1">
              <div className="bg-brand-navy/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110 duration-300">
                <Users size={isMobile ? 24 : 32} className="text-brand-navy" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-navy mb-3 text-center">Supportive Team</h3>
              <p className="text-gray-600 text-center">
                Work with a team that has your back. We believe in collaboration, support, and helping each other succeed.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="relative group" 
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 to-brand-navy/0 rounded-lg transform group-hover:scale-[1.03] transition-all duration-300 ease-out"></div>
            <div className="relative p-6 md:p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100 group-hover:-translate-y-1">
              <div className="bg-brand-navy/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110 duration-300">
                <Award size={isMobile ? 24 : 32} className="text-brand-navy" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-navy mb-3 text-center">Growth Opportunities</h3>
              <p className="text-gray-600 text-center">
                We promote from within and provide training to help you advance your career with us as we continue to grow.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="relative group" 
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 to-brand-navy/0 rounded-lg transform group-hover:scale-[1.03] transition-all duration-300 ease-out"></div>
            <div className="relative p-6 md:p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100 group-hover:-translate-y-1">
              <div className="bg-brand-navy/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110 duration-300">
                <Shield size={isMobile ? 24 : 32} className="text-brand-navy" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-navy mb-3 text-center">Veteran Supportive</h3>
              <p className="text-gray-600 text-center">
                As a veteran-owned business, we understand the value veterans bring to the workforce and actively support their transition to civilian careers.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
