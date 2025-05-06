
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ApplicationFormValues } from '../types/ApplicationFormValues';
import { School, Plus, Trash2 } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EducationStep = () => {
  const { control } = useFormContext<ApplicationFormValues>();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const addEducation = () => {
    append({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      graduationYear: undefined, // Changed from '' to undefined to fix type error
    });
  };

  // Generate years for dropdown (from current year back 80 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => (currentYear - i));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Education</h3>
        <Button
          type="button"
          variant="outline" 
          size="sm"
          onClick={addEducation}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </div>

      <div className="space-y-8">
        {fields.length === 0 && (
          <div className="text-center p-6 bg-gray-50 rounded-md">
            <School className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h4 className="font-medium text-gray-600">No education added</h4>
            <p className="text-sm text-gray-500 mb-4">Add your educational background</p>
            <Button
              type="button"
              onClick={addEducation}
              className="bg-brand-navy hover:bg-opacity-90"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Education
            </Button>
          </div>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md relative">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                control={control}
                name={`education.${index}.institution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School/Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="School or university name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name={`education.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree/Certificate</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select degree type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="High School Diploma">High School Diploma</SelectItem>
                        <SelectItem value="GED">GED</SelectItem>
                        <SelectItem value="Associate's">Associate's Degree</SelectItem>
                        <SelectItem value="Bachelor's">Bachelor's Degree</SelectItem>
                        <SelectItem value="Master's">Master's Degree</SelectItem>
                        <SelectItem value="Doctorate">Doctorate</SelectItem>
                        <SelectItem value="Certificate">Certificate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`education.${index}.fieldOfStudy`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="Major or concentration" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name={`education.${index}.graduationYear`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Year</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(value === 'Current' ? value : Number(value))} 
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Current">Currently Enrolled</SelectItem>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        {fields.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={addEducation}
            className="w-full flex items-center justify-center gap-1 mt-2"
          >
            <Plus className="h-4 w-4" /> Add Another Education
          </Button>
        )}
      </div>
    </div>
  );
};

export default EducationStep;
