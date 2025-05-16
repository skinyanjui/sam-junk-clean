
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PricingTier } from '@/integrations/supabase/pricingService';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ServiceInformationProps {
  errors: Record<string, any>;
  pricingTiers?: PricingTier[];
}

const ServiceInformation = ({ errors, pricingTiers = [] }: ServiceInformationProps) => {
  const { register, setValue, getValues, watch } = useFormContext();
  const [loadedPricingTiers, setLoadedPricingTiers] = useState<PricingTier[]>(pricingTiers);
  const [isLoadingTiers, setIsLoadingTiers] = useState(pricingTiers.length === 0);
  
  // If pricing tiers weren't passed as props, fetch them
  useEffect(() => {
    const fetchPricingData = async () => {
      if (pricingTiers.length === 0) {
        try {
          setIsLoadingTiers(true);
          const { data, error } = await supabase
            .from('pricing_tiers')
            .select('*')
            .order('sort_order');
            
          if (error) throw error;
          setLoadedPricingTiers(data || []);
        } catch (err) {
          console.error('Failed to load pricing tiers:', err);
        } finally {
          setIsLoadingTiers(false);
        }
      }
    };
    
    fetchPricingData();
  }, [pricingTiers]);
  
  const jobTypes = [
    'Residential Junk Removal',
    'Commercial Junk Removal',
    'Appliance Removal',
    'Light Demolition',
    'Estate Cleanout',
    'Garage Cleanout',
    'Yard Debris Removal',
    'Construction Debris',
    'Other'
  ];

  // Register the pricingTierId field
  useEffect(() => {
    register('pricingTierId');
  }, [register]);
  
  // Handle pricing tier selection
  const handleTierChange = (value: string) => {
    setValue('pricingTierId', value);
  };
  
  const selectedTierId = watch('pricingTierId');

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            placeholder="47708"
            {...register("zipCode")}
          />
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
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="pricingTier">Estimated Load Size</Label>
        <Select value={selectedTierId} onValueChange={handleTierChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isLoadingTiers ? "Loading pricing options..." : "Select load size"} />
          </SelectTrigger>
          <SelectContent>
            {loadedPricingTiers.map(tier => (
              <SelectItem key={tier.id} value={tier.id}>
                {tier.tier_name} ({tier.price_display})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          Not sure? Don't worry, we'll provide an exact quote after reviewing your request.
        </p>
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
