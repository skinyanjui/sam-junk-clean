
import React from 'react';
import { motion } from 'framer-motion';
import { CompanyStat } from '@/integrations/supabase/companyService';
import { ArrowRight } from 'lucide-react';

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
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id} 
              className="p-4 md:p-6 text-center relative overflow-hidden group"
              custom={index}
              variants={statsVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <div className="absolute inset-0 bg-brand-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.p 
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-brand-navy to-brand-navy/70 bg-clip-text text-transparent mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-500 text-xs sm:text-sm flex items-center justify-center">
                {stat.label}
                <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsSection;
