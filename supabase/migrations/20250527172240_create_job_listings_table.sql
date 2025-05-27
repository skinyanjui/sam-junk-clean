CREATE TABLE public.job_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    type TEXT,
    location TEXT,
    description TEXT,
    requirements TEXT[],
    benefits TEXT[],
    is_active BOOLEAN DEFAULT true,
    posted_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_job_listings_is_active ON public.job_listings(is_active);

-- Insert data
INSERT INTO public.job_listings (id, title, type, location, description, requirements, benefits, is_active, posted_at)
VALUES (
  'abc123de-f456-7890-123a-bcdef012345a',
  'Junk Removal Specialist',
  'Full-time',
  'Evansville, IN',
  'Join our team as a Junk Removal Specialist and help customers clear their spaces of unwanted items. You''ll work directly with clients to assess their needs, provide estimates, and safely remove and dispose of items.',
  ARRAY['Valid driver''s license with clean driving record', 'Ability to lift up to 75 pounds repeatedly throughout the day', 'Excellent customer service skills', 'Attention to detail and problem-solving abilities', 'Reliable transportation to work location'],
  ARRAY['Competitive hourly wage plus tips', 'Health insurance for full-time employees', 'Paid time off', 'Flexible scheduling', 'Career advancement opportunities'],
  true,
  '2024-04-15T10:00:00Z' -- Example: Set a specific past date for posting
);

INSERT INTO public.job_listings (id, title, type, location, description, requirements, benefits, is_active, posted_at)
VALUES (
  'def456ab-c123-4567-890b-cdef012345ab',
  'Customer Service Representative',
  'Part-time',
  'Evansville, IN',
  'As a Customer Service Representative, you''ll be the first point of contact for our customers. You''ll schedule appointments, answer questions, and ensure a smooth customer experience from first call to service completion.',
  ARRAY['Excellent communication skills', 'Proficiency with computers and scheduling software', 'Ability to multitask in a fast-paced environment', 'Problem-solving mindset', 'Previous customer service experience preferred'],
  ARRAY['Competitive hourly wage', 'Flexible scheduling', 'Friendly work environment', 'Potential for advancement to full-time', 'Employee discounts'],
  true,
  '2024-04-20T11:00:00Z' -- Example: Set a specific past date for posting
);

INSERT INTO public.job_listings (id, title, type, location, description, requirements, benefits, is_active, posted_at)
VALUES (
  'ghi789cd-ef12-3456-789c-def012345abc',
  'Route Supervisor',
  'Full-time',
  'Evansville, IN',
  'Lead a team of junk removal specialists as a Route Supervisor. You''ll coordinate daily routes, ensure quality service delivery, mentor team members, and help resolve any on-site challenges that may arise.',
  ARRAY['Previous experience in junk removal or related field', 'Leadership experience preferred', 'Valid driver''s license with clean driving record', 'Strong organizational and time management skills', 'Excellent problem-solving abilities'],
  ARRAY['Competitive salary', 'Health, dental, and vision insurance', '401(k) with company match', 'Paid time off and holidays', 'Career growth opportunities'],
  true,
  '2024-04-10T09:00:00Z' -- Example: Set a specific past date for posting
);
