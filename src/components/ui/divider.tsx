
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  color?: string;
  thickness?: number;
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}

const Divider = ({
  className,
  color = "#555", // Darker default color
  thickness = 1,
  padding = "md",
}: DividerProps) => {
  
  const paddingClasses = {
    none: 'py-0',
    sm: 'py-2',
    md: 'py-4',
    lg: 'py-6',
    xl: 'py-10'
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
