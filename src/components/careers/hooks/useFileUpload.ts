
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (
    file: File,
    bucket: string,
    folderPath: string
  ): Promise<string | null> => {
    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folderPath}/${fileName}`;
      
      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);
        
      if (error) {
        throw error;
      }
      
      // Get the public URL for the uploaded file
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
        
      setIsUploading(false);
      
      if (data && data.publicUrl) {
        return data.publicUrl;
      }
      
      return null;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "File Upload Failed",
        description: "There was a problem uploading your file.",
        variant: "destructive"
      });
      setIsUploading(false);
      return null;
    }
  };

  return {
    isUploading,
    uploadFile
  };
}
