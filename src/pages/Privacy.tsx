
import PageLayout from '@/components/PageLayout';

const Privacy = () => {
  return (
    <PageLayout>
      <section className="pt-24 pb-16">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold text-brand-navy mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <p>
              Last updated: May 5, 2025
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Introduction</h2>
            <p>
              Uncle Sam Junk Removal ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we collect may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Personal Data: Personally identifiable information such as your name, email address, telephone number, and home address when you register on our site, submit a quote request, or contact us.</li>
              <li>Financial Data: Information related to payment methods if you make a payment for our services.</li>
              <li>Usage Data: Information about how you access and use our website and services.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">How We Use Your Information</h2>
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
              Email: privacy@unclesamjunk.com<br />
              Phone: (800) 555-1234
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Privacy;
