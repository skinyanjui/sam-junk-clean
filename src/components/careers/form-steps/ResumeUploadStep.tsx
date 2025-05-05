
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from '../JobApplicationForm';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Loader, AlertTriangle, FileText, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResumeUploadStep = () => {
  const { control, setValue, watch } = useFormContext<ApplicationFormValues>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileUrl = watch('resume.fileUrl');
  const resumeLink = watch('resume.resumeLink');
  
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    
    if (!file) return;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError(`File must be in ${ALLOWED_FILE_EXTENSIONS.join(', ')} format`);
      toast({
        title: "Invalid file type",
        description: `Please upload a ${ALLOWED_FILE_EXTENSIONS.join(' or ')} file`,
        variant: "destructive"
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5MB limit');
      toast({
        title: "File too large",
        description: "Please upload a file under 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // In a real implementation, you would upload the file to your server or cloud storage
    // For now, we'll simulate the upload with a setTimeout
    setTimeout(() => {
      // In a real app, this would be the URL from your file upload service
      const mockFileUrl = URL.createObjectURL(file);
      setValue('resume.fileUrl', mockFileUrl);
      setIsLoading(false);
    }, 1000);
  };

  const removeFile = () => {
    setValue('resume.fileUrl', '');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Upload Your Resume</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Upload Resume (PDF, DOC, DOCX)</Label>
          <div className={`flex items-center justify-center border-2 ${error ? 'border-red-400' : 'border-gray-300'} border-dashed rounded-md p-6`}>
            <div className="space-y-2 text-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Loader className="h-12 w-12 text-brand-navy animate-spin" />
                  <p className="text-sm text-gray-600">Processing file...</p>
                </div>
              ) : fileUrl ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="h-10 w-10 text-brand-navy" />
                    <div className="text-left">
                      <p className="font-medium">Resume uploaded</p>
                      <p className="text-sm text-gray-500">Your resume has been successfully uploaded</p>
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={removeFile}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Remove File
                  </Button>
                </div>
              ) : (
                <>
                  {error ? (
                    <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
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
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                  {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        <FormField
          control={control}
          name="resume.resumeLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume Link</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://drive.google.com/your-resume" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide a link to your resume (Google Drive, Dropbox, OneDrive, etc.)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ResumeUploadStep;
