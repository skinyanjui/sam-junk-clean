
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from '../types/ApplicationFormValues';
import { Check, Info } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

const LegalRequirementsStep = () => {
  const { control } = useFormContext<ApplicationFormValues>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Check className="h-5 w-5 text-brand-navy" />
        <h3 className="text-lg font-medium">Legal Requirements</h3>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-blue-700">Important Information</h4>
            <p className="text-sm text-blue-600">
              The following questions are required by law and help us determine your eligibility for employment.
              Your responses are confidential.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="legalRequirements.isLegallyEligibleToWork"
          render={({ field }) => (
            <FormItem className="flex flex-row space-x-3 space-y-0 items-start">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I am legally eligible to work in the United States</FormLabel>
                <FormDescription>
                  You must be legally authorized to work in the United States to be eligible for this position
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="legalRequirements.isOver18"
          render={({ field }) => (
            <FormItem className="flex flex-row space-x-3 space-y-0 items-start">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I am 18 years of age or older</FormLabel>
                <FormDescription>
                  Due to the nature of the work, applicants must be at least 18 years old
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="legalRequirements.willComplyWithBackgroundCheck"
          render={({ field }) => (
            <FormItem className="flex flex-row space-x-3 space-y-0 items-start">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree to a background check if required</FormLabel>
                <FormDescription>
                  Some positions may require a background check as a condition of employment
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="legalRequirements.canPerformPhysicalTasks"
          render={({ field }) => (
            <FormItem className="flex flex-row space-x-3 space-y-0 items-start">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I can perform the physical requirements of this position</FormLabel>
                <FormDescription>
                  This job may require lifting items up to 50 pounds, standing for extended periods, 
                  and working in various weather conditions
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="pt-4 border-t mt-8">
        <FormField
          control={control}
          name="legalRequirements.acknowledgeTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row space-x-3 space-y-0 items-start">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Terms & Conditions</FormLabel>
                <FormDescription>
                  By checking this box, I certify that all information provided is true and complete to the best of my knowledge.
                  I understand that false information or significant omissions may disqualify me from further consideration for employment
                  and may result in dismissal if discovered at a later date.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default LegalRequirementsStep;
