
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant?: "card" | "text" | "form" | "button" | "image" | "avatar" | "table";
  count?: number;
  className?: string;
  height?: string;
  width?: string;
}

export function LoadingSkeleton({
  variant = "text",
  count = 1,
  className,
  height,
  width,
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div className={cn("w-full rounded-xl overflow-hidden", className)}>
            <Skeleton className="h-48 w-full rounded-t-xl" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        );
      case "form":
        return (
          <div className={cn("space-y-4 w-full", className)}>
            <Skeleton className="h-5 w-1/4 mb-1" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-5 w-1/4 mb-1" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-5 w-1/4 mb-1" />
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md mt-4" />
          </div>
        );
      case "button":
        return <Skeleton className={cn("h-10 w-20 rounded-md", className)} />;
      case "image":
        return <Skeleton className={cn("w-full aspect-video rounded-md", className)} />;
      case "avatar":
        return <Skeleton className={cn("h-12 w-12 rounded-full", className)} />;
      case "table":
        return (
          <div className={cn("w-full space-y-3", className)}>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 flex-1" />
              ))}
            </div>
            {[...Array(count)].map((_, i) => (
              <div key={i} className="flex gap-2">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-12 flex-1" />
                ))}
              </div>
            ))}
          </div>
        );
      case "text":
      default:
        return (
          <div className={cn("space-y-2", className)}>
            {Array.from({ length: count }).map((_, i) => (
              <Skeleton 
                key={i} 
                className={cn("h-4 w-full", 
                  i === count - 1 && count > 1 ? "w-4/5" : "",
                  height ? { height } : {},
                  width ? { width } : {}
                )} 
              />
            ))}
          </div>
        );
    }
  };

  return <>{renderSkeleton()}</>;
}
