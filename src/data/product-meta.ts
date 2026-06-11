/** Catalog metadata keyed by product slug (display layer; DB holds core fields). */
export type ProductMeta = {
  tier: string;
  nodeCount: string;
  useCase: string;
  deploymentType: string;
  moq: number;
  leadTime: string;
};

export const PRODUCT_META: Record<string, ProductMeta> = {
  "android-phone-farm": {
    tier: "Starter",
    nodeCount: "20 nodes",
    useCase: "Small QA teams & first device lab",
    deploymentType: "Starter Deployment",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "phone-farm-box": {
    tier: "Pro",
    nodeCount: "20 nodes",
    useCase: "24/7 app testing & automation lab",
    deploymentType: "Standard Deployment",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "motherboard-box": {
    tier: "High-Density",
    nodeCount: "20 nodes",
    useCase: "Headless Android QA at scale",
    deploymentType: "High-Density Deployment",
    moq: 1,
    leadTime: "5–7 business days",
  },
  "iphone-phone-farm": {
    tier: "Pro",
    nodeCount: "10–20 nodes",
    useCase: "Mixed-device QA lab (customer devices)",
    deploymentType: "Standard Deployment",
    moq: 1,
    leadTime: "5–7 business days",
  },
  "real-device-phone-farm": {
    tier: "Pro",
    nodeCount: "20 nodes",
    useCase: "Turnkey device lab deployment",
    deploymentType: "Standard Deployment",
    moq: 1,
    leadTime: "5–7 business days",
  },
  "empty-box-chassis": {
    tier: "Accessory",
    nodeCount: "20 slots",
    useCase: "Expand or custom-build farms",
    deploymentType: "Accessory",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "usb-hub": {
    tier: "Accessory",
    nodeCount: "7-port hub",
    useCase: "USB routing for device clusters",
    deploymentType: "Accessory",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "power-supply-solution": {
    tier: "Accessory",
    nodeCount: "1 PSU",
    useCase: "Replacement / spare power module",
    deploymentType: "Accessory",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "cooling-solution": {
    tier: "Accessory",
    nodeCount: "4-fan kit",
    useCase: "Supplemental cooling for dense racks",
    deploymentType: "Accessory",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "network-equipment": {
    tier: "Accessory",
    nodeCount: "20-node kit",
    useCase: "Network baseline for one cluster",
    deploymentType: "Accessory",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "custom-cabinet": {
    tier: "Custom",
    nodeCount: "40+ nodes",
    useCase: "High-density rack / cabinet builds",
    deploymentType: "Custom Deployment",
    moq: 1,
    leadTime: "Quote-based (2–4 weeks)",
  },
  "exynos-n5-entry-20-node-farm": {
    tier: "Starter",
    nodeCount: "20 nodes",
    useCase: "Budget entry automation & first lab",
    deploymentType: "Phone Farm Box",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "samsung-s8-plus-20-node-farm": {
    tier: "Pro",
    nodeCount: "20 nodes",
    useCase: "Snapdragon 835 · 24/7 stable runs",
    deploymentType: "Phone Farm Box",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "snapdragon-n8-multitask-20-node-farm": {
    tier: "Pro",
    nodeCount: "20 nodes",
    useCase: "Multi-app parallel workloads",
    deploymentType: "Phone Farm Box",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "samsung-note8-20-node-farm": {
    tier: "Pro",
    nodeCount: "20 nodes",
    useCase: "High-capacity continuous ops",
    deploymentType: "Phone Farm Box",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "samsung-s9-plus-20-node-farm": {
    tier: "Pro",
    nodeCount: "20 nodes",
    useCase: "Snapdragon 845 heavy QA",
    deploymentType: "Phone Farm Box",
    moq: 1,
    leadTime: "3–5 business days",
  },
  "samsung-s10-plus-20-node-farm": {
    tier: "Pro",
    nodeCount: "20 nodes",
    useCase: "Snapdragon 855 dev & regression",
    deploymentType: "Phone Farm Box",
    moq: 1,
    leadTime: "5–7 business days",
  },
};

export const RELATED_BY_SLUG: Record<string, string[]> = {
  "android-phone-farm": ["phone-farm-box", "usb-hub", "network-equipment"],
  "phone-farm-box": ["android-phone-farm", "cooling-solution", "real-device-phone-farm"],
  "motherboard-box": ["phone-farm-box", "power-supply-solution", "custom-cabinet"],
  "iphone-phone-farm": ["phone-farm-box", "network-equipment", "custom-cabinet"],
  "real-device-phone-farm": ["phone-farm-box", "network-equipment", "motherboard-box"],
  "empty-box-chassis": ["power-supply-solution", "cooling-solution", "usb-hub"],
  "usb-hub": ["phone-farm-box", "android-phone-farm", "network-equipment"],
  "power-supply-solution": ["cooling-solution", "empty-box-chassis", "phone-farm-box"],
  "cooling-solution": ["power-supply-solution", "phone-farm-box", "motherboard-box"],
  "network-equipment": ["usb-hub", "phone-farm-box", "real-device-phone-farm"],
  "custom-cabinet": ["motherboard-box", "phone-farm-box", "real-device-phone-farm"],
  "exynos-n5-entry-20-node-farm": ["android-phone-farm", "samsung-s8-plus-20-node-farm", "usb-hub"],
  "samsung-s8-plus-20-node-farm": ["phone-farm-box", "samsung-s9-plus-20-node-farm", "cooling-solution"],
  "snapdragon-n8-multitask-20-node-farm": ["samsung-s8-plus-20-node-farm", "phone-farm-box", "network-equipment"],
  "samsung-note8-20-node-farm": ["samsung-s8-plus-20-node-farm", "real-device-phone-farm", "power-supply-solution"],
  "samsung-s9-plus-20-node-farm": ["samsung-s10-plus-20-node-farm", "samsung-s8-plus-20-node-farm", "motherboard-box"],
  "samsung-s10-plus-20-node-farm": ["samsung-s9-plus-20-node-farm", "phone-farm-box", "custom-cabinet"],
};

export function getProductMeta(slug: string): ProductMeta {
  return (
    PRODUCT_META[slug] ?? {
      tier: "Standard",
      nodeCount: "Varies",
      useCase: "Device testing hardware",
      deploymentType: "Standard Deployment",
      moq: 1,
      leadTime: "3–5 business days",
    }
  );
}

/** Natural single-line hardware label — no repeated words like "High-Density · High-Density Deployment". */
const HARDWARE_EYEBROW: Record<string, string> = {
  Starter: "Starter Hardware",
  Pro: "Pro Hardware",
  "High-Density": "High-Density Hardware",
  Accessory: "Accessory Module",
  Custom: "Custom Rack Solution",
};

export function getProductEyebrow(meta: ProductMeta, category?: string): string {
  const tier = meta.tier.trim();
  const deployment = meta.deploymentType.trim();
  const cat = (category ?? "").trim();
  const tierLower = tier.toLowerCase();
  const depLower = deployment.toLowerCase();
  const catLower = cat.toLowerCase();

  if (tier === "Pro" && deployment === "Standard Deployment") {
    return "Standard Deployment";
  }
  if (tier === "Starter" && deployment === "Starter Deployment") {
    return "Starter Deployment";
  }

  if (deployment && tierLower && (depLower.startsWith(tierLower) || depLower === tierLower)) {
    return HARDWARE_EYEBROW[tier] ?? deployment;
  }

  if (cat && (catLower === depLower || catLower === tierLower || catLower.includes(tierLower))) {
    return HARDWARE_EYEBROW[tier] ?? deployment;
  }

  if (HARDWARE_EYEBROW[tier]) return HARDWARE_EYEBROW[tier];
  return deployment || tier;
}
