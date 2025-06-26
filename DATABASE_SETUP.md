# Database Setup Guide

This guide will help you set up the database tables in Supabase for the NeuroGeneration website.

## Quick Setup

1. **Login to Supabase**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign in to your account
   - Select your project

2. **Open SQL Editor**
   - In the left sidebar, click on "SQL Editor"
   - Click "New query"

3. **Run Schema Script**
   - Copy the entire contents of `supabase/schema.sql`
   - Paste it into the SQL editor
   - Click "Run" or press Cmd/Ctrl + Enter
   - You should see "Success. No rows returned"

4. **Add Demo Content (Optional)**
   - Create a new query (click "+ New query")
   - Copy the entire contents of `supabase/demo-content.sql`
   - Paste it into the SQL editor
   - Click "Run"
   - You should see "Success. 2 rows affected" (or similar)

## Verify Installation

To verify the tables were created correctly:

1. Go to "Table Editor" in the left sidebar
2. You should see these tables:
   - `posts`
   - `events`
   - `comments`

## Troubleshooting

### "relation already exists" error
This means the tables are already created. You can:
- Skip this step, or
- Drop existing tables first (WARNING: This will delete all data):
  ```sql
  DROP TABLE IF EXISTS comments CASCADE;
  DROP TABLE IF EXISTS posts CASCADE;
  DROP TABLE IF EXISTS events CASCADE;
  ```

### "permission denied" error
Make sure you're using the correct project and have admin rights.

### RLS (Row Level Security) Issues
The schema automatically enables RLS. If you're having permission issues:
1. Go to Authentication > Policies
2. Check that the policies are enabled
3. For testing, you can temporarily disable RLS (not recommended for production):
   ```sql
   ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
   ALTER TABLE events DISABLE ROW LEVEL SECURITY;
   ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
   ```

## What the Schema Creates

### Tables
1. **posts** - Blog posts with markdown content
2. **events** - Events with start/end times
3. **comments** - Comments on posts and events

### Features
- UUID primary keys
- Automatic timestamps
- Click counting
- Draft/published states
- Row Level Security policies
- Indexes for performance

## Next Steps

After setting up the database:
1. Refresh your website
2. Navigate to `/posts` or `/events`
3. If using demo content, you should see 2 posts and 2 events
4. Try the admin panel at `/admin` (password: `ng-admin-2024`)

## Need Help?

If you encounter issues:
1. Check the Supabase logs (Settings > Logs)
2. Verify your environment variables are correct
3. Ensure your Supabase project is active (not paused)