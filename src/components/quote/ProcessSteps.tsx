
import React from 'react';

interface ProcessStepsProps {
  highlightFirst?: boolean;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ highlightFirst = false }) => {
  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title">What to Expect</h2>
          <p className="text-lg text-gray-700 mb-8">
            Getting a quote from Uncle Sam Junk Removal is easy! Here's our simple process:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`bg-white p-6 rounded-lg shadow-sm ${highlightFirst ? 'ring-2 ring-brand-red' : ''}`}>
              <div className="text-brand-navy font-bold text-4xl mb-3">1</div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Submit your request</h3>
              <p className="text-gray-600">Fill out our form with details about your junk removal needs.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-brand-navy font-bold text-4xl mb-3">2</div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Get a free quote</h3>
              <p className="text-gray-600">We'll contact you promptly with a no-obligation estimate.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
