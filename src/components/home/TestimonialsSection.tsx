
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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom text-center mb-16 relative z-10">
        <span className="text-brand-red font-semibold uppercase tracking-wider mb-2 block">Happy Customers</span>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">Customer Testimonials</h2>
        <div className="w-20 h-1 bg-brand-red mx-auto mb-6"></div>
        <p className="text-lg max-w-3xl mx-auto text-gray-600">
          Don't just take our word for it. See what our satisfied customers have to say.
        </p>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed text-lg">"{testimonial.quote}"</p>
              <div className="flex items-center border-t border-gray-100 pt-4 mt-auto">
                <div className="bg-brand-navy/10 w-12 h-12 rounded-full flex items-center justify-center text-brand-navy font-bold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
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
