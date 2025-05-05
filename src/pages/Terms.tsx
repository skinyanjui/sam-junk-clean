
import PageLayout from '@/components/PageLayout';

const Terms = () => {
  return (
    <PageLayout>
      <section className="pt-24 pb-16">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold text-brand-navy mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-700">
            <p>
              Last updated: May 5, 2025
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Introduction</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the services provided by Uncle Sam Junk Removal ("we," "us," or "our"). By accessing or using our services, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Use of Services</h2>
            <p>
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</li>
              <li>To impersonate or attempt to impersonate us, our employees, another user, or any other person or entity</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Service Appointments and Cancellations</h2>
            <p>
              When you schedule an appointment with us, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide accurate and complete information about the items to be removed</li>
              <li>Ensure someone 18 years or older is present at the service location during the appointment</li>
              <li>Ensure all items to be removed are accessible to our crew</li>
              <li>Notify us at least 24 hours in advance if you need to cancel or reschedule your appointment</li>
            </ul>
            <p className="mt-4">
              We reserve the right to charge a cancellation fee for appointments canceled with less than 24 hours' notice.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Pricing and Payment</h2>
            <p>
              Our pricing is based on the volume of materials removed. We provide free, no-obligation estimates before any work begins. Payment is due upon completion of service. We accept cash, credit cards, and checks.
            </p>
            <p className="mt-4">
              In the event of non-payment, we reserve the right to pursue all legal remedies available to us, including but not limited to collection proceedings. You will be responsible for all costs of collection, including reasonable attorney's fees.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Prohibited Items</h2>
            <p>
              We cannot accept the following items:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Hazardous materials (paint, chemicals, oil, etc.)</li>
              <li>Asbestos</li>
              <li>Medical waste</li>
              <li>Certain electronics (depending on local regulations)</li>
            </ul>
            <p className="mt-4">
              If you're unsure about specific items, please ask us before your appointment.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Uncle Sam Junk Removal, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the services.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Changes to These Terms</h2>
            <p>
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of our services following the posting of revised Terms means that you accept and agree to the changes.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions or concerns about these Terms, please contact us at:
            </p>
            <p className="mt-4">
              Uncle Sam Junk Removal<br />
              Email: terms@unclesamjunk.com<br />
              Phone: (800) 555-1234
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Terms;
