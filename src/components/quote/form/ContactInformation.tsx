
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneFormField } from '@/components/forms/fields/PhoneFormField';

interface ContactInformationProps {
  errors: Record<string, any>;
}

const ContactInformation = ({ errors }: ContactInformationProps) => {
  const { register } = useFormContext();
  
  const contactPreferences = [
    'Email',
    'Phone',
    'Text Message'
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-brand-navy">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name <span className="text-brand-red">*</span></Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name", { required: "Name is required" })}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email <span className="text-brand-red">*</span></Label>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            {...register("email", { required: "Email is required", pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }})}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number <span className="text-brand-red">*</span></Label>
          <PhoneFormField
            id="phone"
            label=""
            placeholder="(812) 610-1657"
            register={register("phone", { required: "Phone number is required" })}
            error={errors.phone?.message}
            inputBorderClass={errors.phone ? "border-red-500" : ""}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactPreference">Preferred Contact Method</Label>
          <select
            id="contactPreference"
            {...register("contactPreference")}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            {contactPreferences.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
