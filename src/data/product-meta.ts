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

/** Avoid redundant labels like "High-Density · High-Density Deployment". */
export function getProductEyebrow(meta: ProductMeta, category?: string): string {
  const tier = meta.tier.trim();
  const deployment = meta.deploymentType.trim();
  const cat = (category ?? "").trim();
  const tierLower = tier.toLowerCase();
  const depLower = deployment.toLowerCase();
  const catLower = cat.toLowerCase();

  if (cat && (catLower === depLower || catLower === tierLower)) return deployment;
  if (depLower.startsWith(tierLower) || tierLower === depLower.split(/\s+/)[0]?.toLowerCase()) {
    return deployment;
  }
  if (cat && catLower.includes(tierLower)) return deployment;
  return `${tier} · ${deployment}`;
}
