
import SEO from '@/components/SEO';

const ContactHero = () => {
  return (
    <>
      <SEO
        title="Contact Us | Uncle Sam Junk Removal"
        description="Get in touch with our team for all your junk removal needs. Quick responses and exceptional service guaranteed."
      />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-brand-navy to-brand-navy/90 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
              Have questions or need a quote? Our team is standing by to help you reclaim your space!
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'}}></div>
      </section>
    </>
  );
};

export default ContactHero;
