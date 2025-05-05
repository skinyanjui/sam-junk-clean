
import { CheckCircle } from 'lucide-react';

const ContactFaqs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="glass-card p-8 hover-lift">
              <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                How much does junk removal cost?
              </h3>
              <p className="text-gray-700 ml-8">
                Our pricing is based on the volume of materials removed. We provide free, no-obligation estimates before any work begins.
              </p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                Do you offer same-day service?
              </h3>
              <p className="text-gray-700 ml-8">
                Yes! We often have same-day availability. Contact us early in the day for the best chance of same-day service.
              </p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                What items won't you take?
              </h3>
              <p className="text-gray-700 ml-8">
                We cannot accept hazardous materials like paint, chemicals, oil, or asbestos. Please contact us if you're unsure about specific items.
              </p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                How do you dispose of the junk?
              </h3>
              <p className="text-gray-700 ml-8">
                We prioritize recycling and donation over landfill disposal. Approximately 60% of what we collect is recycled or donated to local charities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFaqs;
