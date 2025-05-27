
-- Create conversion events table
CREATE TABLE IF NOT EXISTS conversion_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    page_url TEXT NOT NULL,
    user_agent TEXT,
    referrer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_term VARCHAR(100),
    utm_content VARCHAR(100),
    session_id VARCHAR(100) NOT NULL,
    user_id UUID,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_conversion_events_event_type ON conversion_events(event_type);
CREATE INDEX IF NOT EXISTS idx_conversion_events_session_id ON conversion_events(session_id);
CREATE INDEX IF NOT EXISTS idx_conversion_events_created_at ON conversion_events(created_at);
CREATE INDEX IF NOT EXISTS idx_conversion_events_utm_source ON conversion_events(utm_source);
CREATE INDEX IF NOT EXISTS idx_conversion_events_user_id ON conversion_events(user_id);

-- Create user sessions table for session tracking
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    page_views INTEGER DEFAULT 0,
    events_count INTEGER DEFAULT 0,
    referrer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    device_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create A/B test results table
CREATE TABLE IF NOT EXISTS ab_test_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    test_id VARCHAR(100) NOT NULL,
    variant_id VARCHAR(100) NOT NULL,
    session_id VARCHAR(100) NOT NULL,
    user_id UUID,
    conversion_type VARCHAR(100),
    converted_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for A/B test results
CREATE INDEX IF NOT EXISTS idx_ab_test_results_test_id ON ab_test_results(test_id);
CREATE INDEX IF NOT EXISTS idx_ab_test_results_session_id ON ab_test_results(session_id);
CREATE INDEX IF NOT EXISTS idx_ab_test_results_converted_at ON ab_test_results(converted_at);

-- Create RLS policies for conversion events
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on conversion_events" 
ON conversion_events FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Allow authenticated read on conversion_events" 
ON conversion_events FOR SELECT 
TO authenticated 
USING (true);

-- Create RLS policies for user sessions
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on user_sessions" 
ON user_sessions FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Allow authenticated read on user_sessions" 
ON user_sessions FOR SELECT 
TO authenticated 
USING (true);

-- Create RLS policies for A/B test results
ALTER TABLE ab_test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on ab_test_results" 
ON ab_test_results FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Allow authenticated read on ab_test_results" 
ON ab_test_results FOR SELECT 
TO authenticated 
USING (true);
