
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  loaderClassName?: string;
  spinnerSize?: "sm" | "md" | "lg";
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ 
    children, 
    className, 
    isLoading = false, 
    loadingText, 
    disabled,
    icon,
    loaderClassName,
    spinnerSize = "md",
    ...props 
  }, ref) => {
    // Determine spinner size based on prop
    const spinnerSizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5"
    };

    return (
      <Button
        ref={ref}
        className={cn(
          "transition-all duration-200 relative",
          isLoading && "opacity-90",
          className
        )}
        disabled={isLoading || disabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 
              className={cn(
                "mr-2 animate-spin", 
                spinnerSizeClasses[spinnerSize],
                loaderClassName
              )} 
              aria-hidden="true"
            />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {icon && <span className="mr-2" aria-hidden="true">{icon}</span>}
            {children}
          </>
        )}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
