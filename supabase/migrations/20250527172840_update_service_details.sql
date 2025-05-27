-- Update "Residential Junk Removal"
UPDATE public.services
SET
    description = 'Our comprehensive residential junk removal service helps you reclaim your space. Whether you''re decluttering, preparing for a move, or clearing out an estate, our professional team handles all types of household junk. We efficiently remove furniture, appliances, electronics, yard waste, and general clutter from anywhere on your property – attics, basements, garages, or backyards. We prioritize eco-friendly disposal, including donation and recycling, to minimize landfill impact.',
    items = ARRAY['Full house cleanouts', 'Single item removal', 'Garage & attic cleanouts', 'Basement cleanups', 'Moving & relocation junk', 'Old carpeting and rugs', 'Exercise equipment', 'Childrens play-sets and toys', 'General household clutter']
WHERE id = 'e0a1b2c3-d4e5-f6a7-8901-234567890abc';

-- Update "Construction Debris Removal"
UPDATE public.services
SET
    description = 'Keep your construction or renovation site safe and efficient with our reliable debris removal service. We specialize in hauling away materials like wood scraps, drywall, concrete, tiling, and roofing materials. Our team works quickly to clear your site, allowing your project to proceed smoothly. We are equipped for both small home renovations and larger commercial construction projects, ensuring responsible disposal of all debris.',
    items = ARRAY['Wood & lumber scraps', 'Drywall & plaster', 'Concrete & brick', 'Tile & flooring', 'Shingles and roofing materials', 'Windows and doors', 'Piping and electrical waste', 'Insulation materials', 'Packaging materials']
WHERE id = 'ec03b4c5-d6e7-f8a9-0123-ef0123456789';

-- Update "Furniture Removal"
UPDATE public.services
SET
    description = 'Need to get rid of old or unwanted furniture? Uncle Sam Junk Removal makes it easy. We carefully remove sofas, couches, beds, mattresses, dressers, tables, chairs, cabinets, and more. Our team will navigate stairs and tight spaces, protecting your property. We emphasize sustainable disposal, partnering with local charities for donations and recycling centers whenever possible.',
    items = ARRAY['Sofas & couches', 'Sectionals', 'Beds & mattresses', 'Box springs', 'Tables & chairs', 'Dressers and nightstands', 'Cabinets & shelving', 'Office furniture (desks, chairs, cubicles)', 'Patio furniture']
WHERE id = 'a2c3d4e5-f6a7-b8c9-0123-4567890abcde';
