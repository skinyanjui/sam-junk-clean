
import React from 'react';
import { cn } from '@/lib/utils';
import Divider from './divider';

interface SectionSeparatorProps {
  className?: string;
  variant?: 'default' | 'gradient' | 'dashed' | 'dotted';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  mobileOnly?: boolean;
}

const SectionSeparator = ({ 
  className,
  variant = 'default',
  padding = 'sm', // Changed default from 'md' to 'sm'
  mobileOnly = false,
}: SectionSeparatorProps) => {
  
  // Map old variants to appropriate colors
  const variantToColor = {
    default: "#0006",
    gradient: "#0006", // Using same dark color for all variants for consistency
    dashed: "#0006",
    dotted: "#0006"
  };
  
  const mobileOnlyClass = mobileOnly ? 'md:hidden' : '';
  
  return (
    <Divider 
      color={variantToColor[variant]}
      padding={padding}
      className={cn(mobileOnlyClass, className)}
    />
  );
};

export default SectionSeparator;
