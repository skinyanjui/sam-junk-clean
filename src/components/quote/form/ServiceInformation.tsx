
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface ServiceInformationProps {
  errors: Record<string, any>;
  onFieldFocus?: (fieldName: string) => void;
}

const ServiceInformation = ({ errors, onFieldFocus }: ServiceInformationProps) => {
  const { register, watch } = useFormContext();
  
  const jobTypes = [
    'Furniture Removal',
    'Appliance Removal',
    'Construction Debris',
    'Yard Waste',
    'Estate Cleanout',
    'Office Cleanout',
    'Hot Tub Removal',
    'Other'
  ];

  const handleFieldFocus = (fieldName: string) => {
    onFieldFocus?.(fieldName);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-brand-navy">Service Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Service Address <span className="text-brand-red">*</span></Label>
          <Input
            id="address"
            placeholder="123 Main St"
            {...register("address", { required: "Address is required" })}
            className={errors.address ? "border-red-500" : ""}
            onFocus={() => handleFieldFocus('address')}
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
            onFocus={() => handleFieldFocus('city')}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            placeholder="47715"
            {...register("zipCode")}
            onFocus={() => handleFieldFocus('zipCode')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jobType">Type of Job <span className="text-brand-red">*</span></Label>
          <select
            id="jobType"
            {...register("jobType", { required: "Job type is required" })}
            className={`w-full border rounded-md p-2 ${errors.jobType ? "border-red-500" : "border-gray-300"}`}
            onFocus={() => handleFieldFocus('jobType')}
          >
            <option value="">Select job type</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.jobType && (
            <p className="text-red-500 text-sm">{errors.jobType.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description of Items</Label>
        <Textarea
          id="description"
          placeholder="Please describe the items you need removed..."
          {...register("description")}
          className="min-h-[100px]"
          onFocus={() => handleFieldFocus('description')}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="sameDay" 
          {...register("sameDay")}
          onFocusCapture={() => handleFieldFocus('sameDay')}
        />
        <Label htmlFor="sameDay" className="text-sm">
          I need same-day service (additional fees may apply)
        </Label>
      </div>
    </div>
  );
};

export default ServiceInformation;
