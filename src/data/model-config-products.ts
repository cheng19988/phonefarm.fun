import { CONTACT } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import type { ProductSeed } from "./products";

const CHASSIS_MAINTENANCE = [
  "Clean fan intakes monthly in dusty environments; replace filters when supplied with cooling kit",
  "Inspect USB cables every 90 days — replace frayed leads before they cause slot dropouts",
  "PSU fan audible change or voltage sag → contact sales for replacement module",
  "Keep ambient lab temperature below 30°C where possible; add supplemental fan kit in warm climates",
];

const CHASSIS_DELIVERY = [
  "Factory assembly, cable routing, and slot labeling",
  "Burn-in test report (power, thermal, USB connectivity)",
  "Foam-lined export crate with commercial invoice",
  "Optional remote workstation handoff call",
];

const MODEL_FAQ: ProductSeed["faq"] = [
  {
    q: "Are devices included in the listed price?",
    a: "Pricing covers the factory-built 20-node chassis, power, cooling, and USB routing. Device models are configured per your order — confirm exact SKU list before assembly.",
  },
  {
    q: "Can I swap device models later?",
    a: "Tray layout is confirmed for your target models. Contact sales before changing models mid-deployment — spacing and port maps may need re-validation.",
  },
  {
    q: "Is batch control software included?",
    a: "Hardware ships ADB-ready. Optional remote workstation and group control setup is available as a service — we do not bundle proprietary lock-in software.",
  },
  {
    q: "What is the lead time?",
    a: "In-stock configurations typically ship in 3–5 business days from Guangzhou after burn-in.",
  },
  {
    q: "How is shipping calculated?",
    a: "Express courier reference estimates are on our /shipping page. Final freight is confirmed on quote for your country.",
  },
  {
    q: "What payment methods are accepted?",
    a: `USDT (TRC20) checkout online; T/T, Wise, or PayPal via manual invoice through ${CONTACT.email}.`,
  },
];

function modelBox(
  slug: string,
  name: string,
  shortDesc: string,
  priceUsd: number,
  stock: number,
  extra: Partial<ProductSeed>
): ProductSeed {
  return {
    slug,
    name,
    category: "Phone Farm Box",
    shortDesc,
    description: extra.description ?? "",
    features: extra.features ?? [],
    specs: extra.specs ?? {},
    scenarios: extra.scenarios ?? [],
    accessories: extra.accessories ?? [],
    delivery: extra.delivery ?? CHASSIS_DELIVERY,
    maintenance: extra.maintenance ?? CHASSIS_MAINTENANCE,
    faq: extra.faq ?? MODEL_FAQ,
    priceUsd,
    stock,
    imageCard: IMAGES.phoneFarmBox.card,
    imageHero: IMAGES.phoneFarmBox.hero,
    imageDetail: IMAGES.phoneFarmBox.detail,
  };
}

/** Reference-aligned Samsung / Exynos model configurations — PhoneFarm Fun branding only */
export const MODEL_CONFIG_PRODUCTS: ProductSeed[] = [
  modelBox(
    "exynos-n5-entry-20-node-farm",
    "Exynos N5 Entry 20-Node Phone Farm Box",
    "Budget 20-node entry kit — Exynos 7420 class, Android 7 baseline, ideal for first automation lab.",
    428,
    18,
    {
      description: `Entry-level phone farm box for teams moving off desk chargers. The N5 entry configuration pairs a factory-built 20-node chassis with Exynos 7420–class devices (4+64GB typical) for stable parallel Android automation at the lowest hardware entry point.

**Modular infrastructure**
We supply industrial chassis with centralized power and active cooling — you define the payload. Select compatible smartphone models, Android baseline, and optional modules (SIM routing, camera checks) only where your workflow needs them.

**Scalable management**
Manage all 20 nodes through a single USB or Ethernet path from your control PC. Use standard ADB tooling or optional batch setup service for install scheduling, mirroring, and grouped commands — without proprietary software lock-in.

**Ideal for:** first phone farm purchase, Honeygain-style traffic lab pilots, small creator matrices, compatibility sampling before scaling to Pro tiers.`,
      features: [
        "20-node Exynos 7420 class configuration (4+64GB typical)",
        "2U chassis with centralized PSU & multi-fan cooling",
        "USB 3.0 hub backplane for stable ADB",
        "Android 7+ baseline — confirm target version on order",
        "MOQ 1 — sample-friendly for overseas buyers",
      ],
      specs: {
        "Node Count": "20",
        "SoC Class": "Exynos 7420 (representative)",
        "RAM / Storage": "4GB + 64GB typical",
        "Android Baseline": "Android 7+ (confirmed before build)",
        "Form Factor": "2U industrial chassis",
        "Dimensions": "21.26 × 14.37 × 7.28 in (540 × 365 × 185 mm)",
        "Weight": "≈13 lb (6 kg) shipping weight",
        "Power": "450W centralized PSU, 110V–220V AC",
        "Cooling": "Multi-fan active airflow",
      },
      scenarios: [
        "First phone farm lab under budget constraints",
        "Parallel lightweight app automation",
        "Pilot creator or marketing device matrix",
        "Compatibility sampling before Pro tier upgrade",
      ],
      accessories: ["2U chassis", "PSU & cooling module", "USB hub & cable set", "Quick-start guide"],
    }
  ),
  modelBox(
    "samsung-s8-plus-20-node-farm",
    "Samsung Galaxy S8+ 20-Node Phone Farm Cluster",
    "Snapdragon 835 · 4+64GB · legendary efficiency for 24/7 runs — enhanced cooling & enterprise PSU.",
    699,
    14,
    {
      description: `The S8+ 20-node cluster targets professionals who need **stable Snapdragon 835 efficiency** for continuous phone farm operation. Enhanced cooling (larger fans, improved duct paths) sustains peak stability when ambient temperature fluctuates.

**Beyond fixed configuration**
The S8+ tier is modular: robust industrial chassis with centralized power and active cooling powers your devices 24/7. Choose compatible Galaxy S8+ class boards, pre-loaded Android environment, and optional hardware modules only where needed — optimizing upfront cost and ongoing ops.

**Batch operations at scale**
Start with 20 nodes or plan multi-chassis expansion. Single-point USB or Ethernet connection to your control PC. Optional remote setup configures grouping, APK batch install, and monitoring using **vendor-neutral ADB tooling** — not locked third-party dashboards.

**S8+ advantages:** cost-optimized modularity · professionally managed power/cooling · future tray upgrades · ideal for social automation, large-scale app testing, and data acquisition on real silicon.`,
      features: [
        "20× Galaxy S8+ class (Snapdragon 835, 4+64GB typical)",
        "Upgraded heat dissipation vs starter tier",
        "Enterprise hot-swap PSU layout",
        "Centralized orchestration via ADB / optional setup service",
        "Extended burn-in before export",
      ],
      specs: {
        "Node Count": "20",
        "Device Model": "Samsung Galaxy S8+ class",
        "SoC": "Qualcomm Snapdragon 835",
        "RAM / Storage": "4GB + 64GB typical",
        "Form Factor": "2U Pro chassis",
        "Dimensions": "21.26 × 14.37 × 7.28 in (540 × 365 × 185 mm)",
        "Weight": "≈13 lb (6 kg)",
        "Power": "450–550W industrial PSU",
        "Cooling": "4-fan enhanced ducted airflow",
      },
      scenarios: [
        "24/7 social automation on efficient silicon",
        "Large-scale APK regression on Snapdragon 835",
        "Creator studio parallel device workflows",
        "Mid-budget lab scaling before S9/S10 tiers",
      ],
      accessories: ["Pro 2U chassis", "Enhanced cooling module", "Industrial PSU", "Labeled USB cable set"],
    }
  ),
  modelBox(
    "snapdragon-n8-multitask-20-node-farm",
    "Snapdragon N8 Multi-Task 20-Node Phone Farm",
    "Snapdragon 835 · 6GB RAM class · parallel multi-app operations for marketing and QA teams.",
    750,
    10,
    {
      description: `Multi-task tier positions **6GB RAM Snapdragon 835** nodes for teams running heavier parallel apps — multiple client apps, mobile ad QA stacks, or layered test harnesses on each device without constant swapping.

Factory-assembled in Guangzhou with the same 2U chassis architecture as our Pro line: centralized PSU, ducted cooling, and structured USB backplane. Confirm exact device SKU list before production.`,
      features: [
        "20-node Snapdragon 835 with 6GB RAM class",
        "Optimized for parallel multi-app workloads",
        "Pro cooling layout & OVP/OCP PSU",
        "ADB-ready · optional group control setup",
        "3–5 day lead time when in stock",
      ],
      specs: {
        "Node Count": "20",
        "SoC": "Snapdragon 835",
        "RAM / Storage": "6GB + 128GB typical",
        "Dimensions": "21.26 × 14.37 × 7.28 in",
        "Weight": "≈13 lb (6 kg)",
        "Power": "450–550W PSU",
        "Cooling": "4-fan ducted",
      },
      scenarios: ["Multi-app marketing operations", "Heavier QA scripts per node", "Parallel content workflows"],
      accessories: ["2U chassis assembly", "PSU & fans", "USB hub module", "Deployment checklist"],
    }
  ),
  modelBox(
    "samsung-note8-20-node-farm",
    "Samsung Galaxy Note 8 20-Node High-Capacity Farm",
    "Note 8 class · 6+128GB · continuous operations chassis for sustained automation workloads.",
    857,
    9,
    {
      description: `Note 8 class configuration delivers **6+128GB** headroom for teams that keep large media caches, parallel client apps, and logging tools on-device during long runs. Built for continuous operations with the same export QC pipeline as our Pro SKUs.`,
      features: [
        "20× Note 8 class devices (6+128GB typical)",
        "High-capacity storage for media-heavy workflows",
        "Industrial PSU & 4-fan cooling",
        "Stylus-capable devices optional — confirm on order",
        "International express or sea freight",
      ],
      specs: {
        "Node Count": "20",
        "Device Model": "Samsung Galaxy Note 8 class",
        "RAM / Storage": "6GB + 128GB typical",
        "Dimensions": "21.26 × 14.37 × 7.28 in",
        "Weight": "≈13 lb (6 kg)",
        "Power": "450–550W",
        "Cooling": "4-fan active",
      },
      scenarios: ["Continuous automation shifts", "Large on-device caches", "Note-form-factor QA"],
      accessories: ["2U chassis", "Cooling & PSU assembly", "USB routing kit"],
    }
  ),
  modelBox(
    "samsung-s9-plus-20-node-farm",
    "Samsung Galaxy S9+ 20-Node Phone Farm Box",
    "Snapdragon 845 · 128GB class · heavy workload QA, automation, and parallel testing.",
    942,
    11,
    {
      description: `S9+ tier upgrades to **Snapdragon 845** with 128GB-class storage for teams hitting CPU or I/O limits on older 835 labs. Same modular chassis philosophy: factory power/cooling infrastructure, customer-defined device payload, optional batch management setup after delivery.

Recommended when your scripts, video pipelines, or multi-layer test stacks need more headroom per node than S8+ or N5 entry tiers.`,
      features: [
        "20× Galaxy S9+ class (Snapdragon 845)",
        "128GB storage class typical",
        "Pro PSU & enhanced thermal path",
        "Single-cable control PC attachment",
        "Volume pricing from 5 units",
      ],
      specs: {
        "Node Count": "20",
        "SoC": "Snapdragon 845",
        "RAM / Storage": "6GB + 128GB typical",
        "Dimensions": "21.26 × 14.37 × 7.28 in",
        "Weight": "≈13 lb (6 kg)",
        "Power": "550W industrial PSU",
        "Cooling": "4-fan ducted",
      },
      scenarios: ["Heavy parallel QA", "Video-rich social workflows", "Upgrade path from S8+ clusters"],
      accessories: ["Pro chassis", "PSU & cooling", "USB hub", "QC burn-in report"],
    }
  ),
  modelBox(
    "samsung-s8-reliable-20-node-farm",
    "Samsung S8 Reliable 20-Node Stable Automation Hub",
    "Snapdragon 835 · 4+64GB · cost-optimized S8 tier for dependable 24/7 phone farm runs.",
    620,
    12,
    {
      description: `The S8 Reliable tier sits between entry Exynos kits and the full S8+ Pro cluster — **Snapdragon 835 on Galaxy S8 class hardware** with factory cooling and PSU sized for continuous automation at a lower price point than the S8+ enhanced chassis.

Built for teams that need 835 efficiency and 24/7 stability without the premium S8+ cooling upgrade. Same 20-node 2U layout, centralized USB backplane, and burn-in QC before export from Guangzhou.`,
      features: [
        "20× Galaxy S8 class (Snapdragon 835, 4+64GB typical)",
        "Stable automation hub — reliable PSU & cooling",
        "Single control PC USB attachment",
        "ADB-ready · optional batch setup service",
        "MOQ 1 · volume pricing from 5 units",
      ],
      specs: {
        "Node Count": "20",
        "Device Model": "Samsung Galaxy S8 class",
        "SoC": "Qualcomm Snapdragon 835",
        "RAM / Storage": "4GB + 64GB typical",
        "Form Factor": "2U chassis",
        "Dimensions": "21.26 × 14.37 × 7.28 in (540 × 365 × 185 mm)",
        "Weight": "≈13 lb (6 kg)",
        "Power": "450W centralized PSU",
        "Cooling": "Multi-fan active airflow",
      },
      scenarios: [
        "Cost-optimized 835 automation vs S8+ Pro tier",
        "Stable 24/7 parallel app runs",
        "Upgrade path from Exynos entry kits",
      ],
      accessories: ["2U chassis", "PSU & cooling", "USB hub module", "Burn-in report"],
    }
  ),
  modelBox(
    "samsung-n9-professional-20-node-farm",
    "Samsung N9 Professional 20-Node Mobile Farms Box",
    "Snapdragon 845 · 128GB class · professional multi-app automation for marketing and QA teams.",
    998,
    8,
    {
      description: `N9 Professional tier targets **automated multi-app operations** — parallel client apps, mobile ad QA stacks, and layered QA harnesses on Snapdragon 845 silicon with 128GB-class storage. Positioned between S9+ and heavy multitask N8 layouts for teams needing pro-grade continuous operations without S10+ flagship cost.

Factory-assembled mobile farms solution: 2U chassis, ducted 4-fan cooling, OVP/OCP PSU, structured USB backplane, extended burn-in. Confirm device SKU list before production.`,
      features: [
        "20-node Snapdragon 845 professional configuration",
        "128GB storage class for multi-app workloads",
        "Batch device automation ready chassis",
        "Pro thermal path & industrial PSU",
        "Optional visual batch control setup",
      ],
      specs: {
        "Node Count": "20",
        "SoC": "Snapdragon 845",
        "RAM / Storage": "6GB + 128GB typical",
        "Form Factor": "2U Pro chassis",
        "Dimensions": "21.26 × 14.37 × 7.28 in",
        "Weight": "≈13 lb (6 kg)",
        "Power": "550W industrial PSU",
        "Cooling": "4-fan ducted",
      },
      scenarios: [
        "Professional multi-app automation",
        "Digital marketing device labs",
        "Batch device automation hardware at scale",
        "Mid-flagship upgrade from S8+/N8 tiers",
      ],
      accessories: ["Pro 2U chassis", "Enhanced cooling", "Industrial PSU", "QC documentation"],
    }
  ),
  modelBox(
    "samsung-s10-plus-20-node-farm",
    "Samsung Galaxy S10+ 20-Node Development & Testing Farm",
    "Snapdragon 855 · 8+128GB · top-tier silicon for development, regression, and pro automation labs.",
    1220,
    7,
    {
      description: `S10+ configuration is our **Snapdragon 855 flagship tier** for development houses and QA teams that standardize on newer Android builds and heavier test artifacts. 8+128GB typical layout supports demanding IDE-adjacent tooling, large APK sets, and long-running stability suites.

Chassis includes reinforced power rails, optimized USB backplane, and extended factory burn-in. Contact ${CONTACT.email} for exact device list and Android version lock before assembly.`,
      features: [
        "20× Galaxy S10+ class (Snapdragon 855)",
        "8GB + 128GB typical configuration",
        "Flagship-tier burn-in & QC documentation",
        "ADB + optional remote workstation setup",
        "Best for dev & regression labs",
      ],
      specs: {
        "Node Count": "20",
        "SoC": "Snapdragon 855",
        "RAM / Storage": "8GB + 128GB typical",
        "Dimensions": "21.26 × 14.37 × 7.28 in",
        "Weight": "≈13 lb (6 kg)",
        "Power": "550W OVP/OCP PSU",
        "Cooling": "4-fan high-CFM ducted",
      },
      scenarios: ["Development & regression labs", "Newest Android compatibility matrix", "Flagship OEM behavior testing"],
      accessories: ["Flagship-tier chassis", "Industrial PSU", "Cooling module", "Extended QC sheet"],
    }
  ),
];
