import { IMAGES } from "@/lib/images";

export const SERVICES = [
  {
    slug: "phone-farm-setup",
    title: "Phone Farm Setup",
    description:
      "End-to-end deployment: mount devices, route power and USB, configure network, run burn-in, and hand off a ready-to-use cluster. Typical timeline 2–5 days on-site or remote-guided.",
    image: IMAGES.serviceScene,
  },
  {
    slug: "remote-control-configuration",
    title: "Remote Control Configuration",
    description:
      "Install screen mirroring, ADB paths, and a control workstation so one operator can view and command 20+ devices. Includes basic batch APK push setup.",
    image: IMAGES.remoteControl.hero,
  },
  {
    slug: "group-control-system-configuration",
    title: "Group Control System Configuration",
    description:
      "Group devices by client or project, schedule synchronized tasks, and integrate with your existing automation scripts. Best for agencies running 40+ nodes.",
    image: IMAGES.remoteControl.detail,
  },
  {
    slug: "bulk-device-deployment",
    title: "Bulk Device Deployment",
    description:
      "Large-scale device provisioning — APK pre-installation, account setup, proxy configuration, and fleet health monitoring for 100+ device orders.",
    image: IMAGES.factory,
  },
  {
    slug: "custom-hardware-solution",
    title: "Custom Hardware Solution",
    description:
      "Bespoke chassis design, node count optimization, power/cooling engineering, and rack integration tailored to your device models and workflow.",
    image: IMAGES.customCabinet.hero,
  },
  {
    slug: "enterprise-deployment",
    title: "Enterprise Deployment",
    description:
      "Full rackmount cabinet deployment with redundant power, network segmentation, remote monitoring, and dedicated account management for enterprise clients.",
    image: IMAGES.customCabinet.detail,
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    description:
      "Ongoing hardware maintenance, firmware updates, replacement parts, remote diagnostics, and SLA-backed technical support for production farms.",
    image: IMAGES.workshop,
  },
  {
    slug: "sample-solution",
    title: "Sample Solution",
    description:
      "Evaluation kits with 1–2 units, setup guide, software trial, and dedicated onboarding call — so you can validate before committing to bulk orders.",
    image: IMAGES.phoneFarmBox.card,
  },
  {
    slug: "overseas-delivery",
    title: "Overseas Delivery",
    description:
      "International logistics from Guangzhou — express courier, sea freight, customs documentation, and door-to-door delivery to North America, Europe, and Southeast Asia.",
    image: IMAGES.company.warehouse,
  },
];
