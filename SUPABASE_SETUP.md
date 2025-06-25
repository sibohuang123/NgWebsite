# Supabase Setup Tutorial

This tutorial will guide you through setting up Supabase for your Next.js project.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign up"
3. You can sign up with GitHub, or create an account with email

## Step 2: Create a New Project

1. Once logged in, click "New project"
2. Fill in the project details:
   - **Name**: Choose a name for your project (e.g., "NgWebsite")
   - **Database Password**: Generate a strong password (save this securely!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is perfect for development

3. Click "Create new project" and wait for setup (takes about 2 minutes)

## Step 3: Get Your API Keys

1. Once your project is ready, go to the "Settings" page (gear icon in sidebar)
2. Click on "API" in the settings menu
3. You'll find two important values:
   - **Project URL**: This is your `SUPABASE_URL`
   - **Project API keys - anon/public**: This is your `SUPABASE_ANON_KEY`

## Step 4: Configure Your Local Environment

1. Copy the `.env.local.example` file to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   Example (with fake values):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Step 5: Test Your Connection

1. Start your development server:
   ```bash
   yarn dev
   ```

2. Your Supabase client is now configured and ready to use!

## Optional: Database Setup

If you want to set up tables:

1. Go to the "Table Editor" in your Supabase dashboard
2. Click "Create a new table"
3. Example table for a blog:
   ```sql
   -- Example: Posts table
   create table posts (
     id uuid default gen_random_uuid() primary key,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     title text not null,
     content text,
     author_id uuid references auth.users(id)
   );
   ```

## Using Supabase in Your Code

Example of fetching data:

```typescript
// src/app/posts/page.tsx
import { supabase } from '@/lib/supabase'

async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  
  return data || []
}
```

## Security Notes

- The `anon/public` key is safe to use in client-side code
- Never expose your `service_role` key (found in dashboard)
- Use Row Level Security (RLS) for data protection
- Enable RLS on all tables: `ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;`

## Next Steps

1. Set up authentication if needed
2. Create your database schema
3. Enable Row Level Security policies
4. Check out the [Supabase docs](https://supabase.com/docs) for more features

## Troubleshooting

- **Connection refused**: Check that your URL and key are correct
- **CORS errors**: Make sure your URL includes `https://`
- **Empty data**: Check RLS policies or temporarily disable RLS for testing