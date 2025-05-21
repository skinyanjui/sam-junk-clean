
import React from 'react';
import { motion } from 'framer-motion';
import { CompanyStat } from '@/integrations/supabase/companyService';

interface StatsSectionProps {
  stats: CompanyStat[];
  isVisible: boolean;
}

const StatsSection = ({ stats, isVisible }: StatsSectionProps) => {
  // Stats animations
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1
      }
    })
  };

  return (
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
  );
};

export default StatsSection;
