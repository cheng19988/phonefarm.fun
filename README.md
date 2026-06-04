# PhoneFarm Fun (phonefarm.fun)

Real-device phone farm hardware website — Guangzhou factory-direct phone farm boxes, motherboard arrays, and deployment services.

**Reference design:** [phonefarm.tech](https://phonefarm.tech)  
**Brand:** PhoneFarm Fun  
**Repository:** [github.com/cheng19988/phonefarm.fun](https://github.com/cheng19988/phonefarm.fun)

## Stack

- Next.js 16 (App Router)
- Prisma + SQLite
- Tailwind CSS
- USDT TRC20 order payments (Tron API stub)

## Setup

```bash
npm install
cp .env.example .env
npm run sync-assets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Asset Library

```
D:\网站搭建素材库\
  02_six_website_ready\phonefarm.fun_main_factory_site\  → public/images
  公司照片1-3\                                          → public/images/company
```

## Admin

- URL: `/admin`
- Default: `admin@phonefarm.fun` / `admin123456`
