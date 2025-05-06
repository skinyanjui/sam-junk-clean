
import React from 'react';
import { cn } from '@/lib/utils';

interface StepsProps {
  children: React.ReactNode;
  active: number;
  count: number;
  className?: string;
}

export const Steps = ({ children, active, count, className }: StepsProps) => {
  // Ensure that the active step is within bounds
  const activeStep = Math.max(0, Math.min(React.Children.count(children) - 1, active));

  return (
    <div className={cn("flex w-full", className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<StepProps>, {
            isActive: index === activeStep,
            isCompleted: index < activeStep,
            isLastStep: index === count - 1,
            stepNumber: index + 1,
          });
        }
        return child;
      })}
    </div>
  );
};

interface StepProps {
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
  isLastStep?: boolean;
  stepNumber?: number;
  className?: string;
}

export const Step = ({ 
  title, 
  isActive = false, 
  isCompleted = false, 
  isLastStep = false,
  stepNumber,
  className 
}: StepProps) => {
  return (
    <div className={cn("flex-1 relative", className)}>
      {/* Line between steps */}
      {!isLastStep && (
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200">
          <div
            className={cn(
              "h-full bg-brand-red transition-all duration-300",
              isCompleted ? "w-full" : "w-0"
            )}
          />
        </div>
      )}
      
      {/* Step indicator */}
      <div className="flex flex-col items-center relative z-10">
        <div 
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2",
            isActive 
              ? "bg-white border-brand-red text-brand-red" 
              : isCompleted 
                ? "bg-brand-red border-brand-red text-white"
                : "bg-white border-gray-300 text-gray-500"
          )}
        >
          {isCompleted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
          ) : (
            <span className="text-sm font-medium">{stepNumber}</span>
          )}
        </div>
        <div className={cn(
          "mt-2 text-xs font-medium hidden sm:block",
          isActive 
            ? "text-brand-navy" 
            : isCompleted 
              ? "text-brand-red"
              : "text-gray-500"
        )}>
          {title}
        </div>
      </div>
    </div>
  );
};
