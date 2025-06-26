# NeuroGeneration Website Setup Instructions

## Prerequisites
- Node.js 18+ installed
- Supabase account created
- Git installed

## Setup Steps

### 1. Install Dependencies
```bash
yarn install
```

### 2. Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy your project URL and anon key
4. Update `.env.local` with your values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. Set Up Database

1. In Supabase dashboard, go to SQL Editor
2. Create a new query and paste the contents of `supabase/schema.sql`
3. Run the query to create all tables and functions

### 4. Add Demo Content (Optional)

1. In SQL Editor, create another query
2. Paste the contents of `supabase/demo-content.sql`
3. Run the query to insert demo posts and events

### 5. Enable Row Level Security

Make sure RLS is enabled for all tables. The schema.sql file includes the necessary policies.

### 6. Run the Development Server

```bash
yarn dev
```

Visit http://localhost:3000 to see the website.

## Admin Access

The admin password is set in `/src/lib/auth.tsx`. Default is: `ng-admin-2024`

To access admin features:
1. Go to http://localhost:3000/admin
2. Enter the admin password
3. You'll be redirected to the admin dashboard

## Features Overview

### Public Features
- View posts and events
- Search functionality
- Comment on posts/events
- Dark/light theme toggle
- Responsive design

### Admin Features
- Create/edit/delete posts and events
- Manage drafts
- View analytics (views, comments)
- Delete comments
- Markdown editor with LaTeX support

## Troubleshooting

### Theme not switching
- Clear browser cache
- Check console for errors
- Ensure JavaScript is enabled

### Database connection issues
- Verify Supabase credentials in `.env.local`
- Check Supabase project is active
- Ensure RLS policies are correctly set

### Admin login not working
- Check the password in `/src/lib/auth.tsx`
- Clear localStorage
- Try in incognito mode

## Production Deployment

For production:
1. Use proper authentication (Supabase Auth)
2. Set secure admin credentials
3. Configure proper CORS settings
4. Use environment variables for all secrets
5. Enable proper logging and monitoring

## Technology Stack
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- React Markdown with LaTeX support