# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

**Project**: NeuroGeneration (NG) - Teen Health Organization Website
**Stack**: Next.js 15 + TypeScript + Supabase + Tailwind CSS
**Theme**: Purple-based design with dark/light mode

### Essential Commands

```bash
# Development
yarn dev          # Start dev server on localhost:3000

# Build & Production
yarn build        # Build for production
yarn start        # Start production server

# Code Quality
yarn lint         # Run ESLint

# Deployment
./deploy.sh       # Deploy to VPS/Cloud (requires setup)
```

### Project Structure

```
src/
├── app/          # Next.js App Router pages
│   ├── admin/    # Admin dashboard (password: ng-admin-2024)
│   ├── posts/    # Blog posts with Markdown + LaTeX
│   └── events/   # Event management
├── components/   # Reusable React components
├── lib/          # Utilities (db.ts, utils.ts)
└── types/        # TypeScript definitions
```

## Environment Variables

Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ADMIN_PASSWORD=ng-admin-2024  # Change in production!
```

## Database Setup

**IMPORTANT**: Use `supabase/schema-clean.sql` (NOT `schema.sql`) to avoid PostgreSQL compatibility issues.

1. Create Supabase project at https://supabase.com
2. Run the schema:
   ```sql
   -- In Supabase SQL Editor, run:
   supabase/schema-clean.sql
   ```
3. (Optional) Insert demo data from `supabase/demo-data.sql`

### Common Database Issues

- **Foreign key errors**: Check UUID format and ensure referenced records exist
- **RLS policy issues**: Temporarily disable RLS during initial setup
- **Timestamp errors**: Use ISO 8601 format (YYYY-MM-DD HH:MM:SS)

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
# Add environment variables in Vercel dashboard
```

### VPS/Cloud Deployment
```bash
# Edit deploy.sh with your server details
chmod +x deploy.sh
./deploy.sh
```

The deployment script handles:
- Building the production bundle
- Copying files via rsync
- Installing dependencies
- Restarting PM2 process

## Key Architectural Decisions

1. **App Router**: Using Next.js 15 App Router for all routes
2. **Client Components**: Forms and interactive elements use "use client"
3. **Database**: Supabase with RLS policies (admin operations bypass RLS)
4. **Styling**: Tailwind with custom purple theme and animations
5. **Content**: Markdown with KaTeX for LaTeX math rendering

## Important Notes

- Admin password (`ng-admin-2024`) must be changed in production
- All database tables use UUID primary keys
- Comments system uses moderation (approved/pending status)
- Click tracking increments view counts on posts and events
- Dark mode persists via localStorage

## Common Development Tasks

### Adding a New Page
1. Create file in `src/app/[route]/page.tsx`
2. Use existing pages as templates (they follow consistent patterns)
3. Import shared components from `src/components/`

### Modifying Database Schema
1. Update `supabase/schema-clean.sql`
2. Test locally first
3. Apply migrations carefully in production

### Styling Conventions
- Use Tailwind classes exclusively
- Follow the purple theme: `purple-600` (primary), `purple-700` (hover)
- Dark mode: Use `dark:` prefix for all color utilities
- Animations: Use predefined animations in `tailwind.config.ts`