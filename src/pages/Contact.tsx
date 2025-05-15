
import PageLayout from '@/components/PageLayout';
import ContactHero from '@/components/contact/ContactHero';
import ContactInformation from '@/components/contact/ContactInformation';
import ContactForm from '@/components/contact/ContactForm';
import ServiceAreaMap from '@/components/contact/ServiceAreaMap';
import ContactFaqs from '@/components/contact/ContactFaqs';
import SEO from '@/components/SEO';

const Contact = () => {
  // Define schema for Contact page
  const contactSchemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Uncle Sam Junk Removal",
    "description": "Get in touch with our team for all your junk removal needs. Quick responses and exceptional service guaranteed.",
    "url": "https://unclesamjunkremoval.com/contact",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://unclesamjunkremoval.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://unclesamjunkremoval.com/contact"
        }
      ]
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Uncle Sam Junk Removal",
      "telephone": "+18126101657",
      "email": "info@unclesamjunkremoval.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Evansville",
        "addressRegion": "IN",
        "addressCountry": "US"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "07:00",
          "closes": "19:00"
        }
      ]
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Contact Us | Uncle Sam Junk Removal"
        description="Contact Uncle Sam Junk Removal for fast, reliable junk removal services. Quick responses and exceptional service throughout the Tri-State area."
        keywords="contact junk removal, junk removal phone number, Evansville junk removal contact, Henderson junk removal contact"
        structuredData={contactSchemaData}
      />
      
      <ContactHero />

      {/* Contact Information & Form */}
      <section className="py-20 bg-white" aria-labelledby="contact-section-heading">
        <div className="container-custom">
          <h2 id="contact-section-heading" className="sr-only">Contact Information and Form</h2>
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
