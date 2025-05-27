
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO'; // Import SEO
import { siteConfig } from '@/config/siteConfig'; // Import siteConfig

const Privacy = () => {
  const pageUrl = `${siteConfig.siteUrl}/privacy`;
  const lastUpdatedDate = "2025-05-27"; // From file content

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": pageUrl,
    "name": "Privacy Policy | Uncle Sam Junk Removal",
    "description": "Read the Privacy Policy for Uncle Sam Junk Removal to understand how we collect, use, and protect your personal information.",
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.businessName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`
      }
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "headline": "Privacy Policy",
    "description": "Details on how Uncle Sam Junk Removal handles user data, privacy, and information security.",
    "image": `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`, // Generic image
    "author": {
      "@type": "Organization",
      "name": siteConfig.businessName,
      "url": siteConfig.siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.businessName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`
      }
    },
    "datePublished": "2024-01-01T00:00:00Z", // Assuming an initial publish date
    "dateModified": lastUpdatedDate 
  };
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "name": "Privacy Policy",
        "item": pageUrl
      }
    ]
  };

  return (
    <PageLayout>
      <SEO
        title="Privacy Policy | Uncle Sam Junk Removal"
        description="Read the Privacy Policy for Uncle Sam Junk Removal to understand how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, user information, website privacy, junk removal privacy"
        structuredData={[webPageSchema, articleSchema, breadcrumbSchema]}
      />
      <section className="pt-24 pb-16" aria-labelledby="privacy-heading">
        <div className="container-custom max-w-4xl">
          <h1 id="privacy-heading" className="text-4xl font-bold text-brand-navy mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <p>
              Last updated: May 27, 2025
            </p>
            
            <h2 id="privacy-intro" className="text-2xl font-bold text-brand-navy mt-8 mb-4">Introduction</h2>
            <p>
              Uncle Sam Junk Removal ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            
            <h2 id="privacy-info-collected" className="text-2xl font-bold text-brand-navy mt-8 mb-4">Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we collect may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Personal Data: Personally identifiable information such as your name, email address, telephone number, and home address when you register on our site, submit a quote request, or contact us.</li>
              <li>Financial Data: Information related to payment methods if you make a payment for our services.</li>
              <li>Usage Data: Information about how you access and use our website and services.</li>
            </ul>
            
            <h2 id="privacy-info-usage" className="text-2xl font-bold text-brand-navy mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We may use the information we collect about you for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Communicate with you about products, services, offers, and promotions</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Disclosure of Your Information</h2>
            <p>
              We may share information we collect with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Service providers who perform services on our behalf</li>
              <li>Professional advisors such as lawyers, bankers, and insurers</li>
              <li>Government bodies when required by law</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information from unauthorized access and disclosure. However, no website or internet transmission is completely secure.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have rights regarding your personal information, such as the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your information</li>
              <li>Restrict or object to our processing of your information</li>
              <li>Data portability</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4">
              Uncle Sam Junk Removal<br />
              Email: info@unclesamjunkremoval.com<br />
              Phone: +18126101657
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Privacy;
