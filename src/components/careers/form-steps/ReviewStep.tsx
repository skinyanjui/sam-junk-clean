
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from '../types/ApplicationFormValues';
import { Check, FileText } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export interface ReviewStepProps {
  positions: Array<{
    id: string;
    title: string;
  }>;
}

const ReviewStep = ({ positions }: ReviewStepProps) => {
  const { control, watch } = useFormContext<ApplicationFormValues>();
  const formValues = watch();
  
  // Find the position title from the selected position ID
  const findPositionTitle = (id: string) => {
    const position = positions.find(pos => pos.id === id);
    return position ? position.title : `Position #${id}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-brand-navy" />
        <h3 className="text-lg font-medium">Review Your Application</h3>
      </div>
      
      <p className="text-gray-600">
        Please review your application information below. If you need to make changes, 
        use the Back button to return to the appropriate section.
      </p>

      <div className="bg-gray-50 p-6 rounded-md space-y-8">
        {/* Personal Information Review */}
        <div>
          <h4 className="text-base font-medium border-b pb-2 mb-3">Personal Information</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="col-span-1">
              <dt className="text-gray-500">Full Name</dt>
              <dd className="font-medium">{formValues.personalInfo.fullName || 'Not provided'}</dd>
            </div>
            
            <div className="col-span-1">
              <dt className="text-gray-500">Email</dt>
              <dd className="font-medium">{formValues.personalInfo.email || 'Not provided'}</dd>
            </div>
            
            <div className="col-span-1">
              <dt className="text-gray-500">Phone</dt>
              <dd className="font-medium">{formValues.personalInfo.phone || 'Not provided'}</dd>
            </div>
            
            <div className="col-span-1">
              <dt className="text-gray-500">Address</dt>
              <dd className="font-medium">
                {[
                  formValues.personalInfo.address,
                  formValues.personalInfo.city,
                  formValues.personalInfo.state,
                  formValues.personalInfo.zipCode
                ].filter(Boolean).join(', ') || 'Not provided'}
              </dd>
            </div>
            
            <div className="col-span-1">
              <dt className="text-gray-500">Position</dt>
              <dd className="font-medium">
                {formValues.positionInfo.positionId ? 
                  findPositionTitle(formValues.positionInfo.positionId) : 
                  'Not selected'}
              </dd>
            </div>
            
            <div className="col-span-1">
              <dt className="text-gray-500">Veteran Status</dt>
              <dd className="font-medium">
                {formValues.personalInfo.veteranStatus === 'yes' ? 'Veteran' : 
                 formValues.personalInfo.veteranStatus === 'no' ? 'Non-veteran' : 
                 'Prefer not to say'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Resume Review */}
        <div>
          <h4 className="text-base font-medium border-b pb-2 mb-3">Resume</h4>
          <p className="text-sm">
            {formValues.resume.fileUrl ? 
              'Resume file uploaded' : 
              formValues.resume.resumeLink ? 
              `Resume link provided: ${formValues.resume.resumeLink}` :
              'No resume provided'}
          </p>
        </div>

        {/* Employment History Review */}
        <div>
          <h4 className="text-base font-medium border-b pb-2 mb-3">Employment History</h4>
          {formValues.employmentHistory && formValues.employmentHistory.length > 0 ? (
            <div className="space-y-4">
              {formValues.employmentHistory.map((job, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{job.jobTitle} at {job.employer}</p>
                  <p className="text-gray-500">
                    {job.startDate ? new Date(job.startDate).toLocaleDateString() : ''} - 
                    {job.isCurrentJob ? 'Present' : 
                      job.endDate ? new Date(job.endDate).toLocaleDateString() : ''}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No employment history provided</p>
          )}
        </div>

        {/* Education Review */}
        <div>
          <h4 className="text-base font-medium border-b pb-2 mb-3">Education</h4>
          {formValues.education && formValues.education.length > 0 ? (
            <div className="space-y-4">
              {formValues.education.map((edu, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                  <p className="text-gray-500">
                    {edu.institution} {edu.graduationYear && `- ${edu.graduationYear}`}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No education information provided</p>
          )}
        </div>
        
        {/* Skills Review */}
        <div>
          <h4 className="text-base font-medium border-b pb-2 mb-3">Skills</h4>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {Object.entries(formValues.skills)
              .filter(([key, value]) => typeof value === 'boolean' && value === true)
              .map(([key]) => (
                <div key={key} className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    {key === 'drivingExperience' ? 'Driving Experience' :
                     key === 'liftingCapability' ? 'Heavy Lifting' :
                     key === 'customerService' ? 'Customer Service' :
                     key === 'teamwork' ? 'Teamwork' :
                     key === 'organizationalSkills' ? 'Organizational Skills' :
                     key === 'problemSolving' ? 'Problem Solving' : key}
                  </span>
                </div>
              ))
            }
          </div>
          {formValues.skills.additionalSkills && (
            <div className="mt-2">
              <h5 className="text-sm font-medium">Additional Skills:</h5>
              <p className="text-sm text-gray-600">{formValues.skills.additionalSkills}</p>
            </div>
          )}
        </div>
        
        {/* Availability Review */}
        <div>
          <h4 className="text-base font-medium border-b pb-2 mb-3">Availability</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="col-span-1">
              <dt className="text-gray-500">Work Type</dt>
              <dd className="font-medium">
                {formValues.availability.workType === 'full_time' ? 'Full-time' :
                 formValues.availability.workType === 'part_time' ? 'Part-time' :
                 formValues.availability.workType === 'contract' ? 'Contract' :
                 formValues.availability.workType === 'temporary' ? 'Temporary' : 'Not specified'}
              </dd>
            </div>
            
            <div className="col-span-1">
              <dt className="text-gray-500">Earliest Start Date</dt>
              <dd className="font-medium">
                {formValues.availability.earliestStartDate ? 
                  new Date(formValues.availability.earliestStartDate).toLocaleDateString() : 
                  'Not specified'}
              </dd>
            </div>
            
            <div className="col-span-1">
              <dt className="text-gray-500">Driver's License</dt>
              <dd className="font-medium">
                {formValues.availability.hasDriverLicense ? 'Yes' : 'No'}
                {formValues.availability.hasDriverLicense && formValues.availability.driverLicenseState && 
                 ` (${formValues.availability.driverLicenseState})`}
              </dd>
            </div>
            
            <div className="col-span-1">
              <dt className="text-gray-500">Reliable Transportation</dt>
              <dd className="font-medium">
                {formValues.availability.hasReliableTransportation ? 'Yes' : 'No'}
              </dd>
            </div>
            
            {formValues.availability.preferredSchedule && (
              <div className="col-span-2">
                <dt className="text-gray-500">Preferred Schedule</dt>
                <dd className="font-medium">{formValues.availability.preferredSchedule}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <FormField
        control={control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Information (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any additional information you'd like to share with us..."
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-green-50 border-l-4 border-green-400 p-4">
        <div className="flex">
          <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-green-700">Ready to Submit</h4>
            <p className="text-sm text-green-600">
              Please click the "Submit Application" button when you're ready to submit your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
