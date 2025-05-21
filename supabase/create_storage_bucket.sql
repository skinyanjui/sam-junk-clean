
-- Create a storage bucket for quote images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'quote-images', 'quote-images', true
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'quote-images'
);

-- Allow public read access to files
CREATE POLICY "Public Access for Quote Images" 
ON storage.objects
FOR SELECT
USING (bucket_id = 'quote-images');

-- Allow authenticated uploads
CREATE POLICY "Allow Anyone to Upload Quote Images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'quote-images');

-- Allow owners to update their own files
CREATE POLICY "Allow Anyone to Update Own Quote Images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'quote-images');

-- Allow owners to delete their own files
CREATE POLICY "Allow Anyone to Delete Own Quote Images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'quote-images');
