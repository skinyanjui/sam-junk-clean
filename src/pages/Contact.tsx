
import PageLayout from '@/components/PageLayout';
import ContactHero from '@/components/contact/ContactHero';
import ContactInformation from '@/components/contact/ContactInformation';
import ContactForm from '@/components/contact/ContactForm';
import ServiceAreaMap from '@/components/contact/ServiceAreaMap';
import ContactFaqs from '@/components/contact/ContactFaqs';
import SEO from '@/components/SEO';
import { siteConfig } from '@/config/siteConfig'; // Import siteConfig

const Contact = () => {
  // Define schema for Contact page - enhanced for local SEO
  const contactSchemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contact ${siteConfig.businessName}`,
    "description": `Get in touch with ${siteConfig.businessName} for quotes, questions, or to schedule service in ${siteConfig.address.addressLocality} and the Tri-State area.`,
    "url": `${siteConfig.siteUrl}/contact`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": `${siteConfig.siteUrl}/contact`
        }
      ]
    },
    "mainEntity": {
      "@type": "Organization",
      "name": siteConfig.businessName,
      "telephone": siteConfig.telephone,
      "email": siteConfig.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.address.streetAddress,
        "addressLocality": siteConfig.address.addressLocality,
        "addressRegion": siteConfig.address.addressRegion,
        "postalCode": siteConfig.address.postalCode,
        "addressCountry": siteConfig.address.addressCountry
      },
      "openingHoursSpecification": siteConfig.openingHoursSpecification,
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": siteConfig.telephone,
          "contactType": "Customer Service", // More generic
          "availableLanguage": ["English"], // Example
          "areaServed": [siteConfig.address.addressLocality, "Surrounding Tri-State Area"] // Example
        }
      ],
      "sameAs": siteConfig.sameAs
    }
  };

  return (
    <PageLayout>
      <SEO 
        title={`Contact Us | ${siteConfig.businessName}`}
        description={`Get in touch with ${siteConfig.businessName} for quotes, questions, or to schedule service in ${siteConfig.address.addressLocality} and the Tri-State area.`}
        keywords={`contact junk removal, ${siteConfig.address.addressLocality} junk removal contact, junk removal phone number, junk removal email, ${siteConfig.businessName} contact`}
        structuredData={contactSchemaData} // Passed as a single object, SEO component handles it
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
