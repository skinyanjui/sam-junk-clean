
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

const Services = () => {
  const services = [
    {
      id: 'residential',
      title: 'Residential Junk Removal',
      description: 'Clear out your home, garage, yard, or entire property with our thorough residential junk removal services.',
      items: [
        'Home cleanouts and decluttering',
        'Garage and basement junk removal',
        'Yard debris and waste cleanup',
        'Furniture and appliance removal',
        'Moving debris cleanup',
        'Hoarding cleanup assistance'
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      relatedBlogs: [
        {
          title: "The Ultimate Guide to Decluttering Your Garage",
          slug: "ultimate-guide-decluttering-garage"
        },
        {
          title: "10 Items You Should Never Throw in the Trash",
          slug: "10-items-never-throw-in-trash"
        }
      ],
      relatedServices: ["appliance-removal", "estate-cleanouts"]
    },
    {
      id: 'commercial',
      title: 'Commercial Junk Removal',
      description: 'Keep your business space clean and professional with our efficient commercial junk removal services.',
      items: [
        'Office cleanouts and relocations',
        'Retail space renovation debris',
        'Construction waste removal',
        'Office furniture and equipment disposal',
        'Commercial property cleanups',
        'Warehouse and storage space clearing'
      ],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      relatedBlogs: [
        {
          title: "How Junk Removal Services Are Becoming More Eco-Friendly",
          slug: "eco-friendly-junk-removal"
        }
      ],
      relatedServices: ["light-demolition"]
    },
    {
      id: 'appliance-removal',
      title: 'Appliance Removal',
      description: 'We safely remove and dispose of old appliances from your home or business.',
      items: [
        'Refrigerators and freezers',
        'Washers and dryers',
        'Stoves and ovens',
        'Dishwashers',
        'Air conditioners and HVAC units',
        'Water heaters'
      ],
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5',
      relatedBlogs: [
        {
          title: "10 Items You Should Never Throw in the Trash",
          slug: "10-items-never-throw-in-trash"
        }
      ],
      relatedServices: ["residential", "commercial"]
    },
    {
      id: 'light-demolition',
      title: 'Light Demolition',
      description: 'Our team handles small demolition projects quickly and safely.',
      items: [
        'Shed and deck removal',
        'Fence demolition',
        'Interior wall removal',
        'Kitchen and bathroom demo',
        'Concrete patio removal',
        'Small structure teardowns'
      ],
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
      relatedBlogs: [
        {
          title: "Preparing for a Home Renovation? Here's How to Handle the Debris",
          slug: "handle-renovation-debris"
        }
      ],
      relatedServices: ["commercial"]
    },
    {
      id: 'estate-cleanouts',
      title: 'Estate Cleanouts',
      description: 'Get compassionate, thorough help clearing out an entire estate.',
      items: [
        'Complete property clearance',
        'Donation coordination for valuable items',
        'Respectful and efficient service',
        'Proper disposal of all materials',
        'Documentation for estate purposes',
        'Final property sweep and cleaning'
      ],
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
      relatedBlogs: [],
      relatedServices: ["residential", "appliance-removal"]
    },
    {
      id: 'curbside-pickups',
      title: 'Curbside Pickups',
      description: 'Set your items out and we\'ll take care of the rest with our convenient curbside pickup service.',
      items: [
        'Quick and easy removal',
        'No heavy lifting required on your part',
        'Same-day service often available',
        'Perfect for smaller loads',
        'Scheduled pickups available',
        'Contact-free service options'
      ],
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      relatedBlogs: [],
      relatedServices: ["residential"]
    }
  ];

  const getServiceById = (id: string) => {
    return services.find(service => service.id === id);
  };

  return (
    <PageLayout>
      <SEO
        title="Our Services | Uncle Sam Junk Removal"
        description="From residential junk removal to commercial cleanouts, our professional team handles all your junk removal needs in the Tri-State area."
        keywords="junk removal services, residential cleanouts, commercial junk removal, appliance removal, furniture disposal, estate cleanouts, Evansville junk services"
      />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-brand-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              From residential cleanouts to commercial junk removal, Uncle Sam wants YOU to live clutter-free!
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-brand-red hover:bg-opacity-90"
            >
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={service.id}
                id={service.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <h2 className="text-3xl font-bold text-brand-navy mb-4">{service.title}</h2>
                  <p className="text-gray-700 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="text-brand-red mr-3 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <Button 
                      asChild 
                      className="bg-brand-red hover:bg-opacity-90"
                    >
                      <Link to="/quote">Get a Quote</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                    >
                      <Link to="/pricing">View Pricing</Link>
                    </Button>
                  </div>
                  
                  {/* Related Services */}
                  {service.relatedServices && service.relatedServices.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-brand-navy mb-3">Related Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.relatedServices.map(relatedId => {
                          const relatedService = getServiceById(relatedId);
                          return relatedService ? (
                            <Button
                              key={relatedId}
                              asChild
                              variant="secondary"
                              size="sm"
                              className="bg-brand-gray/50"
                            >
                              <a href={`#${relatedId}`}>
                                {relatedService.title}
                              </a>
                            </Button>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Related Blog Posts */}
                  {service.relatedBlogs && service.relatedBlogs.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-brand-navy mb-3">Related Articles</h3>
                      <ul className="space-y-2">
                        {service.relatedBlogs.map((blog, i) => (
                          <li key={i}>
                            <Link 
                              to={`/blog/${blog.slug}`} 
                              className="text-brand-red flex items-center hover:underline"
                            >
                              <ArrowRight size={14} className="mr-2" />
                              {blog.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="rounded-lg shadow-lg w-full h-[300px] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-gray">
        <div className="container-custom">
          <div className="bg-brand-navy text-white p-8 md:p-12 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Service Not Listed?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              We handle many other types of junk removal situations. Contact us to discuss your specific needs and get a customized solution.
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
                className="border-white text-white hover:bg-white hover:text-brand-navy"
              >
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Areas Quick Link */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Service Areas</h2>
            <p className="text-gray-600 mb-6">
              Uncle Sam Junk Removal proudly serves the entire Tri-State area including Evansville, Henderson, Owensboro, and surrounding communities.
            </p>
            <Button asChild className="bg-brand-navy hover:bg-opacity-90">
              <Link to="/locations">View Our Service Areas</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
