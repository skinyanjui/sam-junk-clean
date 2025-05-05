
import { Star, MapPin } from 'lucide-react';

type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating: number;
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Evansville, IN',
      quote: 'Uncle Sam Junk Removal helped clear out my mom\'s garage. They were efficient, respectful, and reasonably priced.',
      rating: 5
    },
    {
      name: 'Mike Reynolds',
      location: 'Henderson, KY',
      quote: 'Used them for an office cleanout when we relocated. Great service and they recycled a lot of our old furniture.',
      rating: 5
    },
    {
      name: 'Jennifer Williams',
      location: 'Newburgh, IN',
      quote: 'Fast response for a same-day junk removal. They arrived on time and completed the job quickly.',
      rating: 5
    }
  ];
  
  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, i) => (
      <Star key={i} size={18} fill="#FFD700" color="#FFD700" />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom text-center mb-12">
        <h2 className="section-title">Customer Testimonials</h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-600">
          Don't just take our word for it. See what our satisfied customers have to say.
        </p>
      </div>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold text-brand-navy">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
