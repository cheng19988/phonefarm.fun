import { SITE } from "@/lib/config";

export const CERTIFICATIONS = [
  {
    id: "qc",
    title: "Burn-in QC",
    subtitle: "Pre-export hardware test",
    image: "/images/trust/qc-passed.svg",
  },
  {
    id: "factory",
    title: "Factory assembly",
    subtitle: "Guangzhou workshop since 2017",
    image: "/images/trust/iso9001.svg",
  },
  {
    id: "export",
    title: "Export packing",
    subtitle: "Foam crate + commercial invoice",
    image: "/images/trust/ce.svg",
  },
] as const;

/** B2B segment badges — styled with our chassis mark, not third-party trademarks */
export const CLIENT_SEGMENTS = [
  { label: "Mobile QA Labs", tag: "QA" },
  { label: "App Automation Teams", tag: "AUTO" },
  { label: "E-commerce Ops", tag: "ECOM" },
  { label: "Digital Marketing Labs", tag: "MKT" },
  { label: "Device R&D Studios", tag: "R&D" },
  { label: "Enterprise IT", tag: "IT" },
] as const;

export const CASE_STUDIES = [
  {
    title: "40-node QA lab for a Southeast Asia SaaS team",
    industry: "Mobile app QA",
    summary:
      "A B2B software vendor scaled from desk chargers to two 20-node PhoneFarm Fun chassis for parallel regression on Samsung and Pixel builds before each release train.",
    outcome: "Reduced emulator-only gaps; stable 24/7 burn-in with centralized cooling.",
    hardware: "2× Phone Farm Box Pro · 40 nodes",
  },
  {
    title: "Headless motherboard cluster for EU automation vendor",
    industry: "Test automation",
    summary:
      "An automation integrator replaced mixed desk setups with a single motherboard array for headless APK suites and backend service checks on real Android silicon.",
    outcome: "Higher node density per rack unit; cleaner USB routing for CI runners.",
    hardware: "1× Motherboard Cluster · 20 nodes",
  },
  {
    title: "Turnkey bundle for North America e-commerce ops",
    industry: "E-commerce testing",
    summary:
      "An online retail ops team needed seller-app and payment SDK validation across OEM builds before peak season. A turnkey 20-node bundle shipped with network baseline modules.",
    outcome: "Faster lab stand-up; optional remote workstation setup after delivery.",
    hardware: "1× Turnkey Device Lab Bundle · 20 nodes",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Switching from scattered USB hubs to a factory chassis cut our overnight regression failures. Power and cooling are finally consistent across all 20 slots.",
    role: "QA Lead",
    region: "European SaaS team",
  },
  {
    quote:
      "We needed real devices for regional app builds, not cloud instances. The box arrived burn-in tested — ADB paths were stable on day one.",
    role: "Automation Engineer",
    region: "Asia-Pacific integrator",
  },
  {
    quote:
      "Procurement liked the reference USD pricing and MOQ of 1 for evaluation. Volume quote for a second rack was straightforward over Telegram.",
    role: "Lab Manager",
    region: "North America agency",
  },
] as const;

export const SHIPPING_METHODS = [
  {
    name: "Express courier (DHL / FedEx / UPS)",
    transit: "3–7 business days after dispatch",
    bestFor: "Single boxes, samples, urgent lab stand-up",
    note: "Tracking number provided once shipped from Guangzhou.",
  },
  {
    name: "Air freight",
    transit: "5–10 business days (varies by lane)",
    bestFor: "Standard international B2B orders",
    note: "Many destinations support simplified clearance lanes; duties may still apply.",
  },
  {
    name: "Sea freight",
    transit: "15–30 days",
    bestFor: "Bulk racks, multi-unit projects, cost-sensitive freight",
    note: "Quoted per pallet/volume — contact sales before checkout.",
  },
] as const;

/** Reference-style freight estimates (USD, per standard 20-node box) — confirmed on quote */
export const SHIPPING_ESTIMATES = [
  { region: "United States & Canada", express: "$95 – $180", air: "$120 – $220", sea: "$280 – $450" },
  { region: "United Kingdom & EU", express: "$110 – $195", air: "$130 – $240", sea: "$300 – $480" },
  { region: "Middle East (UAE, SA, etc.)", express: "$85 – $160", air: "$100 – $190", sea: "$260 – $420" },
  { region: "Southeast Asia", express: "$45 – $95", air: "$55 – $120", sea: "$120 – $220" },
  { region: "Australia & New Zealand", express: "$100 – $175", air: "$115 – $200", sea: "$290 – $460" },
  { region: "Latin America", express: "$120 – $210", air: "$140 – $250", sea: "$320 – $520" },
  { region: "Africa & other regions", express: "Quote on request", air: "Quote on request", sea: "Quote on request" },
] as const;

export const WARRANTY_POINTS = [
  {
    title: "12-month manufacturing warranty",
    body: "Hardware is covered against factory assembly defects for twelve months from delivery. Burn-in testing before shipment reduces DOA rates.",
  },
  {
    title: "DOA & transit damage",
    body: "Inspect packaging on delivery. Report visible damage or dead-on-arrival units within 7 days with photos — we arrange replacement parts or chassis service.",
  },
  {
    title: "Exclusions",
    body: "Misuse, unauthorized modification, customer-supplied device damage, normal wear, and improper power/network environments are not covered.",
  },
  {
    title: "Returns & exchanges",
    body: "Non-defective returns may be accepted within 14 days of delivery with prior approval and restocking fee. Customer pays return freight unless we shipped the wrong configuration.",
  },
  {
    title: "RMA process",
    body: `Contact ${SITE.name} sales with order details, serial/batch notes, and photos/video of the issue. We confirm whether remote troubleshooting, parts shipment, or return is required.`,
  },
] as const;

export const COMPARISON_ROWS = [
  {
    feature: "Hardware type",
    us: "Real Android devices in factory chassis",
    cloud: "Virtual Android instances on shared cloud",
    diy: "Desk chargers + consumer USB hubs",
    reseller: "Varies — often drop-shipped assemblies",
  },
  {
    feature: "Factory assembly & QC",
    us: "Guangzhou workshop + burn-in before export",
    cloud: "N/A — no physical hardware",
    diy: "Self-assembled, no burn-in",
    reseller: "Often unknown origin / no burn-in",
  },
  {
    feature: "Node density",
    us: "20 nodes per 2U box; 40+ rack projects",
    cloud: "Unlimited virtual slots (shared infra)",
    diy: "Limited by desk space & heat",
    reseller: "Usually fixed SKU only",
  },
  {
    feature: "Device model flexibility",
    us: "Samsung, OnePlus, Pixel, custom lists",
    cloud: "Fixed cloud device profiles",
    diy: "Whatever phones you already own",
    reseller: "Often single-model bundles",
  },
  {
    feature: "ADB / automation",
    us: "Native USB paths; vendor-neutral toolchain",
    cloud: "Vendor API / remote session limits",
    diy: "Unstable multi-port hubs",
    reseller: "May bundle proprietary software lock-in",
  },
  {
    feature: "Pricing transparency",
    us: "Reference USD on site + volume quotes",
    cloud: "Subscription per instance/month",
    diy: "Hidden ops cost (power, labor, failures)",
    reseller: "Opaque markup on same chassis",
  },
  {
    feature: "International shipping",
    us: "DHL/FedEx/UPS + sea freight from China",
    cloud: "Instant cloud access",
    diy: "Not applicable",
    reseller: "Varies; may not export directly",
  },
  {
    feature: "Support channel",
    us: "Telegram / WhatsApp / email sales",
    cloud: "Ticket-based SaaS support",
    diy: "Self-support only",
    reseller: "Middleman relay",
  },
] as const;
