
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface EnhancedLoadingSkeletonProps {
  variant?: "hero" | "service-card" | "testimonial" | "blog-card" | "stats" | "navigation";
  count?: number;
  className?: string;
  animated?: boolean;
}

export function EnhancedLoadingSkeleton({
  variant = "hero",
  count = 1,
  className,
  animated = true,
}: EnhancedLoadingSkeletonProps) {
  
  const baseClasses = animated ? "animate-pulse" : "";
  
  const renderSkeleton = () => {
    switch (variant) {
      case "hero":
        return (
          <div className={cn("w-full space-y-6", className)}>
            <div className="space-y-4">
              <Skeleton className={cn("h-4 w-32", baseClasses)} />
              <Skeleton className={cn("h-12 md:h-16 w-full", baseClasses)} />
              <Skeleton className={cn("h-6 w-4/5", baseClasses)} />
            </div>
            <div className="space-y-3">
              <Skeleton className={cn("h-4 w-80", baseClasses)} />
              <Skeleton className={cn("h-4 w-72", baseClasses)} />
              <Skeleton className={cn("h-4 w-84", baseClasses)} />
            </div>
            <div className="flex gap-4">
              <Skeleton className={cn("h-12 w-48", baseClasses)} />
              <Skeleton className={cn("h-12 w-48", baseClasses)} />
            </div>
          </div>
        );

      case "service-card":
        return (
          <div className={cn("bg-white rounded-lg p-6 shadow-sm", className)}>
            <div className="flex items-start space-x-4">
              <Skeleton className={cn("h-8 w-8 rounded-full", baseClasses)} />
              <div className="flex-1 space-y-2">
                <Skeleton className={cn("h-5 w-3/4", baseClasses)} />
                <Skeleton className={cn("h-4 w-full", baseClasses)} />
                <Skeleton className={cn("h-4 w-5/6", baseClasses)} />
              </div>
            </div>
          </div>
        );

      case "testimonial":
        return (
          <div className={cn("bg-white rounded-xl p-6 shadow-sm", className)}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Skeleton className={cn("h-12 w-12 rounded-full", baseClasses)} />
                <div className="space-y-2">
                  <Skeleton className={cn("h-4 w-32", baseClasses)} />
                  <Skeleton className={cn("h-3 w-24", baseClasses)} />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className={cn("h-4 w-full", baseClasses)} />
                <Skeleton className={cn("h-4 w-full", baseClasses)} />
                <Skeleton className={cn("h-4 w-3/4", baseClasses)} />
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className={cn("h-4 w-4", baseClasses)} />
                ))}
              </div>
            </div>
          </div>
        );

      case "blog-card":
        return (
          <div className={cn("bg-white rounded-lg overflow-hidden shadow-sm", className)}>
            <Skeleton className={cn("h-48 w-full", baseClasses)} />
            <div className="p-6 space-y-3">
              <Skeleton className={cn("h-3 w-20", baseClasses)} />
              <Skeleton className={cn("h-6 w-4/5", baseClasses)} />
              <div className="space-y-2">
                <Skeleton className={cn("h-4 w-full", baseClasses)} />
                <Skeleton className={cn("h-4 w-3/4", baseClasses)} />
              </div>
              <Skeleton className={cn("h-3 w-24", baseClasses)} />
            </div>
          </div>
        );

      case "stats":
        return (
          <div className={cn("text-center p-4", className)}>
            <Skeleton className={cn("h-8 w-20 mx-auto mb-2", baseClasses)} />
            <Skeleton className={cn("h-4 w-32 mx-auto", baseClasses)} />
          </div>
        );

      case "navigation":
        return (
          <div className={cn("flex items-center space-x-6", className)}>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className={cn("h-4 w-16", baseClasses)} />
            ))}
          </div>
        );

      default:
        return <Skeleton className={cn("h-4 w-full", baseClasses, className)} />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={count > 1 && i < count - 1 ? "mb-6" : ""}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}
