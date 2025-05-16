
import { Link } from 'react-router-dom';

const PricingResources = () => {
  return (
    <section className="py-16 bg-white" aria-labelledby="pricing-resources-heading">
      <div className="container-custom">
        <h2 id="pricing-resources-heading" className="section-title text-center mb-8">Learn More About Our Pricing</h2>
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
  );
};

export default PricingResources;
