
import { useState, useEffect } from 'react';
import { Star, MapPin, Quote, ArrowRight } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
      <Star key={i} size={14} fill="#FFD700" color="#FFD700" />
    ));
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className={`py-10 ${isMobile ? 'px-4 py-8' : 'py-14'} bg-white relative overflow-hidden`}>
        <div className="container-custom text-center mb-6 relative z-10">
          <Skeleton className="h-5 w-36 mx-auto mb-2" />
          <Skeleton className="h-8 w-56 mx-auto mb-3" />
          <Skeleton className="h-1 w-16 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        </div>
        
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-4 h-[220px]">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex items-center mt-auto pt-3 border-t">
                  <Skeleton className="h-8 w-8 rounded-full mr-2" />
                  <div>
                    <Skeleton className="h-3 w-24 mb-1" />
                    <Skeleton className="h-2 w-16" />
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
    <section className={`py-10 ${isMobile ? 'px-4 py-8' : 'py-14'} bg-white relative overflow-hidden`}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom text-center mb-6 relative z-10">
        <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block text-sm">TRUSTED BY HUNDREDS OF CLIENTS</span>
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-brand-navy mb-3`}>
          Our Clients Speak
        </h2>
        <div className="w-16 h-1 bg-brand-red mx-auto mb-4"></div>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} max-w-2xl mx-auto text-gray-600`}>
          We're proud of our 5-star reputation across the Tri-State area. Here's what real customers have to say.
        </p>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="bg-brand-gray/50 p-3 md:p-5 rounded-xl mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-1">
              {renderStars(5)}
              <span className="ml-2 text-sm font-semibold text-brand-navy">4.9/5 Average Rating</span>
            </div>
            <div className="text-sm text-gray-500">Based on 200+ reviews</div>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: testimonials.length > 3,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem 
                  key={testimonial.id} 
                  className={`pl-3 md:pl-4 ${isMobile ? 'basis-full' : isLandscapeMobile ? 'basis-1/2' : 'basis-1/3'} min-h-[220px]`}
                >
                  <Card className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    <div className="mb-1 text-brand-red">
                      <Quote size={16} className="opacity-50" />
                    </div>
                    <div className="flex mb-2">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed flex-grow">&quot;{testimonial.quote}&quot;</p>
                    <div className="flex items-center border-t border-gray-100 pt-3 mt-auto">
                      <div className="bg-brand-navy/10 w-8 h-8 rounded-full flex items-center justify-center text-brand-navy font-bold text-sm mr-2">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy text-sm">{testimonial.name}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <MapPin size={10} className="mr-1" />
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative static bg-brand-navy text-white hover:bg-brand-navy/80 h-8 w-8" />
              <CarouselNext className="relative static bg-brand-navy text-white hover:bg-brand-navy/80 h-8 w-8" />
            </div>
          </Carousel>
        </div>
        
        <div className="text-center">
          <Button 
            asChild 
            variant="outline" 
            className="text-brand-navy border-brand-navy border hover:bg-brand-navy hover:text-white"
            size="sm"
          >
            <Link to="/reviews" className="inline-flex items-center">
              See all reviews
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
