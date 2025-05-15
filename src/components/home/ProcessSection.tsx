
import { Badge } from "@/components/ui/badge";
import { useResponsiveLayout } from '@/hooks/use-mobile';

const ProcessSection = () => {
  const { isMobile, orientation } = useResponsiveLayout();
  const isLandscape = orientation === 'landscape';
  
  const steps = [
    {
      number: "01",
      title: "Book Online or Call",
      description: "Schedule your free, no-obligation estimate via our form or direct call.",
      color: "bg-brand-red"
    },
    {
      number: "02",
      title: "Get an Upfront Price",
      description: "Our team provides a transparent quote based on your specific needs.",
      color: "bg-brand-navy"
    },
    {
      number: "03",
      title: "Schedule Removal",
      description: "Pick a time that works for you - same day options available!",
      color: "bg-brand-blue"
    },
    {
      number: "04",
      title: "Enjoy Your Space",
      description: "We handle the heavy lifting and responsibly dispose of everything.",
      color: "bg-green-600"
    }
  ];

  return (
    <section className={`py-10 ${isMobile ? 'px-4 py-8' : 'py-12'}`}>
      <div className="container-custom">
        <div className="text-center mb-8">
          <Badge className="bg-brand-navy mb-3">Simple Process</Badge>
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-brand-navy mb-3`}>
            Junk Removal Made Easy
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-2xl mx-auto`}>
            From booking to cleanup, we've streamlined everything to save you time and hassle.
          </p>
        </div>

        <div className={`grid ${isMobile && isLandscape ? 'grid-cols-2 gap-4' : isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 md:grid-cols-4 gap-5'} mt-8`}>
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Number indicator */}
              <div className={`${step.color} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-3 shadow-lg`}>
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
