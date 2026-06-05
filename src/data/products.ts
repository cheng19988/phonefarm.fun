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
  p("phone-farm-box", "Phone Farm Box", "Phone Farm Box", "20-node real device phone farm box with centralized power, cooling, and USB hub integration.", IMAGES.phoneFarmBox, 699, 15, {
    description: "Our core product: a 2U industrial chassis housing up to 20 real smartphones with centralized PSU, active cooling, and integrated USB hub. The standard building block for professional phone farm operations.",
  }),
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
  p("android-phone-farm", "Android Phone Farm", "Android Phone Farm", "Complete Android phone farm solution with real Samsung/Huawei devices in industrial chassis.", IMAGES.androidFarm, 517, 20, {
    description: "Pre-assembled Android farm with real smartphones mounted in a cooled chassis. ADB-ready, USB hub integrated, suitable for QA labs and automation teams standardizing on Android.",
    specs: {
      "Device Type": "Real Android smartphones",
      "Capacity": "20 devices per chassis",
      "OS": "Stock or custom ROM (model dependent)",
      "Connectivity": "USB 3.0 hub + ADB",
      "Cooling": "Active multi-fan airflow",
    },
  }),
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
  p("real-device-phone-farm", "Real Device Phone Farm", "Real Device Phone Farm", "Turnkey deployment package — chassis, devices, power, cooling, and network pre-configured for immediate operation.", IMAGES.realDevice, 998, 12, {
    description: "A complete real-device deployment: industrial chassis, mounted smartphones or motherboards, PSU, cooling, USB routing, and network baseline. Suited for teams that want a single purchase instead of assembling components separately.",
    specs: {
      "Package": "Chassis + devices + power + cooling",
      "Capacity": "20 nodes (expandable)",
      "Setup": "Pre-wired USB and power rails",
      "Testing": "Factory burn-in before shipment",
      "Support": "Remote setup call included",
    },
  }),
  p("empty-box-chassis", "Empty Box / Chassis", "Empty Box / Chassis", "Empty industrial phone farm chassis for custom builds and expansion of existing deployments.", IMAGES.emptyBox, 280, 25, {
    description: "Bare 2U metal chassis with power rail, fan mounts, and USB backplane slots. Add your own devices and hubs for custom density or to expand an existing farm.",
    specs: {
      "Form Factor": "2U rack-mountable chassis",
      "Device Slots": "Up to 20 positions",
      "Shell": "Steel, vented panels",
      "Includes": "Chassis frame, fan mounts (fans optional)",
      "Use": "Custom builds & expansion units",
    },
    features: [
      "Empty chassis for DIY or OEM integration",
      "Standard 2U footprint fits server racks",
      "Pre-drilled mounting for phones or trays",
      "Compatible with PhoneFarm Fun accessory modules",
      "Export packaging available",
    ],
  }),
  p("usb-hub", "USB Hub Solution", "USB Hub", "Industrial-grade USB hub modules for stable multi-device connectivity in phone farm clusters.", IMAGES.usbHub, 89, 50, {
    description: "Powered USB 2.0/3.0 hub module designed for continuous multi-device phone farm use. Reduces port contention when daisy-chaining nodes to a control PC.",
    specs: {
      "Ports": "7-port powered hub",
      "Standard": "USB 3.0 downstream, USB-B upstream",
      "Power": "12V DC adapter included",
      "Mounting": "Desktop or chassis bracket",
      "Use": "Per-cluster device connectivity",
    },
    features: [
      "Industrial-grade powered USB hub",
      "Stable for 24/7 multi-device workloads",
      "Per-port over-current protection",
      "Compatible with ADB debugging",
      "Replacement/spare module for existing farms",
    ],
  }),
  p("power-supply-solution", "Power Supply Solution", "Power Supply", "450–550W adaptive power supply units engineered for continuous 24/7 phone farm operation.", IMAGES.power, 120, 40, {
    description: "Replacement or spare PSU for PhoneFarm Fun chassis. Adaptive output for mixed device loads with over-voltage and short-circuit protection.",
    specs: {
      "Output": "450–550W adaptive",
      "Input": "110V–220V AC",
      "Protection": "OVP, OCP, short-circuit",
      "Cooling": "Internal fan, replaceable",
      "Compatibility": "PhoneFarm Fun 2U chassis",
    },
  }),
  p("cooling-solution", "Cooling Solution", "Cooling", "Multi-fan cooling modules and airflow kits to prevent thermal throttling in dense deployments.", IMAGES.cooling, 65, 45, {
    description: "Supplemental fan kit for dense phone farm racks. Improves airflow when ambient temperature exceeds 30°C or when running 20+ nodes continuously.",
    specs: {
      "Fans": "4× 80mm high-CFM",
      "Airflow": "Front-to-rear ducted path",
      "Noise": "~38 dB at full speed",
      "Mounting": "Chassis side panel kit",
      "Maintenance": "Filter screen, tool-free removal",
    },
  }),
  p("network-equipment", "Network Equipment", "Network", "Routers, switches, and network modules for stable multi-device phone farm connectivity.", IMAGES.network, 150, 30, {
    description: "Managed switch and router bundle sized for a 20-node cluster. Keeps device traffic segmented from office networks and supports static IP assignment.",
    specs: {
      "Switch": "8-port Gigabit managed",
      "Router": "Dual-band Wi-Fi, 4 LAN ports",
      "Use": "1 cluster (up to 20 devices)",
      "Features": "VLAN, static DHCP reservations",
      "Includes": "Patch cables, rack ears",
    },
  }),
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
