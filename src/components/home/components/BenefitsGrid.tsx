
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
        staggerChildren: 0.08
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8"
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
