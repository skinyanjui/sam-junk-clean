
import { Badge } from "@/components/ui/badge";
import { useResponsiveLayout } from '@/hooks/use-mobile';

const ProcessSection = () => {
  const { isMobile, orientation } = useResponsiveLayout();
  const isLandscape = orientation === 'landscape';
  
  const steps = [
    {
      number: "01",
      title: "Contact Us",
      description: "Call or fill out our online form to schedule your free estimate.",
      color: "bg-brand-red"
    },
    {
      number: "02",
      title: "Get a Quote",
      description: "Our team will provide a clear, upfront price based on your junk volume.",
      color: "bg-brand-navy"
    },
    {
      number: "03",
      title: "Schedule Service",
      description: "Pick a convenient time and we'll arrive with our truck and team.",
      color: "bg-brand-blue"
    },
    {
      number: "04",
      title: "Relax",
      description: "We'll remove your junk quickly and dispose of it responsibly.",
      color: "bg-green-600"
    }
  ];

  return (
    <section className={`py-16 ${isMobile ? 'px-4' : 'py-20'}`}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge className="bg-brand-navy mb-3">How It Works</Badge>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-4`}>
            Simple, 4-Step Process
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-2xl mx-auto`}>
            We've made junk removal as easy as possible. Here's how we tackle the mess so you don't have to.
          </p>
        </div>

        <div className={`grid ${isMobile && isLandscape ? 'grid-cols-2 gap-4' : isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 md:grid-cols-4 gap-6'} mt-10`}>
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Number indicator */}
              <div className={`${step.color} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg`}>
                {step.number}
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && !isMobile && (
                <div className="absolute top-6 left-12 h-0.5 bg-gray-200 w-full transform -translate-y-1/2 -z-10"></div>
              )}
              
              <h3 className="text-xl font-bold text-brand-navy mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
