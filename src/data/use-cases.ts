export const VALUE_PROPS = [
  {
    title: "Factory-Direct Supply",
    description:
      "Phone farm boxes, motherboard arrays, and rack hardware assembled in our Guangzhou workshop — not resold from third-party traders.",
  },
  {
    title: "Tested Before Export",
    description:
      "Power rails, cooling paths, USB connectivity, and basic operation are burn-in tested before foam packing and international freight.",
  },
  {
    title: "Built for Your Lab",
    description:
      "Standard 20-node SKUs ship in days. Custom 40+ node racks, device model lists, and remote setup are scoped with our engineering team.",
  },
] as const;

export const USE_CASES = [
  {
    title: "Creator & Content Studio",
    description:
      "Run parallel Android devices for multi-account publishing, short-form content workflows, and device-specific app validation before campaigns go live.",
  },
  {
    title: "Digital Marketing Labs",
    description:
      "Scale ad verification, install attribution checks, and regional app compatibility testing on real hardware — not emulators alone.",
  },
  {
    title: "E-commerce Operations",
    description:
      "Validate seller apps, payment SDKs, checkout flows, and OEM-specific Android builds before peak sales periods.",
  },
  {
    title: "Development & QA Testing",
    description:
      "Continuous integration on 20-node chassis with ADB automation, regression suites, and release validation on real silicon.",
  },
] as const;

export const TRUST_STATS = [
  { value: "Since 2017", label: "Guangzhou hardware factory" },
  { value: "11 SKUs", label: "Boxes, clusters & accessories" },
  { value: "20 nodes", label: "Per standard 2U chassis" },
  { value: "Global export", label: "DHL · FedEx · sea freight" },
] as const;

export const SOFTWARE_CAPABILITIES = [
  "Batch device grouping for parallel test runs",
  "ADB automation and scripted APK deployment",
  "Screen mirroring for operator oversight",
  "Remote workstation configuration after delivery",
  "Multi-group organization for engineering teams",
  "Vendor-neutral — use your existing QA toolchain",
] as const;

export const WHY_CHOOSE = [
  { label: "Real Android devices", us: "Physical hardware in factory chassis", them: "Often cloud/virtual only" },
  { label: "Factory assembly", us: "Guangzhou workshop + burn-in QC", them: "Reseller or desk DIY setups" },
  { label: "Model flexibility", us: "Samsung, OnePlus, Pixel, custom lists", them: "Fixed single model" },
  { label: "Scalable density", us: "20-node box → 40+ rack projects", them: "Limited expansion path" },
  { label: "Export support", us: "DHL/FedEx + sea freight from China", them: "Varies by seller" },
  { label: "B2B pricing", us: "Reference USD + volume quotes", them: "Opaque reseller markup" },
] as const;
