
import React from 'react';
import { cn } from "@/lib/utils";

interface EnhancedLoadingSkeletonProps {
  variant?: 'default' | 'card' | 'image' | 'text' | 'list';
  count?: number;
  className?: string;
  height?: string;
  width?: string;
  animate?: boolean;
}

const EnhancedLoadingSkeleton: React.FC<EnhancedLoadingSkeletonProps> = ({
  variant = 'default',
  count = 1,
  className,
  height,
  width,
  animate = true
}) => {
  const baseClasses = cn(
    "bg-gray-200 rounded",
    animate && "animate-pulse",
    className
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={cn("p-4 border rounded-lg", className)}>
            <div className={cn(baseClasses, "h-32 mb-4")} />
            <div className={cn(baseClasses, "h-4 mb-2")} />
            <div className={cn(baseClasses, "h-4 w-3/4 mb-4")} />
            <div className={cn(baseClasses, "h-8 w-24")} />
          </div>
        );
      
      case 'image':
        return (
          <div 
            className={baseClasses}
            style={{ 
              height: height || '200px',
              width: width || '100%'
            }}
          />
        );
      
      case 'text':
        return (
          <div 
            className={baseClasses}
            style={{ 
              height: height || '1rem',
              width: width || '100%'
            }}
          />
        );
      
      case 'list':
        return (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={cn(baseClasses, "h-4")} />
            ))}
          </div>
        );
      
      default:
        return (
          <div 
            className={baseClasses}
            style={{ 
              height: height || '1rem',
              width: width || '100%'
            }}
          />
        );
    }
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default EnhancedLoadingSkeleton;
