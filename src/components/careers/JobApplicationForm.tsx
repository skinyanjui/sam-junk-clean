
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Form steps
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import ResumeUploadStep from './form-steps/ResumeUploadStep';
import EmploymentHistoryStep from './form-steps/EmploymentHistoryStep';
import EducationStep from './form-steps/EducationStep';
import SkillsStep from './form-steps/SkillsStep';
import AvailabilityStep from './form-steps/AvailabilityStep';
import LegalRequirementsStep from './form-steps/LegalRequirementsStep';
import ReviewStep from './form-steps/ReviewStep';

// Types and hooks
import { ApplicationFormValues } from './types/ApplicationFormValues';
import { useJobApplication } from './hooks/useJobApplication';
import { FormStepManager } from './components/FormStepManager';

interface Position {
  id: string;
  title: string;
}

interface JobApplicationFormProps {
  positions: Position[];
  onClose: () => void;
  preselectedPosition?: string;
}

const JobApplicationForm = ({ positions, onClose, preselectedPosition }: JobApplicationFormProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  
  const methods = useForm<ApplicationFormValues>({
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        veteranStatus: "",
      },
      positionInfo: {
        positionId: preselectedPosition || "", // Now accepts string directly
        coverLetter: "",
      },
      resume: {
        fileUrl: "",
        resumeLink: "",
      },
      employmentHistory: [],
      education: [],
      skills: {
        drivingExperience: false,
        liftingCapability: false,
        customerService: false,
        teamwork: false,
        organizationalSkills: false,
        problemSolving: false,
        additionalSkills: "",
      },
      availability: {
        workType: "full_time",
        earliestStartDate: new Date(),
        preferredSchedule: "",
        hasDriverLicense: false,
        hasReliableTransportation: false,
      },
      legalRequirements: {
        isLegallyEligibleToWork: false,
        isOver18: false,
        willComplyWithBackgroundCheck: false,
        canPerformPhysicalTasks: false,
        acknowledgeTerms: false,
      },
      additionalInfo: "",
    }
  });
  
  const { handleSubmit, watch } = methods;
  const positionId = watch('positionInfo.positionId');

  // Custom hooks for application submission
  const handleSuccess = () => {
    setIsCompleted(true);
    // Reset form after 3 seconds and close
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const { isSubmitting, submitApplication } = useJobApplication(handleSuccess);

  const onSubmit = async (data: ApplicationFormValues) => {
    await submitApplication(data, positions);
  };

  // Define form steps
  const steps = [
    { name: "Personal Information", component: <PersonalInfoStep positions={positions} /> },
    { name: "Resume", component: <ResumeUploadStep /> },
    { name: "Employment History", component: <EmploymentHistoryStep /> },
    { name: "Education", component: <EducationStep /> },
    { name: "Skills", component: <SkillsStep /> },
    { name: "Availability", component: <AvailabilityStep /> },
    { name: "Legal Requirements", component: <LegalRequirementsStep /> },
    { name: "Review", component: <ReviewStep positions={positions} /> }
  ];

  // Ensure storage bucket exists when component mounts
  const ensureStorageBucket = async () => {
    // This check is just to ensure we have proper file storage capabilities
    // In a production app, you'd create this bucket through SQL migrations
    const { error } = await supabase.storage.getBucket('public');
    if (error && error.message?.includes('not found')) {
      // Bucket doesn't exist, create it
      await supabase.storage.createBucket('public', { public: true });
    }
  };

  // Ensure storage bucket exists when component mounts
  ensureStorageBucket();

  return (
    <div className="max-w-2xl mx-auto">
      <DialogTitle className="text-2xl font-bold text-brand-navy mb-2">
        {isCompleted ? "Application Submitted!" : "Job Application"}
      </DialogTitle>
      <DialogDescription className="text-gray-600 mb-6">
        {isCompleted 
          ? "Thank you for your interest in joining our team. We'll be in touch soon."
          : "Please complete all sections of the application form below."
        }
      </DialogDescription>
      
      {isCompleted ? (
        <div className="text-center py-10">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="text-green-600 w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Application Successfully Submitted</h3>
          <p className="text-gray-600 mb-6">
            We've received your application and will review it shortly. Thank you for your interest in joining Uncle Sam Junk Removal!
          </p>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormStepManager 
              steps={steps} 
              onClose={onClose} 
              isSubmitting={isSubmitting} 
              disableContinue={!positionId} // Removed currentStep === 0 since it's now in FormStepManager
            />
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default JobApplicationForm;
