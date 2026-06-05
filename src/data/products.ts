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

const DEFAULT_FAQ: ProductSeed["faq"] = [
  {
    q: "How many nodes should I choose?",
    a: "Starter and Pro boxes ship with 20 real Android device positions. Choose a turnkey bundle if you want chassis, power, cooling, and network baseline in one order. Contact sales for 40+ node rack layouts.",
  },
  {
    q: "Can I customize Android version or device model?",
    a: "Yes. Tell us your target Android version and preferred device models when ordering. We confirm compatibility before assembly and pre-shipment testing.",
  },
  {
    q: "Is remote control supported?",
    a: "All chassis SKUs support ADB-based remote operation. Optional remote control workstation setup is available as a separate service after hardware delivery.",
  },
  {
    q: "What is the lead time?",
    a: "In-stock standard configurations typically ship in 3–5 business days from Guangzhou. Custom rack projects are quoted separately.",
  },
  {
    q: "How is shipping handled?",
    a: "We export with commercial invoice and offer express courier or sea freight. Share your shipping country on the contact form for a freight estimate.",
  },
  {
    q: "What payment options are available?",
    a: "Online orders show payment instructions after checkout. Bulk and invoice orders can use bank transfer (T/T), Wise, or PayPal — contact sales@phonefarm.fun.",
  },
];

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
    description: extra?.description ?? "",
    features: extra?.features ?? [],
    specs: extra?.specs ?? {},
    scenarios: extra?.scenarios ?? [],
    accessories: extra?.accessories ?? [],
    delivery: extra?.delivery ?? [],
    maintenance: extra?.maintenance ?? [],
    faq: extra?.faq ?? DEFAULT_FAQ,
    priceUsd,
    stock,
    imageCard: imgs.card,
    imageHero: imgs.hero,
    imageDetail: imgs.detail,
  };
}

export const PRODUCT_SEEDS: ProductSeed[] = [
  p(
    "android-phone-farm",
    "20-Node Android Device Farm Starter Box",
    "Starter Deployment",
    "Entry-level 20-node chassis for small QA teams building their first real-device Android testing lab.",
    IMAGES.androidFarm,
    517,
    20,
    {
      description:
        "Factory-built starter chassis for Android app QA, compatibility testing, and device automation workflows. Houses up to 20 real Android devices with centralized power distribution, active cooling, managed USB routing, and cable management — suited for teams moving off ad-hoc desk setups.",
      features: [
        "20-position real Android device chassis",
        "Centralized power and active cooling",
        "USB hub integration for stable ADB links",
        "Cable management rails and labeled ports",
        "Pre-shipment connectivity burn-in",
      ],
      specs: {
        "Device Type": "Real Android smartphones (customer-specified or factory-recommended)",
        "Node Count": "20",
        "Form Factor": "2U industrial chassis",
        "Power Design": "Centralized PSU, 110V–220V AC input",
        "Cooling": "Multi-fan active airflow",
        "Remote Operation": "ADB-compatible; optional setup service",
        "Typical Use": "App QA, compatibility testing, device lab pilot",
        "Customization": "Device model & Android version on request",
      },
      scenarios: [
        "Android app regression testing across device slots",
        "Compatibility checks before production release",
        "Pilot device lab for automation engineers",
        "Long-running stability tests on physical hardware",
      ],
      accessories: [
        "2U chassis with 20 device positions",
        "Centralized power supply & cooling module",
        "USB hub and data cables",
        "Quick-start wiring guide",
      ],
      delivery: [
        "Factory assembly and cable routing check",
        "Burn-in test report (connectivity & power)",
        "Export packaging with foam inserts",
        "Remote handoff call (optional)",
      ],
    }
  ),
  p(
    "phone-farm-box",
    "20-Node Real Device Testing Box Pro",
    "Standard Deployment",
    "Production-grade 20-node chassis for continuous app testing, device lab operations, and remote automation teams.",
    IMAGES.phoneFarmBox,
    699,
    15,
    {
      description:
        "Pro-tier real-device testing box designed for teams running Android QA and automation workloads around the clock. Built in Guangzhou with reinforced power rails, optimized cooling layout, and clean cable management for stable multi-device operation.",
      features: [
        "20-node Pro chassis for continuous testing workloads",
        "Industrial PSU with load-balanced power rails",
        "4-fan cooling layout for sustained operation",
        "Structured USB backplane for ADB stability",
        "12-month hardware support",
      ],
      specs: {
        "Device Type": "Real Android devices",
        "Node Count": "20",
        "Form Factor": "2U rack-friendly chassis",
        "Power Design": "450–550W adaptive PSU",
        "Cooling": "4-fan ducted airflow",
        "Remote Operation": "ADB + optional remote workstation setup",
        "Typical Use": "Production QA lab, automation R&D",
        "Customization": "Device tray layout, node count on quote",
      },
      scenarios: [
        "Continuous app QA on real Android hardware",
        "Device lab for mobile engineering teams",
        "Automated test scripts running 24/7 within your policies",
        "Remote operation from a central control PC",
      ],
      accessories: [
        "Pro 2U chassis (20 nodes)",
        "Industrial PSU & cooling assembly",
        "USB hub module & cable set",
        "Deployment checklist",
      ],
      delivery: [
        "Extended burn-in before export",
        "QC report with slot-level notes",
        "DHL/FedEx or sea freight options",
        "Basic remote setup support included",
      ],
    }
  ),
  p(
    "motherboard-box",
    "Android Motherboard Cluster for App QA",
    "High-Density Deployment",
    "20-node screenless Android motherboard cluster for headless QA, automation, and high-density device lab scaling.",
    IMAGES.motherboardBox,
    1680,
    8,
    {
      description:
        "High-density motherboard cluster mounts up to 20 Android motherboards in one cooled enclosure. Batteries removed; centralized power replaces per-device charging. Built for headless app testing and automation where display output is not required.",
      features: [
        "20 screenless Android motherboard nodes",
        "Lower footprint vs full-phone chassis",
        "Centralized PSU and cooling",
        "ADB-ready for headless automation",
        "Modular expansion with additional chassis",
      ],
      specs: {
        "Device Type": "Android motherboard (screenless)",
        "Node Count": "20",
        "Form Factor": "2U high-density chassis",
        "Power Design": "550W industrial PSU",
        "Cooling": "4-fan optimized airflow",
        "Remote Operation": "ADB automation supported",
        "Typical Use": "Headless QA, automation at scale",
        "Customization": "Motherboard model confirmed before build",
      },
      scenarios: [
        "Headless Android app automation",
        "High-density QA without display overhead",
        "Scaling device lab node count per rack unit",
        "Backend service testing on real silicon",
      ],
      accessories: [
        "Motherboard cluster chassis",
        "Centralized PSU & fan assembly",
        "USB routing backplane",
        "Mounting hardware",
      ],
      delivery: [
        "Motherboard slot alignment check",
        "Thermal burn-in under load",
        "Export crating for international freight",
        "Engineering handoff documentation",
      ],
    }
  ),
  p(
    "iphone-phone-farm",
    "iOS Device Testing Rack (10–20 Nodes)",
    "Standard Deployment",
    "Real iPhone device rack for iOS app QA, TestFlight validation, and mobile compatibility testing workflows.",
    IMAGES.iphoneFarm,
    1280,
    5,
    {
      description:
        "Managed iOS device rack for engineering teams that need physical iPhones for QA — not simulators. Centralized charging, structured USB/Lightning routing, and network baseline for macOS control stations.",
      features: [
        "10–20 real iPhone positions (configurable)",
        "Centralized charging & cable routing",
        "macOS control station compatible",
        "Dedicated network segment per cluster",
        "Pre-shipment device slot verification",
      ],
      specs: {
        "Device Type": "Real iPhone hardware",
        "Node Count": "10–20 (configuration dependent)",
        "Form Factor": "Rack or bench chassis",
        "Power Design": "Centralized charging rails",
        "Cooling": "Passive + fan-assist airflow",
        "Remote Operation": "macOS/Xcode workflow compatible",
        "Typical Use": "iOS QA, TestFlight, compatibility testing",
        "Customization": "iPhone model list confirmed before build",
      },
      scenarios: [
        "iOS app compatibility testing on real devices",
        "TestFlight build validation at scale",
        "Mobile QA lab for iOS engineering teams",
        "Long-running iOS stability tests",
      ],
      accessories: [
        "iOS device rack chassis",
        "Charging & hub cabling",
        "Network router baseline (optional)",
        "Setup documentation",
      ],
      delivery: [
        "Per-slot charging verification",
        "Export packaging",
        "Express or sea freight",
        "Remote setup call available",
      ],
    }
  ),
  p(
    "real-device-phone-farm",
    "20-Node Turnkey Device Lab Bundle",
    "Standard Deployment",
    "Complete hardware bundle — chassis, power, cooling, USB routing, and network baseline for teams wanting one purchase to start a device lab.",
    IMAGES.realDevice,
    998,
    12,
    {
      description:
        "Turnkey bundle packages the Pro chassis with power, cooling, USB, and network modules pre-integrated. For QA and automation teams that prefer a single SKU instead of sourcing components separately.",
      features: [
        "Integrated 20-node real-device chassis",
        "Power + cooling + USB + network in one bundle",
        "Pre-wired internal cable management",
        "Factory burn-in before shipment",
        "Single PO for lab procurement teams",
      ],
      specs: {
        "Device Type": "Real Android devices",
        "Node Count": "20",
        "Form Factor": "2U turnkey chassis",
        "Power Design": "Included adaptive PSU",
        "Cooling": "Included multi-fan module",
        "Remote Operation": "ADB-ready; setup service optional",
        "Typical Use": "Turnkey QA lab deployment",
        "Customization": "Add-on racks quoted separately",
      },
      scenarios: [
        "Fast device lab stand-up for new QA teams",
        "Single-vendor hardware procurement",
        "Standardized lab rollout across offices",
        "Automation workflow testing on day one",
      ],
      accessories: [
        "Turnkey chassis assembly",
        "Network kit (router + switch baseline)",
        "Full internal cable set",
        "Lab deployment guide",
      ],
      delivery: [
        "Full-system integration test",
        "Bundle QC checklist",
        "International export docs",
        "Remote onboarding call",
      ],
    }
  ),
  p(
    "empty-box-chassis",
    "20-Node Empty Chassis (Expansion Unit)",
    "Accessory",
    "Bare 20-slot chassis for expanding an existing device lab or integrating your own devices and hubs.",
    IMAGES.emptyBox,
    280,
    25,
    {
      description:
        "Empty expansion chassis with power rail mounts, fan positions, and USB backplane slots. Add your own devices for custom lab layouts or grow an existing PhoneFarm Fun deployment.",
      features: [
        "20 device position slots",
        "Standard 2U rack footprint",
        "Pre-drilled mounting points",
        "Compatible with PhoneFarm Fun accessory modules",
        "OEM / integrator friendly",
      ],
      specs: {
        "Device Type": "Customer-supplied devices",
        "Node Count": "20 slots",
        "Form Factor": "2U empty chassis",
        "Power Design": "Rail ready (PSU sold separately)",
        "Cooling": "Fan mount points (fans optional)",
        "Remote Operation": "Depends on customer integration",
        "Typical Use": "Lab expansion, custom builds",
        "Customization": "Tray layout on request",
      },
      scenarios: [
        "Expand existing device lab capacity",
        "OEM integration projects",
        "Custom tray experiments before full rollout",
        "Spare chassis inventory for ops teams",
      ],
      accessories: ["Steel chassis frame", "Fan mount kit", "Mounting screws", "Wiring diagram"],
      delivery: ["Chassis inspection", "Export packaging", "3–5 day lead time when in stock"],
    }
  ),
  p(
    "usb-hub",
    "7-Port Industrial USB Hub Module",
    "Accessory",
    "Powered USB 3.0 hub module for stable ADB connections in multi-device testing clusters.",
    IMAGES.usbHub,
    89,
    50,
    {
      description:
        "Replacement or add-on USB hub for device lab clusters. Reduces port contention when routing many Android devices to one control workstation.",
      features: [
        "7-port powered USB 3.0 hub",
        "Per-port over-current protection",
        "Chassis or bench mounting",
        "Built for continuous lab operation",
      ],
      specs: {
        "Device Type": "USB accessory",
        "Node Count": "Up to 7 downstream ports",
        "Form Factor": "Module",
        "Power Design": "12V DC adapter included",
        "Typical Use": "ADB routing for test clusters",
        "Compatibility": "PhoneFarm Fun 2U chassis",
      },
      scenarios: ["Replace worn hub in existing lab", "Add ports to expanded cluster", "Isolate device groups by hub"],
      accessories: ["Hub unit", "12V adapter", "USB-B upstream cable", "Mounting bracket"],
      delivery: ["Individual unit QC", "Express shipping available"],
    }
  ),
  p(
    "power-supply-solution",
    "450W Power Supply Module",
    "Accessory",
    "Replacement adaptive PSU for PhoneFarm Fun 2U chassis running continuous device lab workloads.",
    IMAGES.power,
    120,
    40,
    {
      description: "Spare or replacement 450–550W PSU with OVP/OCP protection for standard PhoneFarm Fun chassis.",
      features: ["450–550W adaptive output", "110V–220V input", "Internal cooling fan", "Drop-in replacement"],
      specs: {
        "Device Type": "Power module",
        "Output": "450–550W adaptive",
        "Input": "110V–220V AC",
        "Typical Use": "PSU replacement or spare",
        "Compatibility": "PhoneFarm Fun 2U chassis",
      },
      scenarios: ["Replace failed PSU", "Spare parts for ops team", "Hot-spare inventory"],
      accessories: ["PSU unit", "AC power cable"],
      delivery: ["Unit test before ship", "3–5 day lead time"],
    }
  ),
  p(
    "cooling-solution",
    "4-Fan Cooling Kit",
    "Accessory",
    "Supplemental fan kit for dense device lab racks operating in warm environments.",
    IMAGES.cooling,
    65,
    45,
    {
      description: "Add-on 4-fan kit improves front-to-rear airflow when ambient temperature exceeds 30°C or node density is high.",
      features: ["4× 80mm high-CFM fans", "Ducted airflow path", "Tool-free filter access", "Side-panel mount kit"],
      specs: {
        "Device Type": "Cooling accessory",
        "Fans": "4× 80mm",
        "Airflow": "Front-to-rear",
        "Typical Use": "Thermal headroom for dense labs",
        "Compatibility": "PhoneFarm Fun 2U chassis",
      },
      scenarios: ["Reduce thermal throttling in summer", "Upgrade older chassis airflow", "Spare fan inventory"],
      accessories: ["4 fans", "Filter screens", "Mounting hardware"],
      delivery: ["Kit QC", "3–5 day lead time"],
    }
  ),
  p(
    "network-equipment",
    "Network Kit for 20-Node Cluster",
    "Accessory",
    "Managed switch and router bundle sized for one 20-node device testing cluster.",
    IMAGES.network,
    150,
    30,
    {
      description:
        "Network baseline for isolating device lab traffic — 8-port managed switch plus router with static DHCP reservation support.",
      features: [
        "8-port Gigabit managed switch",
        "Dual-band router with 4 LAN ports",
        "VLAN & static IP support",
        "Patch cables included",
      ],
      specs: {
        "Device Type": "Network accessory",
        "Node Count": "Sized for 20-node cluster",
        "Switch": "8-port Gigabit managed",
        "Router": "Dual-band, 4 LAN",
        "Typical Use": "Lab network segmentation",
      },
      scenarios: [
        "Segment device traffic from office LAN",
        "Static IP per device group for testing",
        "Replace aging lab network gear",
      ],
      accessories: ["Switch", "Router", "Patch cables", "Rack ears"],
      delivery: ["Config smoke test", "3–5 day lead time"],
    }
  ),
  p(
    "custom-cabinet",
    "Custom Android Device Farm Rack Solution",
    "Custom Deployment",
    "Quote-based rack or cabinet builds for 40+ node high-density device lab and automation deployments.",
    IMAGES.customCabinet,
    2500,
    3,
    {
      description:
        "Custom rack and cabinet projects for teams scaling beyond single 2U boxes. We engineer node layout, power distribution, cooling ducts, and cable management to your device list and lab floor plan — priced after scoping.",
      features: [
        "40+ node rack / cabinet layouts",
        "Custom power & cooling engineering",
        "Modular device trays",
        "Pre-shipment integration testing",
        "Dedicated project coordination",
      ],
      specs: {
        "Device Type": "Real Android devices / motherboards",
        "Node Count": "40+ (project dependent)",
        "Form Factor": "Rackmount or floor cabinet",
        "Power Design": "Engineered per load study",
        "Cooling": "Ducted multi-fan design",
        "Remote Operation": "ADB lab baseline included",
        "Typical Use": "High-density QA & automation",
        "Customization": "Full layout per requirements doc",
      },
      scenarios: [
        "Scale device lab beyond 20 nodes per unit",
        "Datacenter-style mobile QA infrastructure",
        "Multi-team shared automation hardware",
        "Custom tray spacing for specific device sizes",
      ],
      accessories: ["Engineering proposal", "CAD layout (if scoped)", "Integration test plan"],
      delivery: ["Quote-based lead time (typically 2–4 weeks)", "On-site or remote install optional"],
      faq: [
        {
          q: "How do I start a custom rack project?",
          a: "Submit node count, device models, shipping country, and floor/rack constraints via the contact form. We return a layout proposal and quote.",
        },
        ...DEFAULT_FAQ.slice(2),
      ],
    }
  ),
];

export function getProductSeed(slug: string) {
  return PRODUCT_SEEDS.find((item) => item.slug === slug);
}

export function getProductSeedsByCategory(category: string) {
  return PRODUCT_SEEDS.filter((item) => item.category === category);
}
