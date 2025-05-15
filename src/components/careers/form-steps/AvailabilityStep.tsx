
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ApplicationFormValues } from '../types/ApplicationFormValues';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const AvailabilityStep: React.FC = () => {
  const { control, watch } = useFormContext<ApplicationFormValues>();
  
  const hasDriverLicense = watch('availability.hasDriverLicense');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-brand-navy" />
        <h3 className="text-lg font-medium">Availability & Requirements</h3>
      </div>
      
      <FormField
        control={control}
        name="availability.workType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>What type of employment are you looking for?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="full_time" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Full-time
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="part_time" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Part-time
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="contract" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Contract
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="temporary" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Temporary
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="availability.earliestStartDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>When can you start?</FormLabel>
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
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Select the earliest date you could begin working if offered a position
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="availability.preferredSchedule"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Schedule (Optional)</FormLabel>
            <FormControl>
              <Input 
                placeholder="E.g., Weekdays only, evenings, weekends, etc." 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Let us know if you have any specific schedule preferences or limitations
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="border-t pt-6 mt-6">
        <h4 className="text-base font-medium mb-4">Transportation Requirements</h4>

        <Controller
          control={control}
          name="availability.hasDriverLicense"
          render={({ field }) => (
            <FormItem className="flex flex-row space-x-3 space-y-0 items-start">
              <FormControl>
                <Checkbox
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I have a valid driver's license</FormLabel>
                <FormDescription>
                  Some positions require a valid driver's license
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {hasDriverLicense && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Controller
              control={control}
              name="availability.driverLicenseState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver's License State</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value || ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="AK">Alaska</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      <SelectItem value="AR">Arkansas</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                      <SelectItem value="CT">Connecticut</SelectItem>
                      <SelectItem value="DE">Delaware</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="GA">Georgia</SelectItem>
                      <SelectItem value="HI">Hawaii</SelectItem>
                      <SelectItem value="ID">Idaho</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                      <SelectItem value="IN">Indiana</SelectItem>
                      <SelectItem value="IA">Iowa</SelectItem>
                      <SelectItem value="KS">Kansas</SelectItem>
                      <SelectItem value="KY">Kentucky</SelectItem>
                      <SelectItem value="LA">Louisiana</SelectItem>
                      <SelectItem value="ME">Maine</SelectItem>
                      <SelectItem value="MD">Maryland</SelectItem>
                      <SelectItem value="MA">Massachusetts</SelectItem>
                      <SelectItem value="MI">Michigan</SelectItem>
                      <SelectItem value="MN">Minnesota</SelectItem>
                      <SelectItem value="MS">Mississippi</SelectItem>
                      <SelectItem value="MO">Missouri</SelectItem>
                      <SelectItem value="MT">Montana</SelectItem>
                      <SelectItem value="NE">Nebraska</SelectItem>
                      <SelectItem value="NV">Nevada</SelectItem>
                      <SelectItem value="NH">New Hampshire</SelectItem>
                      <SelectItem value="NJ">New Jersey</SelectItem>
                      <SelectItem value="NM">New Mexico</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="NC">North Carolina</SelectItem>
                      <SelectItem value="ND">North Dakota</SelectItem>
                      <SelectItem value="OH">Ohio</SelectItem>
                      <SelectItem value="OK">Oklahoma</SelectItem>
                      <SelectItem value="OR">Oregon</SelectItem>
                      <SelectItem value="PA">Pennsylvania</SelectItem>
                      <SelectItem value="RI">Rhode Island</SelectItem>
                      <SelectItem value="SC">South Carolina</SelectItem>
                      <SelectItem value="SD">South Dakota</SelectItem>
                      <SelectItem value="TN">Tennessee</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="UT">Utah</SelectItem>
                      <SelectItem value="VT">Vermont</SelectItem>
                      <SelectItem value="VA">Virginia</SelectItem>
                      <SelectItem value="WA">Washington</SelectItem>
                      <SelectItem value="WV">West Virginia</SelectItem>
                      <SelectItem value="WI">Wisconsin</SelectItem>
                      <SelectItem value="WY">Wyoming</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="availability.driverLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver's License Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="License number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Controller
          control={control}
          name="availability.hasReliableTransportation"
          render={({ field }) => (
            <FormItem className="flex flex-row space-x-3 space-y-0 items-start mt-4">
              <FormControl>
                <Checkbox
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I have reliable transportation</FormLabel>
                <FormDescription>
                  Confirm that you have reliable transportation to get to job sites
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AvailabilityStep;
