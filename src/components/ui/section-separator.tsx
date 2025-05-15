
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
  padding = 'sm',
  mobileOnly = false,
}: SectionSeparatorProps) => {
  
  // Map variants to darker colors
  const variantToColor = {
    default: "#333",
    gradient: "#333",
    dashed: "#333",
    dotted: "#333"
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
