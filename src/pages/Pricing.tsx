
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Upload, Phone } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import TruckVisualizer from '@/components/pricing/TruckVisualizer';
import SEO from '@/components/SEO';

const Pricing = () => {
  const pricingTiers = [
    {
      size: 'Minimum Pickup',
      price: '$75–$100',
      description: 'Single item or small curbside haul',
      fillLevel: '10%'
    },
    {
      size: '¼ Truck Load',
      price: '$100–$175',
      description: 'Small furniture/appliances',
      fillLevel: '25%'
    },
    {
      size: '½ Truck Load',
      price: '$175–$300',
      description: 'Bedroom or small office cleanout',
      fillLevel: '50%'
    },
    {
      size: '¾ Truck Load',
      price: '$300–$450',
      description: 'Full apartment or garage cleanup',
      fillLevel: '75%'
    },
    {
      size: 'Full Truck Load',
      price: '$450–$600+',
      description: 'Large cleanouts, multiple rooms',
      fillLevel: '100%'
    }
  ];

  const addOnServices = [
    { service: 'Mattress or Box Spring', fee: '+$25 each' },
    { service: 'TV or Electronics', fee: '+$30–$50' },
    { service: 'Appliance Removal', fee: '+$40–$75' },
    { service: 'Light Demolition', fee: 'Custom quote' },
    { service: 'Same-Day or After-Hours', fee: '+$50 premium' }
  ];

  const includedServices = [
    'Hauling',
    'Loading & lifting',
    'Basic sweep-up',
    'Donation drop-offs when applicable',
    'Disposal fees'
  ];

  return (
    <PageLayout>
      <SEO 
        title="Pricing | Uncle Sam Junk Removal"
        description="Simple, transparent pricing for junk removal services. See our volume-based pricing structure with no hidden fees."
        keywords="junk removal pricing, waste disposal costs, furniture removal price, Evansville junk removal pricing, Uncle Sam Junk Removal rates"
      />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-brand-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Honest Pricing – No Surprises</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              We believe in transparent, upfront pricing. Our estimates are based on volume, 
              type of material, and accessibility. Below is a breakdown to help you plan ahead.
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
                <Link to="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
      </section>

      {/* Pricing Table Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-8">Volume-Based Pricing</h2>
            
            {/* Pricing Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-12">
              <Table>
                <TableHeader>
                  <TableRow className="bg-brand-gray">
                    <TableHead className="font-bold">Load Size</TableHead>
                    <TableHead className="font-bold">Price Range</TableHead>
                    <TableHead className="font-bold">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingTiers.map((tier) => (
                    <TableRow key={tier.size} className="hover:bg-brand-gray/30">
                      <TableCell className="font-medium">{tier.size}</TableCell>
                      <TableCell className="font-semibold text-brand-navy">{tier.price}</TableCell>
                      <TableCell>{tier.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Truck Visualization */}
            <TruckVisualizer pricingTiers={pricingTiers} />
          </div>
        </div>
      </section>

      {/* Additional Pricing Sections */}
      <section className="py-16 bg-brand-gray">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Add-On Services */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">Add-On Services</h2>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-brand-gray/50">
                      <TableHead className="font-bold">Service</TableHead>
                      <TableHead className="font-bold">Add-on Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {addOnServices.map((service, index) => (
                      <TableRow key={index} className="hover:bg-brand-gray/30">
                        <TableCell>{service.service}</TableCell>
                        <TableCell className="font-semibold text-brand-navy">{service.fee}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* What's Included */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">What's Included</h2>
                <ul className="space-y-4">
                  {includedServices.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-brand-red mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <p className="text-gray-700 mb-3">
                    Our pricing includes not just removal, but proper disposal to landfills, 
                    recycling facilities, or donation centers as appropriate.
                  </p>
                  <Link 
                    to="/services" 
                    className="inline-flex items-center text-brand-red font-medium hover:underline"
                  >
                    Learn more about our services <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Learn More About Our Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
              <img src="https://images.unsplash.com/photo-1517022812141-23620dba5c23" className="w-full h-48 object-cover" alt="Pricing guide" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-brand-navy mb-2">Understanding Volume-Based Pricing</h3>
                <p className="text-gray-600 mb-3">Learn how junk removal companies determine pricing based on the volume of waste.</p>
                <Link to="/blog/volume-based-pricing" className="text-brand-red font-medium hover:underline">Read More</Link>
              </div>
            </div>
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
              <img src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3" className="w-full h-48 object-cover" alt="Decluttering tips" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-brand-navy mb-2">8 Ways to Save on Your Next Junk Removal</h3>
                <p className="text-gray-600 mb-3">Simple tips to help you maximize value and minimize costs on your next junk removal project.</p>
                <Link to="/blog/save-on-junk-removal" className="text-brand-red font-medium hover:underline">Read More</Link>
              </div>
            </div>
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
              <img src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b" className="w-full h-48 object-cover" alt="Eco-friendly junk removal" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-brand-navy mb-2">The Hidden Costs of DIY Junk Removal</h3>
                <p className="text-gray-600 mb-3">Why professional junk removal services might actually save you money in the long run.</p>
                <Link to="/blog/hidden-costs-diy" className="text-brand-red font-medium hover:underline">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-navy">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Not sure what size you need?</h2>
            <p className="text-white/90 text-lg mb-8">
              Upload a photo or call (800) 555-1234 — we'll give you a fast, free estimate!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-brand-red hover:bg-opacity-90 gap-2"
              >
                <Link to="/quote">
                  <Upload size={20} />
                  Upload Photo + Get Instant Estimate
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-navy gap-2"
              >
                <a href="tel:+18005551234">
                  <Phone size={20} />
                  Call (800) 555-1234
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Pricing;
