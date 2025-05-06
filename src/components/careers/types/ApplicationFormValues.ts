
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
    graduationYear?: number | string;
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
