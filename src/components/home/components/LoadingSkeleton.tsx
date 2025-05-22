
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => {
  return (
    <section 
      className="py-10 px-4 md:py-14 lg:py-16 bg-gradient-to-br from-white via-brand-gray/30 to-white relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <Skeleton className="h-5 w-36 mx-auto mb-3" />
          <Skeleton className="h-9 w-64 md:w-80 mx-auto mb-3" />
          <Skeleton className="h-1 w-16 mx-auto mb-3" />
          <Skeleton className="h-4 w-full max-w-xl mx-auto" />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <div key={index} className="h-full">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm h-full p-3">
                <div className="flex items-start">
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0 mr-3" />
                  <div className="w-full">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="bg-white p-3 md:p-4 text-center">
                  <Skeleton className="h-8 w-20 mx-auto mb-2" />
                  <Skeleton className="h-3 w-24 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <Skeleton className="w-full h-24 rounded-xl" />
        </div>
        
        <div className="text-center">
          <Skeleton className="h-9 w-36 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
