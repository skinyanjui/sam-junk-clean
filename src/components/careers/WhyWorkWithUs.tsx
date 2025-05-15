
import { Users, Award, Shield } from 'lucide-react';
import { useResponsiveLayout } from '@/hooks/use-mobile';

const WhyWorkWithUs = () => {
  const { isMobile } = useResponsiveLayout();
  
  return (
    <section className={`py-12 ${isMobile ? 'px-4' : 'py-16'} bg-white`}>
      <div className="container-custom">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-3 md:mb-4">Why Work With Us</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Join a team that values hard work, camaraderie, and customer satisfaction. 
            We're not just employees - we're a family on a mission to help our community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-5 md:p-6 bg-brand-gray rounded-lg">
            <div className="bg-brand-navy/10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={isMobile ? 24 : 32} className="text-brand-navy" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-brand-navy mb-2 md:mb-3">Supportive Team</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Work with a team that has your back. We believe in collaboration, support, and helping each other succeed.
            </p>
          </div>

          <div className="text-center p-5 md:p-6 bg-brand-gray rounded-lg">
            <div className="bg-brand-navy/10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={isMobile ? 24 : 32} className="text-brand-navy" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-brand-navy mb-2 md:mb-3">Growth Opportunities</h3>
            <p className="text-gray-600 text-sm md:text-base">
              We promote from within and provide training to help you advance your career with us as we continue to grow.
            </p>
          </div>

          <div className="text-center p-5 md:p-6 bg-brand-gray rounded-lg">
            <div className="bg-brand-navy/10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={isMobile ? 24 : 32} className="text-brand-navy" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-brand-navy mb-2 md:mb-3">Veteran Supportive</h3>
            <p className="text-gray-600 text-sm md:text-base">
              As a veteran-owned business, we understand the value veterans bring to the workforce and actively support their transition to civilian careers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
