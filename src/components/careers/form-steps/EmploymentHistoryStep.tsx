
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ApplicationFormValues } from '../types/ApplicationFormValues';
import { Briefcase, CalendarIcon, Plus, Trash2 } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const EmploymentHistoryStep = () => {
  const { control, watch } = useFormContext<ApplicationFormValues>();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employmentHistory',
  });

  const watchIsCurrentJob = watch("employmentHistory")?.map(job => job.isCurrentJob) || [];

  const addEmployment = () => {
    append({
      employer: '',
      jobTitle: '',
      startDate: undefined,
      endDate: undefined,
      isCurrentJob: false,
      description: '', // Changed from responsibilities to description to match the type
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Employment History</h3>
        <Button
          type="button"
          variant="outline" 
          size="sm"
          onClick={addEmployment}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Job
        </Button>
      </div>

      <div className="space-y-8">
        {fields.length === 0 && (
          <div className="text-center p-6 bg-gray-50 rounded-md">
            <Briefcase className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h4 className="font-medium text-gray-600">No employment history added</h4>
            <p className="text-sm text-gray-500 mb-4">Add your work experience to help us understand your background</p>
            <Button
              type="button"
              onClick={addEmployment}
              className="bg-brand-navy hover:bg-opacity-90"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Employment
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
                name={`employmentHistory.${index}.employer`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer/Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name={`employmentHistory.${index}.jobTitle`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Your position" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                control={control}
                name={`employmentHistory.${index}.startDate`}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              typeof field.value === 'string' 
                                ? field.value 
                                : format(field.value, "MMM yyyy")
                            ) : (
                              <span>Select date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value instanceof Date ? field.value : undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <FormField
                  control={control}
                  name={`employmentHistory.${index}.isCurrentJob`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-7">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I currently work here</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                {!watchIsCurrentJob[index] && (
                  <FormField
                    control={control}
                    name={`employmentHistory.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  typeof field.value === 'string' 
                                    ? field.value 
                                    : format(field.value, "MMM yyyy")
                                ) : (
                                  <span>Select date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value instanceof Date ? field.value : undefined}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            <FormField
              control={control}
              name={`employmentHistory.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibilities & Achievements</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your key responsibilities, achievements, and relevant skills..."
                      className="min-h-[100px]" 
                      value={field.value || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        {fields.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={addEmployment}
            className="w-full flex items-center justify-center gap-1 mt-2"
          >
            <Plus className="h-4 w-4" /> Add Another Job
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmploymentHistoryStep;
