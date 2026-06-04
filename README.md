# PhoneFarm Fun (phonefarm.fun)

Real-device phone farm hardware website — Guangzhou factory-direct phone farm boxes, motherboard arrays, and deployment services.

**Reference design:** [phonefarm.tech](https://phonefarm.tech)  
**Brand:** PhoneFarm Fun  
**Repository:** [github.com/cheng19988/phonefarm.fun](https://github.com/cheng19988/phonefarm.fun)

## Stack

- Next.js 16 (App Router)
- Prisma + PostgreSQL
- Tailwind CSS
- USDT TRC20 order payments (Tron API stub)

## Setup

```bash
npm install
cp .env.example .env
# Set DATABASE_URL to your PostgreSQL connection string (Neon free tier works well)
npm run db:setup
npm run sync-assets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy on Vercel

1. Create a PostgreSQL database ([Neon](https://neon.tech), [Vercel Postgres](https://vercel.com/storage/postgres), or Supabase).
2. In Vercel project **Settings → Environment Variables**, add:
   - `DATABASE_URL` — PostgreSQL connection string (`?sslmode=require` for Neon)
   - `JWT_SECRET` — random secret string
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — optional, used when running seed
3. Deploy from GitHub. Build runs `prisma generate && next build` (no DB migration during build).
4. After first deploy, run locally once (with production `DATABASE_URL` in `.env`):

```bash
npm run db:setup
```

Product catalog pages fall back to static data if the database is empty or unreachable, so the site still builds and renders.

## Asset Library

```
D:\网站搭建素材库\
  02_six_website_ready\phonefarm.fun_main_factory_site\  → public/images
  公司照片1-3\                                          → public/images/company
```

## Admin

- URL: `/admin`
- Default: `admin@phonefarm.fun` / `admin123456`
