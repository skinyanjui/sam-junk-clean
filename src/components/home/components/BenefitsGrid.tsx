
import React from 'react';
import { motion } from 'framer-motion';
import BenefitCard from './BenefitCard';
import { CompanyBenefit } from '@/integrations/supabase/companyService';

interface BenefitsGridProps {
  benefits: CompanyBenefit[];
  isVisible: boolean;
}

const BenefitsGrid = ({ benefits, isVisible }: BenefitsGridProps) => {
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

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {benefits.map((benefit, index) => (
        <BenefitCard key={benefit.id} benefit={benefit} index={index} />
      ))}
    </motion.div>
  );
};

export default BenefitsGrid;
