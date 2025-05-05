
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface ServiceInformationProps {
  errors: Record<string, any>;
}

const ServiceInformation = ({ errors }: ServiceInformationProps) => {
  const { register } = useFormContext();
  
  const jobTypes = [
    'Residential Junk Removal',
    'Commercial Junk Removal',
    'Appliance Removal',
    'Light Demolition',
    'Estate Cleanout',
    'Curbside Pickup',
    'Other'
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-brand-navy">Service Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Address <span className="text-brand-red">*</span></Label>
          <Input
            id="address"
            placeholder="123 Main St"
            {...register("address", { required: "Address is required" })}
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">City <span className="text-brand-red">*</span></Label>
          <Input
            id="city"
            placeholder="Evansville"
            {...register("city", { required: "City is required" })}
            className={errors.city ? "border-red-500" : ""}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="jobType">Job Type <span className="text-brand-red">*</span></Label>
        <select
          id="jobType"
          {...register("jobType", { required: "Job type is required" })}
          className={`w-full border ${errors.jobType ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
        >
          <option value="">Select a job type</option>
          {jobTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.jobType && (
          <p className="text-red-500 text-sm">{errors.jobType.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          placeholder="Please describe what items you need removed and any special considerations..."
          {...register("description")}
          rows={4}
        />
      </div>
      
      <div className="flex items-start space-x-2">
        <Checkbox id="sameDay" {...register("sameDay")} />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="sameDay"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            I need same-day service if possible
          </label>
        </div>
      </div>
    </div>
  );
};

export default ServiceInformation;
