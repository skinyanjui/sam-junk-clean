
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Loader, AlertTriangle, FileImage, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const ImageUpload = ({ imagePreview, onImageChange, onImageRemove }: ImageUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    
    if (!file) return;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError('File must be PNG or JPG format');
      toast({
        title: "Invalid file type",
        description: "Please upload a PNG or JPG image",
        variant: "destructive"
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5MB limit');
      toast({
        title: "File too large",
        description: "Please upload an image under 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate processing delay (remove in production)
    setTimeout(() => {
      onImageChange(e);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-2">
      <Label>Upload Image (Optional)</Label>
      <div className={`flex items-center justify-center border-2 ${error ? 'border-red-400' : 'border-gray-300'} border-dashed rounded-md p-6`}>
        <div className="space-y-2 text-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Loader className="h-12 w-12 text-brand-navy animate-spin" />
              <p className="text-sm text-gray-600">Processing image...</p>
            </div>
          ) : imagePreview ? (
            <div className="space-y-4">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="mx-auto h-32 object-contain"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={onImageRemove}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Remove Image
              </Button>
            </div>
          ) : (
            <>
              {error ? (
                <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
              ) : (
                <FileImage className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-brand-navy hover:text-brand-red"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
