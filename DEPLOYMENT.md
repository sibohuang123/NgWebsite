# NeuroGeneration Website Deployment Guide

## Pre-Deployment Checklist

- [ ] Supabase Production Setup
  - [ ] Create production Supabase project
  - [ ] Run `schema-clean.sql` in SQL editor
  - [ ] Run `demo-content.sql` (optional)
  - [ ] Enable Row Level Security (RLS)
  - [ ] Copy production URL and anon key

- [ ] Environment Variables
  - [ ] Copy `.env.production.example` to `.env.production`
  - [ ] Set `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] Set secure `NEXT_PUBLIC_ADMIN_PASSWORD`

- [ ] Code Preparation
  - [ ] Run `yarn lint` to check for errors
  - [ ] Run `yarn build` locally to test build
  - [ ] Commit all changes to GitHub

## Deployment Options

### 1. Vercel (Recommended)
**Best for:** Quick deployment, automatic SSL, global CDN

```bash
# No additional setup needed, just connect GitHub
```

**Pros:**
- Zero configuration
- Automatic deployments on push
- Free SSL certificate
- Global edge network
- Preview deployments

**Domain Setup:**
1. Add domain in Vercel dashboard
2. Update DNS records:
   - A record: 76.76.21.21
   - CNAME: cname.vercel-dns.com

### 2. Netlify
**Best for:** Static hosting with serverless functions

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Pros:**
- Easy deployment
- Free SSL
- Form handling
- Split testing

### 3. VPS/Cloud (DigitalOcean, AWS, etc.)
**Best for:** Full control, custom configurations

```bash
# On your server:
# 1. Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Install yarn
npm install -g yarn

# 3. Install PM2
yarn global add pm2

# 4. Clone repository
git clone https://github.com/yourusername/NgWebsite.git
cd NgWebsite

# 5. Setup environment
cp .env.production.example .env.production
nano .env.production  # Edit with your values

# 6. Deploy
./deploy.sh

# 7. Setup PM2 startup
pm2 startup
pm2 save

# 8. Configure Nginx (optional)
sudo nano /etc/nginx/sites-available/neurogeneration
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name neurogeneration.org www.neurogeneration.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Steps

1. **Test Critical Functions:**
   - [ ] Homepage loads with animations
   - [ ] Theme toggle works
   - [ ] Posts and Events pages load
   - [ ] Search functionality works
   - [ ] Admin login works
   - [ ] Comments can be posted

2. **Security:**
   - [ ] Change admin password from default
   - [ ] Enable Supabase RLS policies
   - [ ] Set up SSL certificate
   - [ ] Configure firewall rules

3. **Performance:**
   - [ ] Enable caching headers
   - [ ] Set up CDN (if not using Vercel)
   - [ ] Monitor Core Web Vitals

4. **Monitoring:**
   - [ ] Set up uptime monitoring
   - [ ] Configure error logging
   - [ ] Set up analytics (Google Analytics, etc.)

## Environment Variables Reference

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_ADMIN_PASSWORD=secure-password-here

# Optional (for advanced features)
SUPABASE_SERVICE_KEY=eyJhbGc...  # For server-side operations
NEXT_PUBLIC_SITE_URL=https://neurogeneration.org  # For SEO
```

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
yarn install
yarn build
```

### Database Connection Issues
- Check Supabase project is not paused
- Verify environment variables are correct
- Check RLS policies aren't blocking access

### Performance Issues
- Enable Next.js standalone mode
- Use `next/image` for all images
- Implement proper caching strategies

## Updating Production

```bash
# Using deployment script
git pull origin main
./deploy.sh

# Manual update
git pull origin main
yarn install
yarn build
pm2 restart ng-website
```

## Rollback Strategy

```bash
# List PM2 processes
pm2 list

# Check logs
pm2 logs ng-website

# Rollback to previous commit
git checkout <previous-commit-hash>
./deploy.sh
```