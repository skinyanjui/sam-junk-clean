
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
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white text-lg font-bold tracking-wide py-6 shadow-lg transition-all duration-300 hover:scale-[1.01] border border-brand-red/20"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : "Request Free Estimate"}
      </Button>
      
      <p className="text-sm text-gray-500 text-center mt-4">
        By submitting this form, you agree to our{' '}
        <Link to="/terms" className="text-brand-navy font-medium hover:text-brand-red transition-colors">Terms of Service</Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-brand-navy font-medium hover:text-brand-red transition-colors">Privacy Policy</Link>.
      </p>
    </>
  );
};

export default FormFooter;
