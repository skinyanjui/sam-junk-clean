
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

const ImageUpload = ({ imagePreview, onImageChange, onImageRemove }: ImageUploadProps) => {
  return (
    <div className="space-y-2">
      <Label>Upload Image (Optional)</Label>
      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
        <div className="space-y-2 text-center">
          {imagePreview ? (
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
              >
                Remove Image
              </Button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
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
                    accept="image/*"
                    className="sr-only"
                    onChange={onImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
