-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Posts table
CREATE TABLE posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tag VARCHAR(100),
    published_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_draft BOOLEAN DEFAULT false,
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tag VARCHAR(100),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTERVAL NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE GENERATED ALWAYS AS (start_date + duration) STORED,
    is_draft BOOLEAN DEFAULT false,
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    author_name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_single_reference CHECK (
        (post_id IS NOT NULL AND event_id IS NULL) OR
        (post_id IS NULL AND event_id IS NOT NULL)
    )
);

-- Indexes for better performance
CREATE INDEX idx_posts_published_date ON posts(published_date DESC);
CREATE INDEX idx_posts_is_draft ON posts(is_draft);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_is_draft ON events(is_draft);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_event_id ON comments(event_id);

-- Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies for public read access to published content
CREATE POLICY "Public can view published posts" ON posts
    FOR SELECT USING (is_draft = false);

CREATE POLICY "Public can view published events" ON events
    FOR SELECT USING (is_draft = false);

CREATE POLICY "Public can view all comments" ON comments
    FOR SELECT USING (true);

CREATE POLICY "Public can create comments" ON comments
    FOR INSERT WITH CHECK (true);

-- Admin policies (will be updated when auth is implemented)
CREATE POLICY "Admins can do everything with posts" ON posts
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can do everything with events" ON events
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can delete comments" ON comments
    FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to update the updated_at column
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment click count
CREATE OR REPLACE FUNCTION increment_click_count(table_name TEXT, item_id UUID)
RETURNS VOID AS $$
BEGIN
    IF table_name = 'posts' THEN
        UPDATE posts SET click_count = click_count + 1 WHERE id = item_id;
    ELSIF table_name = 'events' THEN
        UPDATE events SET click_count = click_count + 1 WHERE id = item_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;