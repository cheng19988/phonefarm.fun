import { IMAGES } from "@/lib/images";

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  priceUsd: number;
  timeline: string;
  deliverables: string[];
  faq: { q: string; a: string }[];
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "phone-farm-setup",
    title: "Phone Farm Setup",
    description:
      "End-to-end deployment: mount devices, route power and USB, configure network, run burn-in, and hand off a ready-to-use cluster.",
    image: IMAGES.serviceScene,
    priceUsd: 450,
    timeline: "2–5 business days",
    deliverables: [
      "Device mounting and cable routing",
      "Power and USB hub wiring",
      "Network baseline configuration",
      "Burn-in test report",
      "Remote handoff call",
    ],
    faq: [
      { q: "Do I need to ship devices to Guangzhou?", a: "You can ship devices to us, or we configure hardware you already purchased from PhoneFarm Fun." },
      { q: "Is software included?", a: "Basic ADB setup is included. Advanced group-control tools are configured separately if needed." },
    ],
  },
  {
    slug: "remote-control-configuration",
    title: "Remote Control Configuration",
    description:
      "Install screen mirroring, ADB paths, and a control workstation so one operator can view and command 20+ devices.",
    image: IMAGES.remoteControl.hero,
    priceUsd: 350,
    timeline: "1–3 business days",
    deliverables: [
      "Screen mirroring workstation setup",
      "ADB device discovery and grouping",
      "Batch APK push baseline",
      "Operator quick-start guide",
    ],
    faq: [
      { q: "Which software do you support?", a: "We configure industry-standard ADB tools and common group-control platforms compatible with your hardware." },
    ],
  },
  {
    slug: "group-control-system-configuration",
    title: "Group Control System Configuration",
    description:
      "Group devices by client or project, schedule synchronized tasks, and integrate with your automation scripts.",
    image: IMAGES.remoteControl.detail,
    priceUsd: 500,
    timeline: "3–5 business days",
    deliverables: [
      "Client/project device grouping",
      "Task scheduling templates",
      "Script integration review",
      "Monitoring dashboard setup",
    ],
    faq: [],
  },
  {
    slug: "bulk-device-deployment",
    title: "Bulk Device Deployment",
    description:
      "Large-scale provisioning — APK pre-install, account baseline, proxy routing, and fleet health checks for 100+ devices.",
    image: IMAGES.factory,
    priceUsd: 1200,
    timeline: "5–10 business days",
    deliverables: [
      "Bulk APK installation",
      "Account/proxy baseline (client-provided credentials)",
      "Fleet health monitoring setup",
      "Deployment documentation",
    ],
    faq: [],
  },
  {
    slug: "custom-hardware-solution",
    title: "Custom Hardware Solution",
    description:
      "Bespoke chassis design, node count optimization, power/cooling engineering, and rack integration for your workflow.",
    image: IMAGES.customCabinet.hero,
    priceUsd: 0,
    timeline: "Quote-based",
    deliverables: [
      "Requirements review call",
      "CAD/chassis proposal",
      "Prototype or sample unit",
      "Production timeline estimate",
    ],
    faq: [{ q: "Why is price $0?", a: "Custom projects are quoted after scoping. Use Get Quote or contact sales." }],
  },
  {
    slug: "enterprise-deployment",
    title: "Enterprise Deployment",
    description:
      "Full rackmount deployment with redundant power, network segmentation, remote monitoring, and dedicated account management.",
    image: IMAGES.customCabinet.detail,
    priceUsd: 3500,
    timeline: "2–4 weeks",
    deliverables: [
      "42U rack layout design",
      "Redundant PSU and network plan",
      "On-site or remote installation",
      "Dedicated account manager",
    ],
    faq: [],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    description:
      "Ongoing hardware maintenance, replacement parts, remote diagnostics, and SLA-backed support for production farms.",
    image: IMAGES.workshop,
    priceUsd: 200,
    timeline: "Monthly retainer",
    deliverables: [
      "Remote diagnostics channel",
      "Replacement parts coordination",
      "Firmware update guidance",
      "Monthly health check report",
    ],
    faq: [],
  },
  {
    slug: "sample-solution",
    title: "Sample Solution",
    description:
      "Evaluation kits with 1–2 units, setup guide, and onboarding call — validate before bulk orders.",
    image: IMAGES.phoneFarmBox.card,
    priceUsd: 699,
    timeline: "3–5 business days",
    deliverables: [
      "1–2 unit sample hardware",
      "Setup guide and video walkthrough",
      "30-minute onboarding call",
      "Bulk order credit discussion",
    ],
    faq: [],
  },
  {
    slug: "overseas-delivery",
    title: "Overseas Delivery",
    description:
      "International logistics from Guangzhou — express, sea freight, customs docs, door-to-door to NA/EU/SEA.",
    image: IMAGES.company.warehouse,
    priceUsd: 150,
    timeline: "Varies by region",
    deliverables: [
      "Export packaging and labeling",
      "Courier or sea freight booking",
      "Commercial invoice and customs docs",
      "Tracking number handoff",
    ],
    faq: [],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
