
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => {
  return (
    <section 
      className="py-12 px-4 md:py-16 lg:py-20 bg-gradient-to-br from-white via-brand-gray/30 to-white relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <Skeleton className="h-4 w-32 mx-auto mb-3" />
          <Skeleton className="h-10 w-56 md:w-80 mx-auto mb-4" />
          <Skeleton className="h-1 w-16 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-xl mx-auto" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-full">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-md h-full p-4">
                <Skeleton className="w-10 h-10 rounded-full mb-3" />
                <Skeleton className="h-5 w-28 mb-2" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="bg-white p-4 md:p-6 text-center">
                  <Skeleton className="h-8 w-20 mx-auto mb-2" />
                  <Skeleton className="h-3 w-24 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <Skeleton className="w-full h-32 rounded-xl" />
        </div>
        
        <div className="text-center">
          <Skeleton className="h-9 w-36 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
