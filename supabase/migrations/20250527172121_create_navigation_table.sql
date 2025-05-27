CREATE TABLE public.navigation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    path TEXT NOT NULL,
    has_dropdown BOOLEAN DEFAULT false,
    parent_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_navigation_items_parent_id ON public.navigation_items(parent_id);

-- Insert data
INSERT INTO public.navigation_items (id, name, path, has_dropdown, parent_id, sort_order, is_active) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Home', '/', false, NULL, 1, true),
('b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Services', '/services', true, NULL, 2, true),
('e5f6a7b8-c9d0-1234-5678-90abcdef0123', 'Pricing', '/pricing', false, NULL, 3, true),
('f6a7b8c9-d0e1-2345-6789-0abcdef01234', 'Contact', '/contact', false, NULL, 4, true),
('a7b8c9d0-e1f2-3456-7890-bcdef0123456', 'About', '/about', false, NULL, 5, true);

-- Insert children for Services
INSERT INTO public.navigation_items (id, name, path, has_dropdown, parent_id, sort_order, is_active) VALUES
('c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'Residential', '/services/residential', false, 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 1, true),
('d4e5f6a7-b8c9-0123-4567-890abcdef012', 'Commercial', '/services/commercial', false, 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 2, true);
