
import React from 'react';
import { cn } from '@/lib/utils';
import Divider from './divider';

interface SectionSeparatorProps {
  className?: string;
  variant?: 'default' | 'gradient' | 'dashed' | 'dotted';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}

const SectionSeparator = ({ 
  className,
  variant = 'default',
  padding = 'md',
}: SectionSeparatorProps) => {
  
  // Map old variants to appropriate colors
  const variantToColor = {
    default: "#0006",
    gradient: "#0006", // Using same dark color for all variants for consistency
    dashed: "#0006",
    dotted: "#0006"
  };
  
  return (
    <Divider 
      color={variantToColor[variant]}
      padding={padding}
      className={className}
    />
  );
};

export default SectionSeparator;
