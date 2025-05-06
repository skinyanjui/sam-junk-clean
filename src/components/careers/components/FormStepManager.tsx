
import { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Steps, Step } from '@/components/ui/steps';

interface FormStepProps {
  steps: Array<{
    name: string;
    component: ReactNode;
  }>;
  onClose: () => void;
  isSubmitting: boolean;
  disableContinue?: boolean;
}

export const FormStepManager = ({
  steps,
  onClose,
  isSubmitting,
  disableContinue,
}: FormStepProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="hidden md:block mb-8">
        <Steps active={currentStep} count={steps.length}>
          {steps.map((step, index) => (
            <Step key={index} title={step.name} />
          ))}
        </Steps>
      </div>
      
      <div className="md:hidden mb-4">
        <h3 className="font-medium text-gray-700">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].name}
        </h3>
      </div>
      
      <div className="py-4">
        {steps[currentStep].component}
      </div>
      
      <div className="flex justify-between pt-6 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={currentStep === 0 ? onClose : prevStep}
        >
          {currentStep === 0 ? "Cancel" : "Previous"}
        </Button>
        
        <div className="space-x-2">
          {currentStep < steps.length - 1 ? (
            <Button 
              type="button" 
              onClick={nextStep}
              disabled={disableContinue}
            >
              Continue
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : "Submit Application"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
