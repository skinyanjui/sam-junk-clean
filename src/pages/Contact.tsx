
import PageLayout from '@/components/PageLayout';
import ContactHero from '@/components/contact/ContactHero';
import ContactInformation from '@/components/contact/ContactInformation';
import ContactForm from '@/components/contact/ContactForm';
import ServiceAreaMap from '@/components/contact/ServiceAreaMap';
import ContactFaqs from '@/components/contact/ContactFaqs';

const Contact = () => {
  return (
    <PageLayout>
      <ContactHero />

      {/* Contact Information & Form */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <ContactInformation />
            
            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Location Map */}
      <ServiceAreaMap />

      {/* FAQs Section */}
      <ContactFaqs />
    </PageLayout>
  );
};

export default Contact;
