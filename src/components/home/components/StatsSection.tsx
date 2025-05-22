
import React from 'react';
import { motion } from 'framer-motion';
import { CompanyStat } from '@/integrations/supabase/companyService';
import { ArrowRight, TrendingUp } from 'lucide-react';

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
        delay: index * 0.08
      }
    })
  };

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id} 
              className="p-3 md:p-4 text-center relative overflow-hidden group cursor-pointer"
              custom={index}
              variants={statsVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <div className="absolute inset-0 bg-brand-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div
                className="mb-1 relative"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              >
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-brand-navy to-brand-navy/70 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                {index === 0 && (
                  <TrendingUp className="h-3 w-3 text-green-500 inline ml-1 mb-2" />
                )}
              </motion.div>
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
