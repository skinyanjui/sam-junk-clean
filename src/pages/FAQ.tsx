import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  // FAQ data categorized
  const faqData = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What areas do you service?",
          answer: "We proudly serve the entire Tri-State area including Evansville, Henderson, Newburgh, Owensboro, Princeton, Boonville, Vincennes, Madisonville, Mt. Carmel, Carmi, Fairfield, and Grayville."
        },
        {
          question: "Are you licensed and insured?",
          answer: "Yes, Uncle Sam Junk Removal is fully licensed and insured for your protection and peace of mind."
        },
        {
          question: "Do I need to be home during the junk removal?",
          answer: "Yes, we require that someone 18 years or older is present at the service location during the appointment to confirm the items to be removed and for payment."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          question: "How much does junk removal cost?",
          answer: "Our pricing is based on the volume of materials removed. We provide free, no-obligation estimates before any work begins. Each truck load is priced based on how much space your items take up in our truck."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, all major credit cards, and checks. Payment is due upon completion of service."
        },
        {
          question: "Do you offer discounts?",
          answer: "Yes, we offer discounts for seniors, veterans, and first responders. Please let us know if you qualify when scheduling your appointment."
        }
      ]
    },
    {
      category: "Services & Procedures",
      questions: [
        {
          question: "What items do you not accept?",
          answer: "We cannot accept hazardous materials (paint, chemicals, oil, etc.), asbestos, medical waste, and certain electronics depending on local regulations. If you're unsure about specific items, please ask us before your appointment."
        },
        {
          question: "How far in advance should I schedule a pickup?",
          answer: "While we offer same-day service when available, we recommend scheduling 1-2 days in advance to ensure you get your preferred time slot. For larger jobs, scheduling 3-5 days ahead is ideal."
        },
        {
          question: "Do you offer recurring junk removal services?",
          answer: "Yes, we offer recurring services for businesses and construction sites that need regular junk removal. Contact us for special pricing on recurring services."
        }
      ]
    },
    {
      category: "Environment & Disposal",
      questions: [
        {
          question: "What happens to the junk you collect?",
          answer: "We recycle and donate as much as possible. Items in good condition are donated to local charities. Recyclable materials are taken to appropriate recycling facilities. Only items that cannot be recycled or donated are taken to the landfill."
        },
        {
          question: "Do you offer recycling services?",
          answer: "Yes, we prioritize recycling whenever possible as part of our commitment to environmental sustainability. We separate recyclable materials from general waste."
        },
        {
          question: "Can you provide documentation of proper disposal?",
          answer: "Yes, for commercial clients or special disposal needs, we can provide documentation of proper disposal upon request."
        }
      ]
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Frequently Asked Questions | Uncle Sam Junk Removal"
        description="Find answers to common questions about our junk removal services, pricing, accepted items, and more. Uncle Sam Junk Removal serves the Tri-State area."
        keywords="junk removal FAQ, Tri-State junk removal questions, Uncle Sam Junk Removal services, junk removal pricing, hazardous waste disposal, furniture removal FAQ"
      />

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle size={48} className="mx-auto mb-4 text-brand-red" />
              <h1 className="text-4xl font-bold text-brand-navy mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-600">
                Find answers to the most common questions about our junk removal services. 
                Can't find what you're looking for? <Link to="/contact" className="text-brand-red hover:underline">Contact us</Link>.
              </p>
            </div>

            {faqData.map((category, index) => (
              <div key={index} className="mb-10">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">{category.category}</h2>
                <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                      <AccordionTrigger className="px-6 hover:bg-brand-gray hover:no-underline text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-brand-navy text-white p-8 rounded-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Still have questions?</h2>
            <p className="text-center mb-6">
              Our team is here to help with any questions you may have about our junk removal services.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/contact" 
                className="bg-brand-red hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQ;
