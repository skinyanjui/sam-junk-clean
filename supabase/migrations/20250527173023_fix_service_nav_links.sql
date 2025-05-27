-- Update path for "Residential" navigation item
UPDATE public.navigation_items
SET path = '/services#e0a1b2c3-d4e5-f6a7-8901-234567890abc' -- Path to Residential Junk Removal service section
WHERE id = 'c3d4e5f6-a7b8-9012-3456-7890abcdef01'; -- UUID of the 'Residential' navigation item

-- Update path for "Commercial" navigation item
UPDATE public.navigation_items
SET path = '/services#f1b2c3d4-e5f6-a7b8-9012-34567890abcd' -- Path to Commercial Junk Removal service section
WHERE id = 'd4e5f6a7-b8c9-0123-4567-890abcdef012'; -- UUID of the 'Commercial' navigation item
