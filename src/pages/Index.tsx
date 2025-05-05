
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, MapPin } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';

const Index = () => {
  const services = [
    {
      title: 'Residential',
      icon: 'home',
      description: 'Home cleanouts, garage junk, and household item removal'
    },
    {
      title: 'Commercial',
      icon: 'building',
      description: 'Office cleanouts, retail space, and business junk removal'
    },
    {
      title: 'Appliance Removal',
      icon: 'refrigerator',
      description: 'Fridges, washers, dryers, and other large appliances'
    },
    {
      title: 'Light Demolition',
      icon: 'hammer',
      description: 'Sheds, decks, fences, and interior demolition'
    },
    {
      title: 'Estate Cleanouts',
      icon: 'home-heart',
      description: 'Complete property clearance and junk removal'
    },
    {
      title: 'Curbside Pickups',
      icon: 'truck',
      description: 'Quick and easy removal of items from your curb'
    }
  ];
  
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
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white pt-12 pb-20">
        <div className="container-custom grid md:grid-cols-2 gap-8 items-center">
          <div className="z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Uncle Sam Wants YOU... <br className="hidden sm:block" />
              <span className="text-brand-red">to Live Junk-Free!</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Professional junk removal services in the Tri-State area. 
              We handle the heavy lifting so you don't have to!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-brand-red hover:bg-opacity-90 text-white font-bold text-lg"
              >
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-brand-navy font-medium text-lg"
              >
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <img
              src="/lovable-uploads/acf3ac1c-8d3b-4125-896d-7a7416fab53a.png"
              alt="Uncle Sam Junk Removal"
              className="w-full max-w-md mx-auto animate-fade-in"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            From residential cleanouts to commercial junk removal, we handle it all with patriotic pride and professional service.
          </p>
        </div>
        
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-brand-gray p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                {/* Icon would go here */}
                <h3 className="text-xl font-bold text-brand-navy mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  to={`/services#${service.title.toLowerCase().replace(' ', '-')}`}
                  className="inline-flex items-center text-brand-red font-medium hover:underline"
                >
                  Learn more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              asChild 
              className="bg-brand-navy hover:bg-opacity-90"
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-gray">
        <div className="container-custom">
          <div className="bg-brand-navy text-white p-8 md:p-12 rounded-xl shadow-lg">
            <div className="md:flex md:justify-between md:items-center">
              <div className="mb-6 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Clear the Clutter?</h2>
                <p className="text-white/90 text-lg">
                  Contact us today for a free, no-obligation quote. We'll handle the mess so you don't have to.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  className="bg-brand-red hover:bg-opacity-90 text-white"
                >
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-brand-navy"
                >
                  <a href="tel:+18005551234">Call (800) 555-1234</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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

      {/* Why Choose Us */}
      <section className="py-16 bg-brand-gray">
        <div className="container-custom">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="section-title">Why Choose Uncle Sam?</h2>
              <ul className="space-y-4">
                {[
                  'Veteran-owned and operated business',
                  'Fast and reliable service - often same-day',
                  'Eco-friendly disposal and recycling practices',
                  'Licensed and fully insured for your protection',
                  'Fair, transparent pricing - no hidden fees',
                  'Serving the entire Tri-State area'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-brand-red mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                asChild 
                className="mt-8 bg-brand-red hover:bg-opacity-90"
              >
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              {/* Placeholder for service area map */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-brand-navy mb-4">Our Service Area</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map of Tri-State Area</p>
                  <p className="text-sm">Evansville, Newburgh, Henderson, Owensboro, Mt. Carmel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
