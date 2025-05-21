
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => {
  return (
    <section 
      className="py-16 px-4 md:py-20 lg:py-24 bg-gradient-to-br from-white via-brand-gray/30 to-white relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <Skeleton className="h-4 w-36 mx-auto mb-3" />
          <Skeleton className="h-12 w-64 md:w-96 mx-auto mb-4" />
          <Skeleton className="h-1 w-20 mx-auto mb-6" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-full">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg h-full p-6">
                <Skeleton className="w-14 h-14 rounded-full mb-5" />
                <Skeleton className="h-6 w-36 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 mb-10">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="bg-white p-6 md:p-8 text-center">
                  <Skeleton className="h-10 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <Skeleton className="w-full h-40 rounded-2xl" />
        </div>
        
        <div className="text-center">
          <Skeleton className="h-10 w-40 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
