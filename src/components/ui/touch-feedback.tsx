
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TouchFeedbackProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  intensity?: 'light' | 'medium' | 'strong';
  haptic?: boolean;
}

export const TouchFeedback = ({ 
  children, 
  className, 
  disabled = false,
  intensity = 'medium',
  haptic = true,
  ...props 
}: TouchFeedbackProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const scaleValues = {
    light: { pressed: 0.98, released: 1 },
    medium: { pressed: 0.95, released: 1 },
    strong: { pressed: 0.92, released: 1 }
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (disabled) return;
    
    setIsPressed(true);
    
    // Haptic feedback for supported devices
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleTouchEnd = () => {
    if (disabled) return;
    setIsPressed(false);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("select-none", className)}
      animate={{
        scale: isPressed ? scaleValues[intensity].pressed : scaleValues[intensity].released
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      {...props}
    >
      {children}
    </motion.div>
  );
};
