
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant?: "card" | "text" | "form" | "button";
  count?: number;
  className?: string;
}

export function LoadingSkeleton({
  variant = "text",
  count = 1,
  className,
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div className={cn("w-full", className)}>
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
      case "text":
      default:
        return (
          <div className={cn("space-y-2", className)}>
            {Array.from({ length: count }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        );
    }
  };

  return <>{renderSkeleton()}</>;
}
