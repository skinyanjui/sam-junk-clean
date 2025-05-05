
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface FormFooterProps {
  isSubmitting: boolean;
}

const FormFooter = ({ isSubmitting }: FormFooterProps) => {
  return (
    <>
      <Button 
        type="submit" 
        className="w-full bg-brand-red hover:bg-opacity-90 text-lg py-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Request Free Estimate"}
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        By submitting this form, you agree to our{' '}
        <Link to="/terms" className="text-brand-navy hover:underline">Terms of Service</Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-brand-navy hover:underline">Privacy Policy</Link>.
      </p>
    </>
  );
};

export default FormFooter;
