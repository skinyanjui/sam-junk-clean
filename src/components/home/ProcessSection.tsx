
import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { useResponsiveLayout } from '@/hooks/use-mobile';
import { ProcessStep, fetchProcessSteps } from '@/integrations/supabase/processStepsService';
import { Skeleton } from '@/components/ui/skeleton';

const ProcessSection = () => {
  const { isMobile, orientation } = useResponsiveLayout();
  const isLandscape = orientation === 'landscape';
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadSteps = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProcessSteps();
        setSteps(data);
      } catch (error) {
        console.error('Error loading process steps:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSteps();
  }, []);

  // Loading skeleton
  if (isLoading) {
    return (
      <section className={`py-10 ${isMobile ? 'px-4 py-8' : 'py-12'}`}>
        <div className="container-custom">
          <div className="text-center mb-8">
            <Skeleton className="h-6 w-32 mx-auto mb-3" />
            <Skeleton className="h-10 w-64 mx-auto mb-3" />
            <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
          </div>

          <div className={`grid ${isMobile && isLandscape ? 'grid-cols-2 gap-4' : isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 md:grid-cols-4 gap-5'} mt-8`}>
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="relative">
                <Skeleton className="w-12 h-12 rounded-full mb-3" />
                <Skeleton className="h-6 w-36 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-10 ${isMobile ? 'px-4 py-8' : 'py-12'}`}>
      <div className="container-custom">
        <div className="text-center mb-8">
          <Badge className="bg-brand-navy mb-3">Simple Process</Badge>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-3`}>
            Junk Removal Made Easy
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-2xl mx-auto`}>
            From booking to cleanup, we've streamlined everything to save you time and hassle.
          </p>
        </div>

        <div className={`grid ${isMobile && isLandscape ? 'grid-cols-2 gap-4' : isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 md:grid-cols-4 gap-5'} mt-8`}>
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Number indicator */}
              <div className={`${step.color_class} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-3 shadow-lg`}>
                {step.number}
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && !isMobile && (
                <div className="absolute top-6 left-12 h-0.5 bg-gray-200 w-full transform -translate-y-1/2 -z-10"></div>
              )}
              
              <h3 className="text-xl font-bold text-brand-navy mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
