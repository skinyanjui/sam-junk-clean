
import React from 'react';
import { Steps, Step } from '@/components/ui/steps';

interface ProcessStepsProps {
  highlightFirst?: boolean;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ highlightFirst = false }) => {
  // Set active step based on the highlightFirst prop
  // Make sure activeStep can be 0, 1, or 2 to fix the type error
  const activeStep: number = highlightFirst ? 0 : 1;
  
  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-8">What to Expect</h2>
          <p className="text-lg text-gray-700 mb-10">
            Getting a quote from Uncle Sam Junk Removal is easy! Here's our simple process:
          </p>
          
          {/* Steps progress indicator */}
          <div className="mb-12">
            <Steps active={activeStep} count={3} className="px-4">
              <Step title="Submit Request" />
              <Step title="Get Quote" />
              <Step title="Schedule Pickup" />
            </Steps>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`bg-white p-6 rounded-lg shadow-sm ${activeStep === 0 ? 'ring-2 ring-brand-red' : ''}`}>
              <div className="text-brand-navy font-bold text-4xl mb-3">1</div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Submit your request</h3>
              <p className="text-gray-600">Fill out our form with details about your junk removal needs.</p>
            </div>
            
            <div className={`bg-white p-6 rounded-lg shadow-sm ${activeStep === 1 ? 'ring-2 ring-brand-red' : ''}`}>
              <div className="text-brand-navy font-bold text-4xl mb-3">2</div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Get a free quote</h3>
              <p className="text-gray-600">We'll contact you promptly with a no-obligation estimate.</p>
            </div>
            
            <div className={`bg-white p-6 rounded-lg shadow-sm ${activeStep === 2 ? 'ring-2 ring-brand-red' : ''}`}>
              <div className="text-brand-navy font-bold text-4xl mb-3">3</div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Schedule your pickup</h3>
              <p className="text-gray-600">Choose a convenient time for our team to remove your items.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
