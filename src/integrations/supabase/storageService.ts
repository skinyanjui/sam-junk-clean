
import { supabase } from './client';

/**
 * Upload a file to Supabase storage
 * @param folder The folder path within the bucket (e.g., 'avatars', 'products')
 * @param file The file to upload
 * @param options Optional upload options
 * @returns URL of the uploaded file or null if upload failed
 */
export async function uploadFile(
  folder: string,
  file: File,
  options?: { bucketName?: string }
): Promise<string | null> {
  try {
    const bucketName = options?.bucketName || 'public';
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);
      
    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }
    
    // Get the public URL
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
      
    return data?.publicUrl || null;
  } catch (error) {
    console.error('File upload failed:', error);
    return null;
  }
}

/**
 * Delete a file from Supabase storage
 * @param path The path to the file (including folder)
 * @param options Optional delete options
 * @returns true if deletion was successful, false otherwise
 */
export async function deleteFile(
  path: string,
  options?: { bucketName?: string }
): Promise<boolean> {
  try {
    const bucketName = options?.bucketName || 'public';
    
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([path]);
      
    return !error;
  } catch (error) {
    console.error('File deletion failed:', error);
    return false;
  }
}
