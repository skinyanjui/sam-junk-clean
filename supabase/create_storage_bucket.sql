
-- This can be run manually if needed to create a public storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Set bucket public policy
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Public Policy',
  '{"version":"1.0","statements":[{"effect":"allow","principal":"*","action":"*","resource":"*"}]}',
  'public'
)
ON CONFLICT (name, bucket_id) DO NOTHING;
