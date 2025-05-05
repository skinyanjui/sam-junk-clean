
import { Users, Award, Shield } from 'lucide-react';

const WhyWorkWithUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-navy mb-4">Why Work With Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join a team that values hard work, camaraderie, and customer satisfaction. 
            We're not just employees - we're a family on a mission to help our community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-brand-gray rounded-lg">
            <div className="bg-brand-navy/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-brand-navy" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">Supportive Team</h3>
            <p className="text-gray-600">
              Work with a team that has your back. We believe in collaboration, support, and helping each other succeed.
            </p>
          </div>

          <div className="text-center p-6 bg-brand-gray rounded-lg">
            <div className="bg-brand-navy/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-brand-navy" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">Growth Opportunities</h3>
            <p className="text-gray-600">
              We promote from within and provide training to help you advance your career with us as we continue to grow.
            </p>
          </div>

          <div className="text-center p-6 bg-brand-gray rounded-lg">
            <div className="bg-brand-navy/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-brand-navy" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">Veteran Supportive</h3>
            <p className="text-gray-600">
              As a veteran-owned business, we understand the value veterans bring to the workforce and actively support their transition to civilian careers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
