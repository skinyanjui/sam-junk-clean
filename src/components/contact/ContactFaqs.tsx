
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactFaqs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-8">
            Quick answers to common questions about our junk removal services. 
            <Link to="/faq" className="text-brand-red hover:underline ml-1">
              View all FAQs
            </Link>
          </p>
          
          <div className="space-y-6">
            <div className="glass-card p-8 hover-lift">
              <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                How much does junk removal cost?
              </h3>
              <p className="text-gray-700 ml-8">
                Our pricing is based on the volume of materials removed. We provide free, no-obligation estimates before any work begins. Each truck load is priced based on how much space your items take up in our truck.
              </p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                Do you offer same-day service?
              </h3>
              <p className="text-gray-700 ml-8">
                Yes! We often have same-day availability. Contact us early in the day for the best chance of same-day service. For guaranteed time slots, we recommend booking 1-2 days in advance.
              </p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                What items won't you take?
              </h3>
              <p className="text-gray-700 ml-8">
                We cannot accept hazardous materials like paint, chemicals, oil, or asbestos. We also have restrictions on certain electronics and medical waste. Please contact us if you're unsure about specific items.
              </p>
            </div>
            
            <div className="glass-card p-8 hover-lift">
              <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                How do you dispose of the junk?
              </h3>
              <p className="text-gray-700 ml-8">
                We prioritize recycling and donation over landfill disposal. Approximately 60% of what we collect is recycled or donated to local charities. We're committed to environmentally responsible disposal practices.
              </p>
            </div>

            <div className="glass-card p-8 hover-lift">
              <h3 className="text-xl font-bold text-brand-navy mb-3 flex items-center">
                <CheckCircle className="text-brand-red mr-3 flex-shrink-0" size={20} />
                Do I need to be home during pickup?
              </h3>
              <p className="text-gray-700 ml-8">
                Yes, we require that someone 18 years or older is present at the service location during the appointment to confirm the items to be removed and for payment.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/faq" className="inline-flex items-center text-brand-red hover:underline">
              View all frequently asked questions
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFaqs;
