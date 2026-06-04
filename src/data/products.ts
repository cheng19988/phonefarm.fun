import { IMAGES } from "@/lib/images";

export type ProductSeed = {
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  scenarios: string[];
  accessories: string[];
  delivery: string[];
  maintenance: string[];
  faq: { q: string; a: string }[];
  priceUsd: number;
  stock: number;
  imageCard: string;
  imageHero: string;
  imageDetail: string;
};

function p(
  slug: string,
  name: string,
  category: string,
  shortDesc: string,
  imgs: { card: string; hero: string; detail: string },
  priceUsd: number,
  stock: number,
  extra?: Partial<ProductSeed>
): ProductSeed {
  return {
    slug,
    name,
    category,
    shortDesc,
    description:
      extra?.description ||
      `${name} from PhoneFarm Fun — factory-direct real-device hardware built in Guangzhou since 2017. Designed for stable 24/7 phone farm operations with centralized power, cooling, and USB connectivity.`,
    features: extra?.features || [
      "Factory-direct from Guangzhou manufacturer",
      "Real physical devices — not cloud or emulator",
      "Centralized power and cooling architecture",
      "Compatible with ADB and group control software",
      "Tested before shipment with QC report",
    ],
    specs: extra?.specs || {
      "Form Factor": "2U industrial chassis",
      "Device Capacity": "Up to 20 nodes per unit",
      "Power Supply": "450–550W adaptive PSU",
      "Cooling": "Multi-fan active airflow",
      "Connectivity": "USB 2.0/3.0 + OTG",
      "Input Voltage": "110V–220V AC",
      "Shell Material": "Metal",
      "Warranty": "12 months hardware support",
    },
    scenarios: extra?.scenarios || [
      "Multi-account social media operations",
      "App testing and QA automation",
      "E-commerce store management at scale",
      "Ad verification and marketing campaigns",
    ],
    accessories: extra?.accessories || [
      "Industrial chassis unit",
      "Power cable (region-specific)",
      "USB data cables",
      "Quick start deployment guide",
    ],
    delivery: extra?.delivery || [
      "Factory QC and burn-in test",
      "Secure export packaging",
      "DHL/FedEx/sea freight options",
      "Remote setup support included",
    ],
    maintenance: extra?.maintenance || [
      "Clean fan filters every 30 days",
      "Verify USB cable connections monthly",
      "Keep ambient temperature below 35°C",
      "Contact support for firmware updates",
    ],
    faq: extra?.faq || [
      {
        q: "Is this real device hardware?",
        a: "Yes. All PhoneFarm Fun products use physical smartphones or motherboards — not cloud phones or emulators.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. We deliver worldwide from Guangzhou with express and sea freight options.",
      },
    ],
    priceUsd,
    stock,
    imageCard: imgs.card,
    imageHero: imgs.hero,
    imageDetail: imgs.detail,
  };
}

export const PRODUCT_SEEDS: ProductSeed[] = [
  p("phone-farm-box", "Phone Farm Box", "Phone Farm Box", "20-node real device phone farm box with centralized power, cooling, and USB hub integration.", IMAGES.phoneFarmBox, 699, 15),
  p("motherboard-box", "Motherboard Box", "Motherboard Box", "High-density Android motherboard chassis — screenless nodes for cost-efficient scaling.", IMAGES.motherboardBox, 1680, 8, {
    description: "Android Motherboard Box integrates up to 20 smartphone motherboards into a single cooled enclosure. Batteries removed, centralized PSU replaces individual charging. Ideal for high-density automation at lower per-node cost.",
    specs: {
      "Node Type": "Android motherboard (screenless)",
      "Capacity": "20 nodes per 2U box",
      "PSU": "550W industrial grade",
      "Cooling": "4-fan optimized airflow",
      "Software": "ADB + group control compatible",
      "SIM Support": "Model dependent",
      Chassis: "43.5 × 27.5 × 9 cm",
    },
  }),
  p("android-phone-farm", "Android Phone Farm", "Android Phone Farm", "Complete Android phone farm solution with real Samsung/Huawei devices in industrial chassis.", IMAGES.androidFarm, 517, 20),
  p("iphone-phone-farm", "iPhone Phone Farm", "iPhone Phone Farm", "iPhone device array solution for iOS testing, account management, and automation workflows.", IMAGES.iphoneFarm, 1280, 5, {
    description: "iPhone Phone Farm arrays real Apple devices in a managed enclosure with centralized charging and network routing. Built for iOS QA, TestFlight distribution testing, and multi-account workflows.",
    specs: {
      "Device Type": "Real iPhone hardware",
      "Capacity": "10–20 devices per rack",
      "Connectivity": "Lightning/USB-C hub",
      "Management": "macOS control station compatible",
      "Network": "Dedicated router per cluster",
    },
  }),
  p("real-device-phone-farm", "Real Device Phone Farm", "Real Device Phone Farm", "Full-scale real device phone farm deployment — the foundation for professional automation teams.", IMAGES.realDevice, 998, 12),
  p("empty-box-chassis", "Empty Box / Chassis", "Empty Box / Chassis", "Empty industrial phone farm chassis for custom builds and expansion of existing deployments.", IMAGES.emptyBox, 280, 25),
  p("usb-hub", "USB Hub Solution", "USB Hub", "Industrial-grade USB hub modules for stable multi-device connectivity in phone farm clusters.", IMAGES.usbHub, 89, 50),
  p("power-supply-solution", "Power Supply Solution", "Power Supply", "450–550W adaptive power supply units engineered for continuous 24/7 phone farm operation.", IMAGES.power, 120, 40),
  p("cooling-solution", "Cooling Solution", "Cooling", "Multi-fan cooling modules and airflow kits to prevent thermal throttling in dense deployments.", IMAGES.cooling, 65, 45),
  p("network-equipment", "Network Equipment", "Network", "Routers, switches, and network modules for stable multi-device phone farm connectivity.", IMAGES.network, 150, 30),
  p("custom-cabinet", "Custom Cabinet", "Custom Cabinet", "Rackmount and floor-standing custom cabinets for enterprise-scale phone farm deployments.", IMAGES.customCabinet, 2500, 3, {
    priceUsd: 2500,
    description: "Custom Cabinet solutions for enterprise phone farm deployments. Rackmount 42U cabinets with integrated power distribution, cooling ducts, cable management, and modular device trays.",
  }),
  p("remote-control-setup", "Remote Control Setup", "Remote Control", "Remote control software configuration and group control system setup for your phone farm.", IMAGES.remoteControl, 350, 99, {
    description: "Remote Control Setup service includes software installation, ADB configuration, screen mirroring setup, batch APK deployment, and group control system integration for your existing or new phone farm hardware.",
    priceUsd: 350,
  }),
];

export function getProductSeed(slug: string) {
  return PRODUCT_SEEDS.find((p) => p.slug === slug);
}
