
import { ApplicationFormValues } from '../types/ApplicationFormValues';

/**
 * Formats form data for Supabase storage
 */
export function formatApplicationData(data: ApplicationFormValues, positions: Array<{ id: number; title: string }>) {
  // Find the position title from the selected position ID
  const positionTitle = positions.find(p => p.id.toString() === data.positionInfo.positionId)?.title || "Unknown Position";
  
  // Convert dates to ISO strings for storage
  return {
    position_id: data.positionInfo.positionId,
    position_title: positionTitle,
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
}
