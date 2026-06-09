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
    title: "Device Lab Setup & Assembly",
    description:
      "Mount customer-supplied devices, route power and USB, configure lab network baseline, run burn-in, and hand off a ready-to-test cluster.",
    image: IMAGES.serviceScene,
    priceUsd: 450,
    timeline: "2–5 business days",
    deliverables: [
      "Device mounting and cable routing",
      "Power and USB hub wiring",
      "Lab network baseline configuration",
      "Burn-in test report",
      "Remote handoff call",
    ],
    faq: [
      { q: "Do I need to ship devices to Guangzhou?", a: "You can ship devices to us, or we configure hardware you already purchased from PhoneFarm Fun." },
      { q: "Is software included?", a: "Basic ADB setup is included. Advanced lab management tooling can be scoped separately if needed." },
    ],
  },
  {
    slug: "remote-control-configuration",
    title: "Remote Control Workstation Setup",
    description:
      "Configure ADB paths, device grouping, and a control workstation so QA operators can monitor and command devices in the lab remotely.",
    image: IMAGES.remoteControl.hero,
    priceUsd: 350,
    timeline: "1–3 business days",
    deliverables: [
      "Control workstation setup",
      "ADB device discovery and grouping",
      "Batch APK push baseline",
      "Operator quick-start guide",
    ],
    faq: [
      { q: "Which tools do you support?", a: "We configure standard ADB tooling and common device-lab management platforms compatible with your hardware." },
    ],
  },
  {
    slug: "group-control-system-configuration",
    title: "Multi-Device Lab Management Setup",
    description:
      "Organize devices by project or test suite, configure batch test runs, and integrate with your existing CI or automation scripts.",
    image: IMAGES.remoteControl.detail,
    priceUsd: 500,
    timeline: "3–5 business days",
    deliverables: [
      "Project-based device grouping",
      "Test run scheduling templates",
      "Automation script integration review",
      "Lab monitoring dashboard baseline",
    ],
    faq: [
      { q: "Is this for QA teams only?", a: "Yes — we configure lab management for app testing, compatibility checks, and device automation workflows." },
    ],
  },
  {
    slug: "bulk-device-deployment",
    title: "Large-Scale Lab Deployment",
    description:
      "Quote-based provisioning for 50+ device labs — bulk APK staging, test environment baseline, fleet health checks, and deployment documentation.",
    image: IMAGES.factoryScene,
    priceUsd: 0,
    timeline: "Quote-based",
    deliverables: [
      "Deployment scope review",
      "Bulk test build staging plan",
      "Fleet health monitoring setup",
      "Lab operations documentation",
    ],
    faq: [
      { q: "Why is there no fixed price?", a: "Large deployments are scoped per project. Contact sales@phonefarm.fun with your node count and timeline." },
    ],
  },
  {
    slug: "custom-hardware-solution",
    title: "Custom Hardware Engineering",
    description:
      "Bespoke chassis design, node layout, power and cooling engineering, and rack integration for your device lab requirements.",
    image: IMAGES.customCabinet.hero,
    priceUsd: 0,
    timeline: "Quote-based",
    deliverables: [
      "Requirements review call",
      "Chassis layout proposal",
      "Prototype or sample unit (if scoped)",
      "Production timeline estimate",
    ],
    faq: [{ q: "How do I get a quote?", a: "Submit node count, device models, and shipping country via the contact form or email sales@phonefarm.fun." }],
  },
  {
    slug: "enterprise-deployment",
    title: "Enterprise Rack Deployment",
    description:
      "Quote-based rackmount projects with redundant power planning, network segmentation, remote monitoring baseline, and dedicated project coordination.",
    image: IMAGES.customCabinet.detail,
    priceUsd: 0,
    timeline: "Quote-based (2–4 weeks)",
    deliverables: [
      "Rack layout design",
      "Redundant PSU and network plan",
      "On-site or remote installation (if scoped)",
      "Project coordination contact",
    ],
    faq: [
      { q: "Is this available for online checkout?", a: "No — enterprise rack projects require a scoping call and manual invoice." },
    ],
  },
  {
    slug: "maintenance-support",
    title: "Hardware Maintenance & Support",
    description:
      "Ongoing hardware maintenance, replacement parts coordination, remote diagnostics, and periodic health checks for production device labs.",
    image: IMAGES.workshop,
    priceUsd: 200,
    timeline: "Monthly retainer",
    deliverables: [
      "Remote diagnostics channel",
      "Replacement parts coordination",
      "Firmware update guidance",
      "Periodic health check summary",
    ],
    faq: [],
  },
  {
    slug: "sample-solution",
    title: "Sample Hardware Evaluation",
    description:
      "Evaluation kits with 1–2 units, setup guide, and onboarding call — validate build quality before bulk orders.",
    image: IMAGES.phoneFarmBox.card,
    priceUsd: 699,
    timeline: "3–5 business days",
    deliverables: [
      "1–2 unit sample hardware",
      "Setup guide and walkthrough",
      "30-minute onboarding call",
      "Bulk order discussion",
    ],
    faq: [],
  },
  {
    slug: "overseas-delivery",
    title: "International Shipping & Export",
    description:
      "Export logistics from Guangzhou — express courier, sea freight, commercial invoice, and tracking handoff.",
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
