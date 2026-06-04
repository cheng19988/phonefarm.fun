# Reference Site Audit — phonefarm.tech

**Target site:** phonefarm.fun (Main Factory Site)  
**Reference URL:** https://phonefarm.tech  
**Asset library:** `D:\网站搭建素材库`  
**Site images:** `02_six_website_ready\phonefarm.fun_main_factory_site`  
**Company photos:** `公司照片1` / `公司照片2` / `公司照片3`  
**Sync command:** `npm run sync-assets`

**Reference type:** Factory-direct WooCommerce phone farm hardware store with blog, lead capture, and product catalog

> Note: Reference brand (PF Phone Farm / HoweVision) will NOT be copied. Content will be rewritten for **PhoneFarm Fun** — Guangzhou real-device hardware manufacturer.

---

## 1. Page List

| Page | Reference URL | Our Equivalent |
|------|---------------|----------------|
| Homepage | `/` | `/` |
| Shop / Products | `/shop/` | `/products` |
| Product Detail | `/product/{slug}/` | `/products/[slug]` |
| About Us | `/about-us/` | `/about` |
| Contact | `/contact-us/` | `/contact` |
| Blog Index | `/blog/` | `/blog` |
| Blog Post | `/blog/{slug}/` | `/blog/[slug]` |
| My Account / Login | `/my-account/` | `/login`, `/register` |
| Cart | Header cart widget | `/checkout`, order flow |
| Privacy Policy | Footer link | `/privacy` |
| Terms | Footer link | `/terms` |
| FAQ | Embedded on homepage + product pages | `/faq` (dedicated, expanded) |
| Services / Solutions | Homepage sections + custom CTA | `/services` (dedicated, expanded) |
| User Orders | WooCommerce orders | `/account/orders` |
| Admin | WP Admin | `/admin` |

**Reference does NOT have:** Dedicated FAQ page, dedicated Services page, USDT payment — we will ADD these while preserving all reference content areas.

---

## 2. Navigation Structure

### Header (Reference)
- Logo → Home
- Shop / Products
- Blog
- About Us
- Contact Us
- Cart icon
- My Account

### Footer (Reference)
- Product categories links
- About snippet
- Contact info (email, phone, address)
- Newsletter / lead form CTA
- Social / trust badges
- Copyright

### Our Enhanced Navigation
- **Products** (dropdown: Phone Farm Box, Motherboard Box, Android/iPhone Farm, Accessories)
- **Services** (new dedicated page)
- **About**
- **FAQ**
- **Blog / Guides**
- **Contact**
- **Login / Account**
- **Header contact bar:** Phone, WhatsApp, Telegram, Email (always visible)

---

## 3. Homepage Modules

| # | Reference Module | Content Summary | Our Implementation |
|---|------------------|-----------------|-------------------|
| 1 | Hero | "Professional Phone Farm Box & Motherboard Arrays" + CTA "Start Growing Today" | Hero with real product image, Guangzhou factory positioning |
| 2 | Value Props (3 columns) | Factory-Direct, Delivered Guaranteed, Built for You | Same structure, rewritten for PhoneFarm Fun |
| 3 | Recommended Products | 8+ product cards with price + category tag | Core product grid with price, stock, Buy/Quote |
| 4 | Samsung Product Row | Brand-specific farm boxes with Add to Cart | Android/iPhone product highlights |
| 5 | Software Section | Plufina command center — visual device management | Remote Control / Group Control service section |
| 6 | Multi-Scenario Application | 4 use cases: Creator Studio, Digital Marketing, E-commerce, Dev/QA | Application scenarios section (expanded) |
| 7 | Custom Solution CTA | "Design Your Custom Phone Farm Solution" | Contact / quote CTA |
| 8 | About Us (homepage) | Manufacturer intro, 8+ years, global reach | Factory intro + facility gallery |
| 9 | Stats Counter | 50000+ devices, 8000+ clients, 400+ configs | Trust metrics (since 2017) |
| 10 | Blog Preview | 3 recent posts with category tags | Blog preview section |
| 11 | Lead Capture | "Ready to Deploy Faster?" email guide form | Enhanced contact CTA with all channels |
| 12 | Footer CTA | "Turn Phones into Income" + expert call form | WhatsApp/Telegram/Phone CTA |
| 13 | Shopping Cart sidebar | Persistent cart widget | Buy Now / Add to Order flow |

**Additional modules we ADD (not in reference):**
- Factory facility gallery (office, front desk, meeting room, workshop, warehouse)
- FAQ accordion preview
- Why Choose Us comparison table
- Mobile floating contact bar

---

## 4. Product Categories

### Reference Categories
- Phone Farm Box (20-node clusters, various Samsung models)
- Box Phone (starter kits)
- Cell Phone Farm / Samsung Farm
- Android Motherboard Box
- Software (Plufina management)

### Our Product Catalog (12 categories — superset of reference)
1. Phone Farm Box
2. Motherboard Box
3. Android Phone Farm
4. iPhone Phone Farm
5. Real Device Phone Farm
6. Empty Box / Chassis
7. USB Hub
8. Power Supply Solution
9. Cooling Solution
10. Network Equipment
11. Custom Cabinet
12. Remote Control Setup

Each maps to reference product types while expanding accessory and service hardware coverage.

---

## 5. Product Detail Content Structure

### Reference Product Page Elements
- Product title (H1)
- Price display
- Short bullet spec summary (nodes, chip, Android version, PSU, cooling)
- **Add to Cart** button
- Tabbed content: Description | Additional Information | Reviews
- Long description: use case narrative, ideal for list
- Specification table (2U box, USB+OTG, 20 phones, cooling fans, PSU wattage, dimensions, weight)
- Related blog posts (6 posts carousel)
- Review form (rating + comment)
- Sidebar: Discuss Requirements CTA
- Persistent cart + footer expert CTA

### Our Product Detail (must include all above + expand)
- Product name, images (hero + detail + gallery)
- Price (USD) + stock status badge
- Buy Now / Add to Order / Get Quote buttons
- Contact sales strip (phone, WhatsApp, Telegram, email)
- Introduction paragraph
- Key features list
- Technical specifications table
- Application scenarios
- Included accessories / delivery contents
- Maintenance notes
- Product-specific FAQ (3–5 items)
- JSON-LD Product schema
- Related products

---

## 6. FAQ Question Directions

Reference site embeds FAQ-like content in blog posts rather than a dedicated FAQ page. Topics covered indirectly:

| Topic | Reference Coverage | Our FAQ (expanded) |
|-------|-------------------|-------------------|
| What is phone farm | Blog posts | Dedicated answer |
| Phone farm box vs motherboard box | Product descriptions | Comparison answer |
| Real device vs cloud phone | Blog "Is Phone Farming Still Profitable" | Dedicated comparison |
| Real device vs emulator | Implied in hardware focus | Dedicated answer |
| Android vs iPhone farm | Product categories | Dedicated answer |
| Device capacity per box | Product specs (20 nodes) | Dedicated answer |
| Custom hardware | "Design Custom Solution" CTA | Dedicated answer |
| Remote control software | Plufina section | Dedicated answer |
| Group control configuration | Software features | Dedicated answer |
| Overseas shipping | "Global shipping" value prop | Dedicated answer |
| MOQ | Not explicit | Add clear answer |
| Sample orders | Not explicit | Add clear answer |
| Delivery time | "Delivered, Guaranteed" | Add timeline answer |
| Payment methods | WooCommerce checkout | USDT TRC20 + quote option |
| Contact sales | Contact page | All channels listed |

---

## 7. Service Content

### Reference Services (implicit, not dedicated page)
- Factory-direct hardware supply
- Custom phone farm design ("Design Your Custom Phone Farm Solution")
- Pre-configured deployment (ready-to-deploy boxes)
- Global shipping & delivery
- Management software (Plufina) — batch control, ADB automation, APK management, screen mirroring
- Free setup consultation ("Schedule Your Free Setup Call")
- Deployment guide lead magnet

### Our Services Page (9 services — superset)
1. Phone Farm Setup
2. Remote Control Configuration
3. Group Control System Configuration
4. Bulk Device Deployment
5. Custom Hardware Solution
6. Enterprise Deployment
7. Maintenance / Support
8. Sample Solution
9. Overseas Delivery

---

## 8. Shop / Price / Button / Order Logic

### Reference E-commerce Flow
```
Browse Shop → Product Detail → Add to Cart → Cart Sidebar → Checkout
                                                      ↓
                                              My Account (login/register)
                                                      ↓
                                              Order confirmation
```

- **Pricing:** USD displayed on all products ($428 – $1,680 range)
- **Buttons:** "Add to cart" on product cards and detail pages
- **Sorting:** Popularity, rating, latest, price low/high
- **Pagination:** 12 products per page, 19 total products
- **Cart:** Persistent sidebar widget on all pages
- **Account:** Username/email + password login
- **Reviews:** Star rating + text review on product pages
- **No explicit inventory badge** — we ADD stock status display

### Our Enhanced Order Flow
```
Browse Products → Product Detail → Buy Now / Add to Order / Get Quote
                                              ↓
                                    Register/Login (if Buy Now)
                                              ↓
                                    Order created (Pending)
                                              ↓
                                    USDT TRC20 payment (30 min window)
                                              ↓
                                    Payment verification API (TronGrid placeholder)
                                              ↓
                                    Status: Waiting → Paid → Confirmed
                                    Timeout: Expired / Cancelled
```

**Payment fields:** order_id, user_id, product_id, expected_amount, received_amount, payment_address, payment_network (Tron TRC20), payment_currency (USDT), tx_hash, payment_status, expires_at, paid_at, verification_status

**USDT address:** TH42KshQyz15iWk5svAwS475RM8oYQjwjW  
**Contract:** TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t  
**Minimum:** 10 USDT

---

## 9. CTA Conversion Paths

| Path | Reference Trigger | Destination | Our Implementation |
|------|-------------------|-------------|-------------------|
| Primary Hero | "Start Growing Today" | Shop / scroll to products | Hero CTA → Products |
| Product Purchase | "Add to cart" | Cart → Checkout | Buy Now → USDT payment |
| Custom Solution | "Design Your Custom Phone Farm Solution" | Contact form | /contact with product interest |
| Expert Consultation | "Talk to Our Expert" / footer form | Contact / email | WhatsApp/Telegram direct links |
| Deployment Guide | "Get the Guide" email capture | Email signup | Contact form + lead capture |
| Software Demo | Plufina section | Software info | Services → Remote Control |
| Blog → Product | Blog post CTA | Related products | Internal linking |
| Quote Request | "Discuss Your Requirements" | Contact | Get Quote button on products |

**Contact channels (all pages):**
- Phone: 13059502618
- Telegram: @huicheng1998
- WhatsApp: +852 6215 5642
- Email: qiuxui646@gmail.com

---

## 10. Content We Can Enhance Beyond Reference

| Area | Reference Gap | Our Enhancement |
|------|---------------|-----------------|
| FAQ | No dedicated page | Full FAQ page with FAQPage schema |
| Services | Scattered in homepage | Dedicated /services with 9 offerings |
| About | Brief, Hong Kong HQ | Guangzhou factory story + facility photos |
| iPhone Farm | Not covered | Full product category + content |
| Accessories | Limited | USB Hub, Power, Cooling, Network as products |
| Inventory | Not shown | Real-time stock badges |
| Payment | Standard checkout | USDT TRC20 with auto-detection stub |
| SEO | Basic WP SEO | Full metadata, JSON-LD, sitemap, llms.txt |
| Admin | WordPress backend | Custom /admin dashboard |
| Contact form | Name, Email, Message only | Extended fields (country, quantity, budget) |
| Chinese market | English only site | Bilingual-ready structure, Guangzhou positioning |
| Factory proof | Generic manufacturer claim | Real office/workshop/warehouse photo gallery |
| Order tracking | WooCommerce account | Dedicated order status page with payment timer |
| Privacy/Terms | Footer links | Full legal pages |
| Mobile UX | Responsive WP theme | Mobile floating contact bar |

---

## Build Checklist (must cover ALL reference content)

- [x] Homepage hero + value props + product grid + use cases + about + stats + blog + CTA
- [x] Shop with 12+ products, sorting, prices
- [x] Product detail with specs table, features, purchase buttons
- [x] About page with manufacturer story
- [x] Contact page with form + all contact methods
- [x] Blog with categories and posts
- [x] User login / register
- [x] Cart / order / payment flow
- [x] Admin panel
- [x] FAQ (expanded beyond reference)
- [x] Services (expanded beyond reference)
- [x] Privacy + Terms
- [x] SEO: sitemap, robots, llms.txt, JSON-LD
- [x] Contact visible on every page (header, footer, mobile bar)

---

## Brand Identity for phonefarm.fun

| Field | Value |
|-------|-------|
| Brand Name | PhoneFarm Fun |
| Domain | phonefarm.fun |
| Location | Guangzhou, China |
| Positioning | Real-device phone farm hardware manufacturer |
| Since | 2017 |
| Tagline | Real Device Phone Farm Hardware from Guangzhou |
