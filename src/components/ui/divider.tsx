
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  color?: string;
  thickness?: number;
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}

const Divider = ({
  className,
  color = "#0006",
  thickness = 1,
  padding = "md",
}: DividerProps) => {
  
  const paddingClasses = {
    none: 'py-0',
    sm: 'py-2', // Reduced from py-4
    md: 'py-4', // Reduced from py-8
    lg: 'py-6', // Reduced from py-12
    xl: 'py-10' // Reduced from py-16
  };
  
  return (
    <div className={cn('w-full', paddingClasses[padding], className)}>
      <div 
        className="w-full h-px"
        style={{ backgroundColor: color, height: `${thickness}px` }} 
      />
    </div>
  );
};

export default Divider;
