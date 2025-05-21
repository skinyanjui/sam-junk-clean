
import { supabase } from './client';

/**
 * Uploads a file to Supabase Storage
 * 
 * @param bucketName The storage bucket name (e.g., 'avatars', 'quote-images')
 * @param file The file object to upload
 * @returns A promise that resolves to the file URL or null if upload fails
 */
export async function uploadFile(bucketName: string, file: File): Promise<string | null> {
  try {
    // Create a unique file path using timestamp and original file name
    const timestamp = new Date().getTime();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9-.]/g, '_');
    const filePath = `${timestamp}-${cleanFileName}`;
    
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error || !data) {
      console.error('Error uploading file:', error);
      return null;
    }
    
    // Generate a public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);
    
    return publicUrl;
  } catch (error) {
    console.error('Storage upload error:', error);
    return null;
  }
}

/**
 * Create a storage bucket if it doesn't exist
 * Note: This requires admin privileges and should be run server-side or during setup
 * 
 * @param bucketName The name of the bucket to create
 * @param isPublic Whether the bucket should be publicly accessible
 */
export async function createStorageBucket(bucketName: string, isPublic: boolean = false): Promise<void> {
  try {
    const { error } = await supabase.storage.createBucket(bucketName, {
      public: isPublic
    });
    
    if (error) {
      console.error(`Error creating bucket '${bucketName}':`, error);
    }
  } catch (error) {
    console.error(`Failed to create bucket '${bucketName}':`, error);
  }
}

/**
 * Delete a file from Supabase Storage
 * 
 * @param bucketName The storage bucket name
 * @param filePath The path to the file within the bucket
 * @returns A promise that resolves to true if deletion was successful
 */
export async function deleteFile(bucketName: string, filePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Storage delete error:', error);
    return false;
  }
}
