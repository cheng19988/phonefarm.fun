export const FAQ_ITEMS = [
  {
    question: "What is an Android device farm?",
    answer:
      "An Android device farm is a rack or chassis of real smartphones organized with centralized power, cooling, and USB routing for scaled mobile QA — app testing, compatibility checks, and device automation workflows. PhoneFarm Fun builds the industrial hardware layer.",
  },
  {
    question: "What is a phone farm box?",
    answer:
      "A phone farm box is a factory-built chassis housing multiple real Android devices (typically 20 nodes per 2U unit) with centralized power supply, active cooling, and managed USB connectivity. It replaces scattered chargers and cables with one lab-ready unit.",
  },
  {
    question: "What is a motherboard cluster?",
    answer:
      "A motherboard cluster uses Android motherboards without screens or batteries to increase node density and reduce footprint. Each node runs Android with USB debugging enabled — suited for headless app QA where display output is not required.",
  },
  {
    question: "Real device farm vs cloud phone — what's the difference?",
    answer:
      "Real device farms use physical Android hardware under your control with genuine sensors and hardware behavior. Cloud phones are virtual instances on shared infrastructure. For app QA and compatibility testing on real silicon, physical device labs provide more accurate results.",
  },
  {
    question: "Real device farm vs emulator — what's the difference?",
    answer:
      "Emulators simulate Android in software on a PC. Real device farms use actual hardware for testing that reflects real-world performance, sensors, and OS behavior. Many QA teams use both — emulators for fast iteration and real devices for release validation.",
  },
  {
    question: "Android device farm vs multi-device lab rack?",
    answer:
      "Android-focused farms use our standard 20-node chassis with ADB and USB hub routing. Multi-device lab racks use the same hardware layout configured for customer-supplied phones when teams need mixed-platform QA. PhoneFarm Fun supplies the chassis — devices are provided by the customer unless otherwise quoted.",
  },
  {
    question: "How many devices can one box support?",
    answer:
      "Standard PhoneFarm Fun boxes support 20 nodes per 2U chassis. Custom rack and cabinet projects can scale to 40, 60, or more nodes with engineered power and cooling — quoted per project.",
  },
  {
    question: "Can you customize hardware?",
    answer:
      "Yes. We configure node count, chassis layout, power rails, cooling paths, and rack integration based on your device list and lab requirements. Share target Android version and preferred device models on the contact form.",
  },
  {
    question: "Is remote control supported?",
    answer:
      "All chassis SKUs support ADB-based remote operation from a control PC. Optional remote workstation setup is available as a separate service after hardware delivery.",
  },
  {
    question: "Do you support multi-device lab management setup?",
    answer:
      "Yes. Our team can configure batch device management for QA workflows — device grouping, synchronized test runs, and multi-group organization for engineering teams.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. We export from Guangzhou via DHL, FedEx, UPS express, and sea freight for bulk orders. Units are QC-tested and securely packaged before shipment.",
  },
  {
    question: "What is the MOQ?",
    answer:
      "Standard SKUs have MOQ of 1 unit for evaluation. Volume pricing applies from 5 units. Custom rack deployments are quoted individually.",
  },
  {
    question: "Can I order a sample unit?",
    answer:
      "Yes. Sample orders let you evaluate build quality, cooling, and ADB stability before bulk purchase. In-stock units typically ship in 3–5 business days.",
  },
  {
    question: "What is the lead time?",
    answer:
      "In-stock standard configurations ship in 3–5 business days. Custom rack projects are typically 2–4 weeks after quote approval. Express international delivery adds 3–7 days; sea freight 15–30 days.",
  },
  {
    question: "How do I pay?",
    answer:
      "Online checkout accepts USDT (TRC20) at the USD amount shown. Bank transfer (T/T), Wise, and PayPal are available via manual invoice — contact sales@phonefarm.fun. Card payments are not supported on this site.",
  },
  {
    question: "How do I contact sales?",
    answer:
      "Reach us via WhatsApp (+852 6215 5642), Telegram (@huicheng1998), phone (13059502618), or email sales@phonefarm.fun. We respond within 24 hours on business days (Guangzhou time, UTC+8).",
  },
  {
    question: "Is phone farming still profitable in 2026?",
    answer:
      "Profitability depends on your workflow — app QA contracts, automation services, content operations, and B2B lab deployments all use real-device hardware differently. PhoneFarm Fun supplies the chassis and factory support; we do not sell cloud subscriptions or income guarantees. Most buyers purchase hardware for testing, automation, or scalable device lab operations.",
  },
  {
    question: "What device management software works with your hardware?",
    answer:
      "Our chassis ships ADB-ready for any standard Android lab toolchain — your CI scripts, test runners, or third-party device management platforms. We optionally configure remote workstations and batch grouping after delivery. We do not lock you into proprietary control software.",
  },
  {
    question: "Can phone farm boxes support creator studio workflows?",
    answer:
      "Yes. Teams run parallel Android devices for multi-account publishing, regional app checks, and content-app QA. A 20-node box provides isolated device slots with centralized power and cooling — more stable than desk chargers for continuous operation.",
  },
  {
    question: "How does group control work on a device farm?",
    answer:
      "Group control means organizing devices into batches for synchronized commands — install APKs, run test suites, or mirror screens by group. Hardware provides USB/ADB paths; your software or our optional setup service configures grouping on the control PC.",
  },
  {
    question: "Which Samsung models fit a standard phone farm box?",
    answer:
      "We configure boxes for Galaxy S8–S21 FE, Note series, Z Flip, OnePlus, Pixel, and other Android models with USB+LAN+OTG routing. Share your target model list on the contact form — we confirm tray spacing and port layout before assembly.",
  },
  {
    question: "Android phone farm vs iPhone phone farm?",
    answer:
      "Android farms use our standard 20-node chassis with ADB automation. iPhone lab hardware requires different tray and power design — we quote iPhone-specific chassis separately. Most QA automation buyers start with Android; iOS labs are scoped per project.",
  },
  {
    question: "Do you offer warranty and after-sales support?",
    answer:
      "Hardware includes a factory warranty against assembly defects. Burn-in testing before shipment reduces DOA rates. Maintenance and remote support packages are available as optional services for enterprise deployments.",
  },
  {
    question: "Why buy factory-direct from Guangzhou?",
    answer:
      "Guangzhou is a major electronics manufacturing hub. PhoneFarm Fun assembles chassis locally, runs QC and burn-in before export, and supports overseas freight — reducing middleman markup versus reseller listings.",
  },
  {
    question: "Can I use phone farm hardware for e-commerce app testing?",
    answer:
      "Yes. E-commerce teams test seller apps, payment SDKs, and regional builds on real devices representing different Android versions. Physical labs catch OEM-specific issues that emulators miss before production releases.",
  },
];
