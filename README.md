# NeuroGeneration Official Website

The official website for NeuroGeneration (NG), a teen-led organization focused on neuroscience and psychology education. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Features

- 📝 Educational posts with Markdown and LaTeX support
- 📅 Event management with date/time tracking
- 💬 Comments system for community engagement
- 🎨 Beautiful purple-themed design with dark/light mode
- 🔐 Admin dashboard for content management
- 📊 Analytics tracking for posts and events
- 🎯 SEO optimized with responsive design
- 🌐 Social media integration (RedNote/Xiaohongshu, WeChat, Instagram, Twitter)
- 🧠 Focus on neuroscience and psychology content
- 📱 Community database for resource sharing

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Content**: Markdown with LaTeX support (KaTeX)

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sibohuang123/NgWebsite.git
cd NgWebsite
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
   - Follow the instructions in [DATABASE_SETUP.md](DATABASE_SETUP.md)
   - Or see [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed Supabase setup

5. Run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── posts/       # Blog posts
│   ├── events/      # Event pages
│   ├── admin/       # Admin dashboard
│   └── community-database/  # Community resources
├── components/       # Reusable React components
├── lib/             # Utilities and configurations
├── types/           # TypeScript type definitions
└── supabase/        # Database schema and demo data
```

## Admin Access

Access the admin panel at `/admin` with password: `ng-admin-2024`

**Note**: For production, implement proper authentication using Supabase Auth.

## Available Scripts

```bash
yarn dev        # Start development server
yarn build      # Build for production
yarn start      # Start production server
yarn lint       # Run ESLint
```

## Recent Updates

- Added psychology focus alongside neuroscience throughout the website
- Integrated social media logos for RedNote/Xiaohongshu, WeChat, Instagram, and Twitter
- Improved footer design with 3-column layout and quick links
- Enhanced community database section for resource sharing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.