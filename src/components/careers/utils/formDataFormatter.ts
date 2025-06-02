
import { ApplicationFormValues } from '../types/ApplicationFormValues';

export const formatApplicationData = (
  data: ApplicationFormValues,
  positions: Array<{ id: string; title: string }>
) => {
  // Find the selected position title
  const selectedPosition = positions.find(p => p.id === data.positionInfo.positionId);
  
  return {
    position_id: data.positionInfo.positionId,
    position_title: selectedPosition?.title || 'Unknown Position',
    personal_info: {
      full_name: data.personalInfo.fullName,
      email: data.personalInfo.email,
      phone: data.personalInfo.phone,
      address: data.personalInfo.address,
      city: data.personalInfo.city,
      state: data.personalInfo.state,
      zip_code: data.personalInfo.zipCode,
      date_of_birth: data.personalInfo.dateOfBirth?.toISOString(),
      pronouns: data.personalInfo.pronouns,
      veteran_status: data.personalInfo.veteranStatus,
      cover_letter: data.positionInfo.coverLetter,
    },
    resume_info: {
      resume_url: data.resume.fileUrl,
      resume_link: data.resume.resumeLink,
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
      earliestStartDate: data.availability.earliestStartDate?.toISOString() || null,
    },
    legal_requirements: data.legalRequirements,
    additional_info: data.additionalInfo,
    status: 'received'
  };
};
