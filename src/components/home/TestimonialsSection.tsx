
import { useState, useEffect } from 'react';
import { Star, MapPin, Quote } from 'lucide-react';
import { useResponsiveLayout } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from '@/components/ui/card';
import { Testimonial, fetchTestimonials } from '@/integrations/supabase/testimonialsService';
import { Skeleton } from '@/components/ui/skeleton';

const TestimonialsSection = () => {
  const { isMobile, isLandscapeMobile } = useResponsiveLayout();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadTestimonials = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);
  
  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, i) => (
      <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
    ));
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className={`py-16 ${isMobile ? 'px-4 py-12' : 'py-20'} bg-white relative overflow-hidden`}>
        <div className="container-custom text-center mb-10 relative z-10">
          <Skeleton className="h-6 w-40 mx-auto mb-2" />
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-1 w-20 mx-auto mb-6" />
          <Skeleton className="h-5 w-full max-w-3xl mx-auto" />
        </div>
        
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-6 h-[280px]">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <div className="flex items-center mt-auto pt-4 border-t">
                  <Skeleton className="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-28 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${isMobile ? 'px-4 py-12' : 'py-20'} bg-white relative overflow-hidden`}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom text-center mb-10 relative z-10">
        <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Customer Stories</span>
        <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-4`}>
          Our Clients Speak
        </h2>
        <div className="w-20 h-1 bg-brand-red mx-auto mb-6"></div>
        <p className={`${isMobile ? 'text-base' : 'text-lg'} max-w-3xl mx-auto text-gray-600`}>
          We're proud of our 5-star reputation across the Tri-State area. Here's what real customers have to say.
        </p>
      </div>
      
      <div className="container-custom relative z-10">
        <Carousel
          opts={{
            align: "start",
            loop: testimonials.length > 3,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem 
                key={testimonial.id} 
                className={`pl-4 ${isMobile ? 'basis-full' : isLandscapeMobile ? 'basis-1/2' : 'basis-1/3'} min-h-[280px]`}
              >
                <Card className="bg-white border border-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="mb-2 text-brand-red">
                    <Quote size={24} className="opacity-50" />
                  </div>
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed flex-grow">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center border-t border-gray-100 pt-4 mt-auto">
                    <div className="bg-brand-navy/10 w-10 h-10 rounded-full flex items-center justify-center text-brand-navy font-bold text-lg mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex justify-center gap-2 mt-8">
            <CarouselPrevious className="relative static bg-brand-navy text-white hover:bg-brand-navy/80" />
            <CarouselNext className="relative static bg-brand-navy text-white hover:bg-brand-navy/80" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
