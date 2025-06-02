# URL Shortener

A modern URL shortener built with Next.js, Supabase, and TailwindCSS.

## Features

- Clean, modern UI with TailwindCSS and shadcn/ui components
- URL validation before submission
- Loading states during URL shortening
- Toast notifications for success and error states
- Copy to clipboard functionality
- Proper error handling
- Responsive design
- TypeScript support
- Supabase integration for data storage
- URL redirection with 301 status code

## Tech Stack

- **Frontend**: Next.js (App Router), TailwindCSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL DB + API integration)
- **Other**: TypeScript, nanoid for slug generation

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

2. Install dependencies:
```bash
npm install
```

3. Create a Supabase project and get your project URL and anon key.

4. Create a `.env.local` file in the root directory with the following content:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Create the `links` table in your Supabase database with the following SQL:
```sql
create table links (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  longUrl text not null,
  createdAt timestamp with time zone default timezone('utc'::text, now()) not null
);
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The easiest way to deploy this app is using Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## License

MIT
