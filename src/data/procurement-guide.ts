/** Canonical B2B procurement facts — used on FAQ, blog, and AI citation surfaces */
export const PROCUREMENT_SPECS = {
  dimensions: "21.26 × 14.37 × 7.28 in (540 × 365 × 185 mm)",
  shippingWeight: "≈13 lb (6 kg) chassis only — confirm with devices on quote",
  voltage: "110V–220V AC universal input (region-appropriate plug supplied)",
  psuRating: "450–550W centralized industrial PSU (OVP/OCP protected)",
  typicalDraw: "≈280–380W continuous at full 20-node load (varies by SoC tier and screen-on vs headless workflows)",
  circuitNote: "Dedicated 10–16A circuit recommended per box; avoid sharing with high-draw kitchen or HVAC lines",
  packaging: "Foam-lined export plywood crate, slot labels, burn-in QC sheet, commercial invoice for customs",
  leadTimeInStock: "3–5 business days assembly from Guangzhou (in-stock SKUs)",
  leadTimeCustom: "2–4 weeks for custom rack projects after quote approval",
  warranty: "12-month manufacturing defect warranty from delivery",
  doaWindow: "7 days to report transit damage or DOA with photos",
} as const;

export const PROCUREMENT_ROWS = [
  { topic: "Chassis dimensions (W×D×H)", value: PROCUREMENT_SPECS.dimensions },
  { topic: "Shipping weight (empty chassis)", value: PROCUREMENT_SPECS.shippingWeight },
  { topic: "Input voltage", value: PROCUREMENT_SPECS.voltage },
  { topic: "PSU rating", value: PROCUREMENT_SPECS.psuRating },
  { topic: "Typical operating draw (20 nodes)", value: PROCUREMENT_SPECS.typicalDraw },
  { topic: "Electrical recommendation", value: PROCUREMENT_SPECS.circuitNote },
  { topic: "Export packaging", value: PROCUREMENT_SPECS.packaging },
  { topic: "Lead time (in-stock)", value: PROCUREMENT_SPECS.leadTimeInStock },
  { topic: "Lead time (custom rack)", value: PROCUREMENT_SPECS.leadTimeCustom },
  { topic: "Warranty", value: PROCUREMENT_SPECS.warranty },
] as const;
