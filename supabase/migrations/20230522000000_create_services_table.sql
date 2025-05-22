
-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  items JSONB NOT NULL,
  image TEXT NOT NULL,
  popularity TEXT CHECK (popularity IN ('high', 'medium', 'low')),
  price_range TEXT,
  time_estimate TEXT,
  benefits JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create related blogs table
CREATE TABLE IF NOT EXISTS public.service_related_blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create related services table
CREATE TABLE IF NOT EXISTS public.service_related_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  related_service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  PRIMARY KEY (service_id, related_service_id)
);

-- Add RLS policies
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.services FOR SELECT USING (true);

ALTER TABLE public.service_related_blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.service_related_blogs FOR SELECT USING (true);

ALTER TABLE public.service_related_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.service_related_services FOR SELECT USING (true);
