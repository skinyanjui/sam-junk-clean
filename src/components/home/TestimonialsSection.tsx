import { useState, useEffect } from 'react';
import { Star, MapPin, Quote, ArrowRight, ThumbsUp } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

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
      <section className={`py-8 ${isMobile ? 'px-4 py-8' : 'py-12'} bg-white relative overflow-hidden`}>
        <div className="container-custom text-center mb-5 relative z-10">
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
    <section className={`py-8 ${isMobile ? 'px-4 py-8' : 'py-12'} bg-white relative overflow-hidden`}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom text-center mb-5 relative z-10">
        <Badge className="bg-brand-red text-white border-0 mb-2">CUSTOMER LOVE</Badge>
        <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl md:text-3xl'} font-bold text-brand-navy mb-2`}>
          Real Results, Real Customers
        </h2>
        <div className="w-16 h-1 bg-brand-red mx-auto mb-3"></div>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} max-w-xl mx-auto text-gray-600`}>
          Join hundreds of satisfied customers who trust our junk removal service
        </p>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="bg-brand-gray/30 p-3 md:p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1">
              {renderStars(5)}
              <span className="ml-2 text-sm font-semibold text-brand-navy">4.9/5 Average Rating</span>
            </div>
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
              <ThumbsUp size={12} className="mr-1" />
              <span>200+ verified reviews</span>
            </div>
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
                  className={`pl-3 md:pl-4 ${isMobile ? 'basis-full' : isLandscapeMobile ? 'basis-1/2' : 'basis-1/3'} min-h-[180px]`}
                >
                  <Card className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow transition-all duration-300 h-full flex flex-col">
                    <div className="mb-1 text-brand-red">
                      <Quote size={16} className="opacity-50" />
                    </div>
                    <div className="flex mb-2">
                      {renderStars(testimonial.rating)}
                      <span className="text-xs ml-1 text-gray-500">{testimonial.date || "Recent"}</span>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm leading-relaxed flex-grow line-clamp-3">&quot;{testimonial.quote}&quot;</p>
                    <div className="flex items-center pt-2 mt-auto border-t border-gray-100">
                      <div className="bg-brand-navy/10 w-7 h-7 rounded-full flex items-center justify-center text-brand-navy font-bold text-xs mr-2">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-brand-navy text-xs">{testimonial.name}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <MapPin size={8} className="mr-1" />
                          {testimonial.location}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="outline" className="text-[10px] h-5 bg-green-50 text-green-700 border-green-200">Verified</Badge>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:flex justify-center gap-2 mt-3">
              <CarouselPrevious className="relative static bg-brand-navy text-white hover:bg-brand-navy/80 h-7 w-7" />
              <CarouselNext className="relative static bg-brand-navy text-white hover:bg-brand-navy/80 h-7 w-7" />
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
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
