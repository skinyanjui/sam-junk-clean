
import PageLayout from '@/components/PageLayout';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-10 pb-16 bg-brand-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Uncle Sam Junk Removal</h1>
            <p className="text-lg md:text-xl opacity-90">
              Proudly serving the Tri-State area with patriotic pride and professional service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Story</h2>
              <p className="text-gray-700 mb-6">
                Uncle Sam Junk Removal was founded in 2025 by Samuel Kinyanjui, a U.S. Marine Corps veteran 
                with a passion for service and a vision to create a junk removal company that 
                embodied the American values of hard work, integrity, and community service.
              </p>
              <p className="text-gray-700 mb-6">
                After returning from overseas service, Samuel noticed how many people in the Tri-State 
                area struggled with removing unwanted items from their homes and businesses. 
                He started with just one truck and a commitment to provide reliable, honest service 
                to his neighbors.
              </p>
              <p className="text-gray-700">
                Today, Uncle Sam Junk Removal has grown into a trusted name in the community, 
                with a fleet of trucks and a dedicated team of professionals who share our 
                commitment to excellent service and environmental responsibility.
              </p>
            </div>
            <div className="order-first md:order-last">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Uncle Sam Junk Removal Founder" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-brand-gray">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Our Mission</h2>
            <p className="text-xl text-gray-700 mb-8">
              To provide our community with efficient, environmentally responsible junk removal 
              services that make their lives easier and their spaces cleaner. We strive to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-brand-navy mb-4">Serve</h3>
                <p className="text-gray-600">
                  Provide exceptional service that exceeds our customers' expectations every time.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-brand-navy mb-4">Recycle</h3>
                <p className="text-gray-600">
                  Minimize landfill waste by recycling, donating, and properly disposing of items.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-brand-navy mb-4">Support</h3>
                <p className="text-gray-600">
                  Give back to our community through charitable initiatives and veteran support programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Why Choose Uncle Sam?</h2>
              <div className="grid gap-4">
                {[
                  'Veteran-owned and operated business',
                  'Licensed and fully insured for your protection',
                  'Experienced team of trained professionals',
                  'Eco-friendly disposal practices',
                  'Transparent, upfront pricing with no hidden fees',
                  'Flexible scheduling including same-day service',
                  'We donate and recycle whenever possible',
                  '100% satisfaction guarantee',
                  'Proudly serving the entire Tri-State area'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="text-brand-red mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button 
                  asChild 
                  className="bg-brand-red hover:bg-opacity-90"
                >
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
              </div>
            </div>
            <div>
              <img 
                src="/lovable-uploads/acf3ac1c-8d3b-4125-896d-7a7416fab53a.png" 
                alt="Uncle Sam Junk Removal" 
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-lg opacity-90">
              At Uncle Sam Junk Removal, we operate by a set of core values that define who we are and how we do business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-brand-red">Integrity</h3>
              <p className="text-white/90">
                We believe in honesty and transparency in all our dealings. What we quote is what you pay.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-brand-red">Respect</h3>
              <p className="text-white/90">
                We respect your property, time, and specific needs. We treat every job with professionalism.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-brand-red">Responsibility</h3>
              <p className="text-white/90">
                We take environmental responsibility seriously by recycling and donating items whenever possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Ready to Experience the Uncle Sam Difference?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Contact us today for a free, no-obligation quote for all your junk removal needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-brand-red hover:bg-opacity-90"
              >
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
