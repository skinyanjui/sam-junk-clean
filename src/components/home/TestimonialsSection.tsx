
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

type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating: number;
};

const TestimonialsSection = () => {
  const { isMobile, isLandscapeMobile } = useResponsiveLayout();
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Evansville, IN',
      quote: 'Uncle Sam\'s team cleared out my mom\'s entire basement in just hours. They were respectful, efficient and even swept up afterward!',
      rating: 5
    },
    {
      name: 'Mike Reynolds',
      location: 'Henderson, KY',
      quote: 'After our office remodel, they handled all our old furniture and fixtures. The crew was professional and recycled everything possible.',
      rating: 5
    },
    {
      name: 'Jennifer Williams',
      location: 'Newburgh, IN',
      quote: 'Called at 9am, they were at my house by 2pm the same day! No hidden fees, just straightforward service at a fair price.',
      rating: 5
    },
    {
      name: 'Robert Douglas',
      location: 'Owensboro, KY',
      quote: 'As a property manager, I\'ve worked with many junk removal services. Uncle Sam\'s is by far the most reliable and thorough.',
      rating: 5
    },
    {
      name: 'Amanda Carter',
      location: 'Boonville, IN',
      quote: 'When my father passed, they handled the estate cleanout with remarkable compassion and care. Can\'t recommend them enough.',
      rating: 5
    }
  ];
  
  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, i) => (
      <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
    ));
  };

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
                key={index} 
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
