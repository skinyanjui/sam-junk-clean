
import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

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
  
  const paddingClasses = {
    none: 'py-0',
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12',
    xl: 'py-16'
  };
  
  const variantClasses = {
    default: 'bg-gray-200',
    gradient: 'bg-gradient-to-r from-transparent via-gray-300 to-transparent',
    dashed: 'bg-gray-200 [mask-image:_linear-gradient(to_right,_transparent_5%,_black_5%_95%,_transparent_95%)] [mask-size:_10px_1px] [mask-repeat:_repeat]',
    dotted: 'bg-gray-200 [mask-image:_radial-gradient(circle,_black_25%,_transparent_25%)] [mask-size:_6px_6px] [mask-repeat:_repeat]'
  };
  
  return (
    <div className={cn('w-full', paddingClasses[padding], className)}>
      <Separator className={cn('h-px', variantClasses[variant])} />
    </div>
  );
};

export default SectionSeparator;
