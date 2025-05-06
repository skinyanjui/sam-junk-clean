
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from '../types/ApplicationFormValues';
import { ListCheck } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const skillsList = [
  {
    id: 'drivingExperience',
    label: 'Driving Experience',
    description: 'Experience driving trucks or larger vehicles',
  },
  {
    id: 'liftingCapability',
    label: 'Heavy Lifting',
    description: 'Ability to lift 50+ pounds regularly',
  },
  {
    id: 'customerService',
    label: 'Customer Service',
    description: 'Experience in customer-facing roles',
  },
  {
    id: 'teamwork',
    label: 'Teamwork',
    description: 'Ability to work effectively in a team',
  },
  {
    id: 'organizationalSkills',
    label: 'Organizational Skills',
    description: 'Experience with planning and prioritizing tasks',
  },
  {
    id: 'problemSolving',
    label: 'Problem Solving',
    description: 'Ability to think quickly and solve issues in the field',
  },
];

const SkillsStep = () => {
  const { control } = useFormContext<ApplicationFormValues>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ListCheck className="h-5 w-5 text-brand-navy" />
        <h3 className="text-lg font-medium">Skills & Experience</h3>
      </div>
      
      <p className="text-gray-600">
        Please select all skills and experience that apply to you. This helps us understand your qualifications for the position.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillsList.map((skill) => (
          <FormField
            key={skill.id}
            control={control}
            name={`skills.${String(skill.id) as keyof ApplicationFormValues['skills']}`}
            render={({ field }) => (
              <FormItem className="flex flex-row space-x-3 space-y-0 items-start rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-base">{skill.label}</FormLabel>
                  <FormDescription>{skill.description}</FormDescription>
                </div>
              </FormItem>
            )}
          />
        ))}
      </div>

      <FormField
        control={control}
        name="skills.additionalSkills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Skills</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please list any additional skills or qualifications relevant to this position..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Include any skills not listed above that you believe would be valuable for this position
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SkillsStep;
