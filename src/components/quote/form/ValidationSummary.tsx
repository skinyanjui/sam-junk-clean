
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ValidationSummaryProps {
  errors: Record<string, any>;
  isSubmitted: boolean;
}

const ValidationSummary = ({ errors, isSubmitted }: ValidationSummaryProps) => {
  if (!isSubmitted || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Please fix the following errors:</AlertTitle>
      <AlertDescription className="mt-2">
        <ul className="ml-6 list-disc text-sm">
          {errors.name && <li>Name: {errors.name.message}</li>}
          {errors.email && <li>Email: {errors.email.message}</li>}
          {errors.phone && <li>Phone: {errors.phone.message}</li>}
          {errors.address && <li>Address: {errors.address.message}</li>}
          {errors.city && <li>City: {errors.city.message}</li>}
          {errors.jobType && <li>Job Type: {errors.jobType.message}</li>}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default ValidationSummary;
