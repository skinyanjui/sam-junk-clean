
import { supabase } from './client';

export async function createBucketIfNotExists(bucketName: string) {
  // Check if the bucket exists
  const { data: bucketExists, error: checkError } = await supabase.storage.getBucket(bucketName);
  
  if (!bucketExists && checkError) {
    // Create the bucket if it doesn't exist
    const { error: createError } = await supabase.storage.createBucket(bucketName, {
      public: true  // Make bucket publicly accessible
    });
    
    if (createError) {
      console.error(`Error creating bucket ${bucketName}:`, createError);
      throw createError;
    }
  }
}

export async function uploadFile(
  bucketName: string, 
  file: File, 
  path?: string
): Promise<string> {
  try {
    // Ensure the bucket exists
    await createBucketIfNotExists(bucketName);
    
    // Create a unique file name to avoid collisions
    const fileName = path 
      ? `${path}/${Date.now()}_${file.name}`
      : `${Date.now()}_${file.name}`;
    
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);
      
    if (uploadError) {
      throw uploadError;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);
      
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}
