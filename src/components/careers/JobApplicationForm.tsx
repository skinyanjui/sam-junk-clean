import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Steps, Step } from '@/components/ui/steps';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

interface Position {
  id: number;
  title: string;
}

export interface ApplicationFormValues {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    dateOfBirth?: Date;
    pronouns?: string;
    veteranStatus: string;
  };
  positionInfo: {
    positionId: string;
    coverLetter: string;
  };
  resume: {
    fileUrl?: string;
    resumeLink?: string;
    file?: FileList;
  };
  employmentHistory?: Array<{
    employer: string;
    jobTitle: string;
    startDate?: string | Date;
    endDate?: string | Date;
    isCurrentJob?: boolean;
    description?: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    graduationYear?: number;
  }>;
  skills: {
    drivingExperience: boolean;
    liftingCapability: boolean;
    customerService: boolean;
    teamwork: boolean;
    organizationalSkills: boolean;
    problemSolving: boolean;
    additionalSkills?: string;
  };
  availability: {
    workType: string;
    earliestStartDate?: Date;
    preferredSchedule?: string;
    hasDriverLicense?: boolean;
    driverLicenseState?: string;
    driverLicenseNumber?: string;
    hasReliableTransportation?: boolean;
  };
  legalRequirements: {
    isLegallyEligibleToWork: boolean;
    isOver18: boolean;
    willComplyWithBackgroundCheck: boolean;
    canPerformPhysicalTasks: boolean;
    acknowledgeTerms: boolean;
  };
  additionalInfo?: string;
}

interface JobApplicationFormProps {
  positions: Position[];
  onClose: () => void;
  preselectedPosition?: number;
}

const JobApplicationForm = ({ positions, onClose, preselectedPosition }: JobApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [resumePreview, setResumePreview] = useState<string | null>(null);
  const { toast } = useToast();
  
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
        positionId: preselectedPosition?.toString() || "",
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

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Convert dates to ISO strings for storage
      const formattedData = {
        position_id: data.positionInfo.positionId,
        position_title: positions.find(p => p.id.toString() === data.positionInfo.positionId)?.title || "Unknown Position",
        personal_info: {
          ...data.personalInfo,
          dateOfBirth: data.personalInfo.dateOfBirth?.toISOString(),
        },
        resume_info: {
          resume_url: data.resume.fileUrl || "",
          resume_link: data.resume.resumeLink || "",
        },
        employment_history: data.employmentHistory?.map(job => ({
          ...job,
          startDate: job.startDate instanceof Date ? job.startDate.toISOString() : job.startDate,
          endDate: job.endDate instanceof Date ? job.endDate.toISOString() : job.endDate,
        })) || [],
        education: data.education || [],
        skills: data.skills,
        availability: {
          ...data.availability,
          earliestStartDate: data.availability.earliestStartDate?.toISOString(),
        },
        legal_requirements: data.legalRequirements,
        additional_info: data.additionalInfo,
      };
      
      // Submit to Supabase
      const { error } = await supabase
        .from('job_applications')
        .insert(formattedData);
        
      if (error) {
        throw error;
      }
      
      setIsCompleted(true);
      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We'll review your application soon.",
      });
      
      // Reset form after 3 seconds and close
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  // Create a storage bucket for file uploads if we don't already have one
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                    disabled={!positionId && currentStep === 0}
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
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default JobApplicationForm;
