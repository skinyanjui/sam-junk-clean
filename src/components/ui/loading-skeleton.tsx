
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  height?: string
  width?: string
  variant?: 'default' | 'image' | 'card' | 'text'
  count?: number
  children?: React.ReactNode
}

export function LoadingSkeleton({ 
  className, 
  height = "1rem", 
  width = "100%", 
  variant = "default",
  count = 1,
  children,
  ...props 
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    if (variant === 'image') {
      return (
        <div 
          className={cn(
            "relative overflow-hidden rounded-lg bg-muted animate-pulse",
            className
          )}
          style={{ height, width }}
          {...props}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
        </div>
      )
    }

    if (variant === 'card') {
      return (
        <div className={cn("space-y-3 p-4 rounded-lg border bg-card", className)} {...props}>
          <div className="h-32 bg-muted rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
          </div>
          <div className="h-8 bg-muted rounded animate-pulse" />
        </div>
      )
    }

    if (variant === 'text') {
      return (
        <div 
          className={cn("bg-muted rounded animate-pulse", className)}
          style={{ height, width }}
          {...props}
        />
      )
    }

    return (
      <div 
        className={cn("bg-muted rounded animate-pulse", className)}
        style={{ height, width }}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}
