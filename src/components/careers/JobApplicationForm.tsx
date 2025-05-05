
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Briefcase, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

// Form Step Components
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import ResumeUploadStep from './form-steps/ResumeUploadStep';
import EmploymentHistoryStep from './form-steps/EmploymentHistoryStep';
import EducationStep from './form-steps/EducationStep';
import SkillsStep from './form-steps/SkillsStep';
import AvailabilityStep from './form-steps/AvailabilityStep';
import LegalRequirementsStep from './form-steps/LegalRequirementsStep';
import ReviewStep from './form-steps/ReviewStep';

// Define the main form schema with Zod
export const applicationFormSchema = z.object({
  // Personal Information
  personalInfo: z.object({
    fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    dateOfBirth: z.date().optional(),
    pronouns: z.string().optional(),
    veteranStatus: z.enum(['yes', 'no', 'prefer_not_to_say']).optional(),
  }),
  
  // Position Info
  positionInfo: z.object({
    positionId: z.string({ required_error: 'Please select a position' }),
    coverLetter: z.string().min(50, { message: 'Cover letter should be at least 50 characters' }),
  }),
  
  // Resume
  resume: z.object({
    fileUrl: z.string().optional(),
    resumeLink: z.string().url().optional(),
  }).refine(data => data.fileUrl || data.resumeLink, {
    message: "Either upload a resume or provide a link",
    path: ["fileUrl"],
  }),
  
  // Employment History
  employmentHistory: z.array(
    z.object({
      employer: z.string().min(1, { message: 'Employer name is required' }),
      jobTitle: z.string().min(1, { message: 'Job title is required' }),
      startDate: z.date({ required_error: 'Start date is required' }),
      endDate: z.date().optional(),
      isCurrentJob: z.boolean().optional(),
      responsibilities: z.string().optional(),
    })
  ).optional(),
  
  // Education
  education: z.array(
    z.object({
      institution: z.string().min(1, { message: 'Institution name is required' }),
      degree: z.string().min(1, { message: 'Degree/certificate is required' }),
      fieldOfStudy: z.string().optional(),
      graduationYear: z.string().optional(),
    })
  ).optional(),
  
  // Skills
  skills: z.object({
    drivingExperience: z.boolean().optional(),
    liftingCapability: z.boolean().optional(),
    customerService: z.boolean().optional(),
    teamwork: z.boolean().optional(),
    organizationalSkills: z.boolean().optional(),
    problemSolving: z.boolean().optional(),
    additionalSkills: z.string().optional(),
  }),
  
  // Availability
  availability: z.object({
    workType: z.enum(['full_time', 'part_time', 'contract', 'temporary']),
    earliestStartDate: z.date(),
    hasDriverLicense: z.boolean(),
    driverLicenseState: z.string().optional(),
    driverLicenseNumber: z.string().optional(),
    hasReliableTransportation: z.boolean(),
    preferredSchedule: z.string().optional(),
  }),
  
  // Legal Requirements
  legalRequirements: z.object({
    isLegallyEligibleToWork: z.boolean(),
    isOver18: z.boolean(),
    willComplyWithBackgroundCheck: z.boolean(),
    canPerformPhysicalTasks: z.boolean(),
    acknowledgeTerms: z.boolean(),
  }),
  
  // Additional Info
  additionalInfo: z.string().optional(),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

interface JobApplicationFormProps {
  positions: Array<{
    id: number;
    title: string;
  }>;
  onClose: () => void;
  preselectedPosition?: number;
}

const JobApplicationForm = ({ positions, onClose, preselectedPosition }: JobApplicationFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const steps = [
    "Personal Information",
    "Resume",
    "Employment History",
    "Education",
    "Skills",
    "Availability",
    "Legal Requirements",
    "Review"
  ];
  
  // Initialize form with default values
  const methods = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        veteranStatus: 'prefer_not_to_say',
      },
      positionInfo: {
        positionId: preselectedPosition ? String(preselectedPosition) : '',
        coverLetter: '',
      },
      resume: {
        fileUrl: '',
        resumeLink: '',
      },
      employmentHistory: [
        {
          employer: '',
          jobTitle: '',
          startDate: undefined,
          endDate: undefined,
          isCurrentJob: false,
          responsibilities: '',
        }
      ],
      education: [
        {
          institution: '',
          degree: '',
          fieldOfStudy: '',
          graduationYear: '',
        }
      ],
      skills: {
        drivingExperience: false,
        liftingCapability: false,
        customerService: false,
        teamwork: false,
        organizationalSkills: false,
        problemSolving: false,
        additionalSkills: '',
      },
      availability: {
        workType: 'full_time',
        earliestStartDate: new Date(),
        hasDriverLicense: false,
        driverLicenseState: '',
        driverLicenseNumber: '',
        hasReliableTransportation: false,
        preferredSchedule: '',
      },
      legalRequirements: {
        isLegallyEligibleToWork: false,
        isOver18: false,
        willComplyWithBackgroundCheck: false,
        canPerformPhysicalTasks: false,
        acknowledgeTerms: false,
      },
      additionalInfo: '',
    },
    mode: "onChange"
  });

  // Get values from local storage if available
  React.useEffect(() => {
    const savedData = localStorage.getItem('job-application-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        
        // Fix date objects that were stringified
        if (parsedData.personalInfo?.dateOfBirth) {
          parsedData.personalInfo.dateOfBirth = new Date(parsedData.personalInfo.dateOfBirth);
        }
        if (parsedData.availability?.earliestStartDate) {
          parsedData.availability.earliestStartDate = new Date(parsedData.availability.earliestStartDate);
        }
        if (parsedData.employmentHistory) {
          parsedData.employmentHistory = parsedData.employmentHistory.map((job: any) => ({
            ...job,
            startDate: job.startDate ? new Date(job.startDate) : undefined,
            endDate: job.endDate ? new Date(job.endDate) : undefined,
          }));
        }
        
        methods.reset(parsedData);
        toast({
          title: "Application draft restored",
          description: "Your previously saved application has been loaded.",
        });
      } catch (error) {
        console.error("Error restoring form data:", error);
      }
    }
  }, []);

  // Save form data to local storage on changes
  const watchedValues = methods.watch();
  React.useEffect(() => {
    localStorage.setItem('job-application-data', JSON.stringify(watchedValues));
  }, [watchedValues]);

  const nextStep = async () => {
    const stepFieldsMap: Record<number, string[]> = {
      0: ['personalInfo', 'positionInfo'], // Personal Info step
      1: ['resume'],                       // Resume step
      2: ['employmentHistory'],            // Employment History step
      3: ['education'],                    // Education step
      4: ['skills'],                       // Skills step
      5: ['availability'],                 // Availability step
      6: ['legalRequirements'],            // Legal Requirements step
      // Step 7 is review, no validation needed
    };

    if (currentStep < steps.length - 1) {
      // Validate only the fields for the current step
      const fieldsToValidate = stepFieldsMap[currentStep];
      
      if (fieldsToValidate) {
        const isValid = await methods.trigger(fieldsToValidate as any);
        if (isValid) {
          setCurrentStep(prev => prev + 1);
          window.scrollTo(0, 0);
        }
      } else {
        // If no specific fields to validate for this step, just proceed
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real application, you would send this data to your backend
      console.log('Application submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Application submitted!",
        description: "We've received your application and will contact you soon.",
      });
      
      // Clear saved application data
      localStorage.removeItem('job-application-data');
      
      // Close the dialog
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep positions={positions} />;
      case 1:
        return <ResumeUploadStep />;
      case 2:
        return <EmploymentHistoryStep />;
      case 3:
        return <EducationStep />;
      case 4:
        return <SkillsStep />;
      case 5:
        return <AvailabilityStep />;
      case 6:
        return <LegalRequirementsStep />;
      case 7:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 px-2">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-brand-red" />
          <h2 className="text-lg font-semibold">Job Application</h2>
        </div>
        
        {/* Progress bar and steps */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{steps[currentStep]}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step content */}
        <div className="space-y-6">
          {renderStepContent()}
        </div>

        {/* Navigation buttons */}
        <DialogFooter className="flex gap-2 sm:justify-between mt-6">
          <div>
            {currentStep > 0 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                className="flex items-center gap-2"
                disabled={isSubmitting}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button 
                type="button" 
                className="bg-brand-navy hover:bg-opacity-90"
                onClick={nextStep}
                disabled={isSubmitting}
              >
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="bg-brand-red hover:bg-opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};

export default JobApplicationForm;
