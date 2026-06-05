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
3. Deploy from GitHub. `postinstall` runs `prisma generate`; build runs `next build` only.
4. After first deploy, run locally once (with production `DATABASE_URL` in `.env`):

```bash
npm run db:setup
```

Product catalog pages fall back to static data if the database is empty or unreachable, so the site still builds and renders.

### Neon (free) + Vercel checklist

1. [neon.tech](https://neon.tech) → New Project → copy **Pooled connection** string (host contains `-pooler`).
2. Append `?sslmode=require` if not already present.
3. Vercel → Project → **Settings → Environment Variables** → add for **Production + Preview + Development**:
   - `DATABASE_URL` = Neon pooled URL
   - `JWT_SECRET` = any long random string (e.g. 32+ chars)
4. **Redeploy** (Deployments → ⋯ → Redeploy).
5. On your PC, put the same `DATABASE_URL` in `.env`, then run `npm run db:setup` to create tables + seed products/admin.

If build still fails, open Vercel **Build Logs**, copy the red error block (not just the last line), and send it.

## Asset Library

```
D:\网站搭建素材库\
  02_six_website_ready\phonefarm.fun_main_factory_site\  → public/images
  公司照片1-3\                                          → public/images/company
```

## Admin

- URL: `/admin`
- Default: `admin@phonefarm.fun` / `admin123456`
