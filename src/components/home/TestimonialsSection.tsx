
import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { fetchTestimonials, type Testimonial } from '@/integrations/supabase/testimonialsService';
import { Skeleton } from '@/components/ui/skeleton';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data.slice(0, 6)); // Show top 6 testimonials
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-brand-gray">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-brand-gray" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">
            Customer Reviews
          </span>
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            What Our Customers Say
          </h2>
          <div className="w-20 h-1 bg-brand-red mx-auto mb-4"></div>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Over 2,500 satisfied customers across the Tri-State area trust us with their junk removal needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="bg-white hover:shadow-xl transition-shadow duration-300 shadow-lg"
            >
              <CardContent>
                <Quote className="h-8 w-8 text-brand-red mb-4" />
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-brand-navy">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    {testimonial.date && (
                      <div className="text-xs text-gray-400">{testimonial.date}</div>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Review Summary */}
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="flex space-x-1">
              {renderStars(5)}
            </div>
            <span className="text-2xl font-bold text-brand-navy">4.9/5</span>
          </div>
          <p className="text-gray-600 mb-4">
            Based on 247+ verified customer reviews across Google, Yelp, and Facebook
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>Google: 4.9★ (89 reviews)</span>
            <span>Yelp: 4.8★ (76 reviews)</span>
            <span>Facebook: 5.0★ (82 reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
