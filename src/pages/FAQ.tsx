
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { HelpCircle, BookOpen, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  // FAQ data categorized
  const faqData = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What areas do you service?",
          answer: "We proudly serve the entire Tri-State area including Evansville, Henderson, Newburgh, Owensboro, Princeton, Boonville, Vincennes, Madisonville, Mt. Carmel, Carmi, Fairfield, and Grayville. Check our <a href='/locations' class='text-brand-red hover:underline'>Service Locations</a> page for more details."
        },
        {
          question: "Are you licensed and insured?",
          answer: "Yes, Uncle Sam Junk Removal is fully licensed and insured for your protection and peace of mind. We maintain comprehensive general liability insurance and workers' compensation for all our team members."
        },
        {
          question: "Do I need to be home during the junk removal?",
          answer: "Yes, we require that someone 18 years or older is present at the service location during the appointment to confirm the items to be removed and for payment."
        },
        {
          question: "How quickly can you come out for a job?",
          answer: "We offer same-day service when our schedule permits. For the best availability, we recommend booking 1-2 days in advance. Contact us early in the day for the best chance at same-day service."
        },
        {
          question: "What happens if I need to cancel or reschedule?",
          answer: "We understand that plans change. Please give us at least 24 hours' notice if you need to cancel or reschedule your appointment. Last-minute cancellations may incur a small fee."
        },
        {
          question: "Do you offer weekend service?",
          answer: "Yes, we provide service Monday through Saturday from 7 AM to 7 PM. Sunday appointments are available for commercial clients or large projects by special arrangement."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          question: "How much does junk removal cost?",
          answer: "Our pricing is based on the volume of materials removed. We provide free, no-obligation estimates before any work begins. Each truck load is priced based on how much space your items take up in our truck. Visit our <a href='/pricing' class='text-brand-red hover:underline'>Pricing</a> page for more details."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, all major credit cards, and checks. Payment is due upon completion of service. For commercial clients, we also offer invoicing options with pre-approval."
        },
        {
          question: "Do you offer discounts?",
          answer: "Yes, we offer discounts for seniors, veterans, and first responders. Please let us know if you qualify when scheduling your appointment. We also provide special rates for recurring service and multi-truck loads."
        },
        {
          question: "Is there a minimum charge for junk removal?",
          answer: "Yes, we have a minimum service fee that covers our travel costs and initial labor. This minimum varies slightly by location. Even for very small jobs, the minimum fee applies."
        },
        {
          question: "Do you offer free estimates?",
          answer: "Yes! All of our estimates are completely free and no-obligation. We can provide estimates over the phone, via email with photos, or in person for more complex jobs."
        },
        {
          question: "Are there any hidden fees or surcharges?",
          answer: "No, we pride ourselves on transparent pricing. The quote we provide is the price you'll pay, with no hidden fees or last-minute surcharges. Certain specialty items like electronics, appliances, or mattresses may have an additional disposal fee which will be clearly communicated upfront."
        }
      ]
    },
    {
      category: "Services & Procedures",
      questions: [
        {
          question: "What items do you not accept?",
          answer: "We cannot accept hazardous materials (paint, chemicals, oil, etc.), asbestos, medical waste, and certain electronics depending on local regulations. If you're unsure about specific items, please ask us before your appointment. See our <a href='/services' class='text-brand-red hover:underline'>Services</a> page for more information about what we do accept."
        },
        {
          question: "How far in advance should I schedule a pickup?",
          answer: "While we offer same-day service when available, we recommend scheduling 1-2 days in advance to ensure you get your preferred time slot. For larger jobs, scheduling 3-5 days ahead is ideal. You can <a href='/quote' class='text-brand-red hover:underline'>request a quote</a> at any time."
        },
        {
          question: "Do you offer recurring junk removal services?",
          answer: "Yes, we offer recurring services for businesses and construction sites that need regular junk removal. Contact us for special pricing on recurring services."
        },
        {
          question: "How do I prepare for your arrival?",
          answer: "You don't need to do much preparation. If possible, try to group items together that you want removed. For outdoor items, ensuring clear access is helpful. Our team will do all the heavy lifting and loading."
        },
        {
          question: "Can you remove items from upstairs or the basement?",
          answer: "Absolutely! Our team is trained to remove items from any location in your home or business, including upstairs, basements, attics, garages, and backyards. There's no need for you to move items to the curb."
        },
        {
          question: "Do you clean up after removing the junk?",
          answer: "Yes, we always sweep up and clean the area where junk was removed. We take pride in leaving your space cleaner than we found it."
        },
        {
          question: "What size truck do you use?",
          answer: "Our standard junk removal trucks can hold approximately 15 cubic yards of material, which is equivalent to about 4-5 pickup truck loads. We also have smaller vehicles available for more limited access situations."
        }
      ]
    },
    {
      category: "Environment & Disposal",
      questions: [
        {
          question: "What happens to the junk you collect?",
          answer: "We recycle and donate as much as possible. Items in good condition are donated to local charities. Recyclable materials are taken to appropriate recycling facilities. Only items that cannot be recycled or donated are taken to the landfill. Learn more about our environmental practices on our <a href='/about#environment' class='text-brand-red hover:underline'>About</a> page."
        },
        {
          question: "Do you offer recycling services?",
          answer: "Yes, we prioritize recycling whenever possible as part of our commitment to environmental sustainability. We separate recyclable materials from general waste. Read more about our <a href='/services#recycling' class='text-brand-red hover:underline'>recycling services</a>."
        },
        {
          question: "Can you provide documentation of proper disposal?",
          answer: "Yes, for commercial clients or special disposal needs, we can provide documentation of proper disposal upon request."
        },
        {
          question: "Where do donated items go?",
          answer: "We partner with several local charities including Habitat for Humanity ReStore, Goodwill, and the Salvation Army. We select the most appropriate charity based on the type of items and their current needs."
        },
        {
          question: "How do you handle electronics recycling?",
          answer: "Electronics are taken to certified e-waste recycling centers that safely process components and properly dispose of hazardous materials. We ensure all data-containing devices are handled securely."
        }
      ]
    },
    {
      category: "Commercial & Special Services",
      questions: [
        {
          question: "Do you offer services for businesses?",
          answer: "Yes, we provide commercial junk removal services for businesses of all sizes. We can work with your schedule to minimize disruption to your operations, including after-hours and weekend service."
        },
        {
          question: "Can you handle construction debris?",
          answer: "Absolutely! We regularly remove construction and renovation debris. For ongoing projects, we can provide dumpsters or scheduled pickups to keep your site clean and safe."
        },
        {
          question: "Do you offer estate cleanout services?",
          answer: "Yes, we specialize in compassionate estate cleanouts. Our team will carefully sort through items, identifying valuables and items for donation while respectfully disposing of the rest."
        },
        {
          question: "Can you handle foreclosure or eviction cleanouts?",
          answer: "Yes, we work with real estate agents, property managers, and banks on foreclosure cleanouts. We can quickly clear properties to get them ready for sale or new tenants."
        },
        {
          question: "Do you remove yard waste?",
          answer: "Yes, we remove yard waste including branches, leaves, soil, rocks, and more. We do not provide lawn mowing or landscaping services, but we can remove all the debris from these activities."
        }
      ]
    }
  ];

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Filter questions based on search query
  const filterFAQs = () => {
    if (!searchQuery.trim()) return faqData;
    
    return faqData.map(category => {
      const filteredQuestions = category.questions.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      return {
        ...category,
        questions: filteredQuestions
      };
    }).filter(category => category.questions.length > 0);
  };

  const filteredFAQs = filterFAQs();
  
  const renderAnswer = (answer: string) => {
    return { __html: answer };
  };

  return (
    <PageLayout>
      <SEO 
        title="Frequently Asked Questions | Uncle Sam Junk Removal"
        description="Find answers to common questions about our junk removal services, pricing, accepted items, disposal practices, and more. Uncle Sam Junk Removal serves the Tri-State area with professional junk removal services."
        keywords="junk removal FAQ, Tri-State junk removal questions, Uncle Sam Junk Removal services, junk removal pricing, hazardous waste disposal, furniture removal FAQ, commercial junk removal, construction debris removal"
      />

      <section className="py-16" aria-labelledby="faq-heading">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle size={48} className="mx-auto mb-4 text-brand-red" />
              <h1 id="faq-heading" className="text-4xl font-bold text-brand-navy mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-600 mb-8">
                Find answers to the most common questions about our junk removal services. 
                Can't find what you're looking for? <Link to="/contact" className="text-brand-red hover:underline">Contact us</Link>.
              </p>
              
              {/* Search box */}
              <div className="relative max-w-lg mx-auto mb-10">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 border-gray-300 focus:border-brand-red focus:ring-brand-red rounded-lg"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear
                  </Button>
                )}
              </div>
              
              {/* Quick links section */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/services" className="text-brand-navy hover:text-brand-red transition-colors">
                  Services
                </Link>
                <span className="text-gray-400">•</span>
                <Link to="/pricing" className="text-brand-navy hover:text-brand-red transition-colors">
                  Pricing
                </Link>
                <span className="text-gray-400">•</span>
                <Link to="/quote" className="text-brand-navy hover:text-brand-red transition-colors">
                  Get a Quote
                </Link>
                <span className="text-gray-400">•</span>
                <Link to="/blog" className="text-brand-navy hover:text-brand-red transition-colors">
                  Blog
                </Link>
              </div>
            </div>

            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No questions found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  We couldn't find any questions matching "{searchQuery}". 
                  Try using different keywords or browse all categories.
                </p>
                <Button 
                  onClick={() => setSearchQuery('')}
                  className="bg-brand-red hover:bg-brand-red/90 text-white"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              filteredFAQs.map((category, index) => (
                <Collapsible
                  key={index}
                  open={expandedCategories.includes(category.category)}
                  onOpenChange={() => toggleCategory(category.category)}
                  className="mb-8"
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex justify-between items-center bg-brand-gray px-6 py-4 rounded-lg cursor-pointer shadow-sm hover:bg-brand-gray/80 transition-colors">
                      <h2 id={`faq-category-${index}`} className="text-2xl font-bold text-brand-navy">
                        {category.category} <span className="text-brand-red">({category.questions.length})</span>
                      </h2>
                      <ChevronDown 
                        size={24} 
                        className={`text-brand-navy transition-transform ${expandedCategories.includes(category.category) ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm mt-2">
                      {category.questions.map((item, qIndex) => (
                        <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                          <AccordionTrigger className="px-6 hover:bg-brand-gray hover:no-underline text-left">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 text-gray-600">
                            <div dangerouslySetInnerHTML={renderAnswer(item.answer)} />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CollapsibleContent>
                </Collapsible>
              ))
            )}
          </div>
          
          {/* Related resources section */}
          <div className="mt-16 mb-16 max-w-4xl mx-auto" aria-labelledby="related-resources-heading">
            <h2 id="related-resources-heading" className="text-2xl font-bold text-brand-navy mb-6 text-center">Related Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-brand-gray p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <BookOpen size={24} className="mr-3 text-brand-red" />
                  <h3 className="text-xl font-bold">Our Blog</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Check out our blog for helpful tips, guides, and insights on junk removal, decluttering, and sustainable disposal methods.
                </p>
                <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white" asChild>
                  <Link to="/blog">Read Articles</Link>
                </Button>
              </div>
              <div className="bg-brand-gray p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <HelpCircle size={24} className="mr-3 text-brand-red" />
                  <h3 className="text-xl font-bold">Need a Quote?</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Ready to get rid of your junk? Get a free, no-obligation quote for our professional junk removal services.
                </p>
                <Button className="bg-brand-red hover:bg-opacity-90 text-white" asChild>
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
              </div>
              <div className="bg-brand-gray p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <Search size={24} className="mr-3 text-brand-red" />
                  <h3 className="text-xl font-bold">Service Areas</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Find out if we service your area. We cover the entire Tri-State area with our junk removal services.
                </p>
                <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white" asChild>
                  <Link to="/locations">Check Coverage</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-brand-navy text-white p-8 rounded-lg max-w-4xl mx-auto" aria-labelledby="still-have-questions-heading">
            <h2 id="still-have-questions-heading" className="text-2xl font-bold mb-4 text-center">Still have questions?</h2>
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
