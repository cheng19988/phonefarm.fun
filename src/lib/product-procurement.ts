import { PAYMENT } from "@/lib/config";
import { getProductMeta } from "@/data/product-meta";
import { PROCUREMENT_SPECS } from "@/data/procurement-guide";

const ACCESSORY_SLUGS = new Set([
  "usb-hub",
  "power-supply-solution",
  "cooling-solution",
  "network-equipment",
  "empty-box-chassis",
]);

export type ProcurementRow = { label: string; value: string };

export function getProductProcurementRows(slug: string): ProcurementRow[] {
  const meta = getProductMeta(slug);
  const isAccessory = ACCESSORY_SLUGS.has(slug);
  const isCustom = slug === "custom-cabinet";

  const packingSize = isAccessory
    ? "Compact export carton — dimensions on quote"
    : isCustom
      ? "Project-sized export crate — confirmed in quote"
      : PROCUREMENT_SPECS.dimensions;

  const grossWeight = isAccessory
    ? "Varies by module — listed on quote"
    : isCustom
      ? "Project-dependent — load study before ship"
      : PROCUREMENT_SPECS.shippingWeight;

  const voltage = isAccessory && slug !== "power-supply-solution" && slug !== "network-equipment"
    ? "12V DC module or chassis tap — see spec sheet"
    : PROCUREMENT_SPECS.voltage;

  return [
    { label: "MOQ", value: `${meta.moq} unit` },
    { label: "Lead time", value: meta.leadTime },
    { label: "Packing size (W×D×H)", value: packingSize },
    { label: "Gross weight", value: grossWeight },
    { label: "Input voltage", value: voltage },
    { label: "Warranty", value: PROCUREMENT_SPECS.warranty },
    {
      label: "Shipping method",
      value: "Express courier (DHL/FedEx/UPS) or sea freight from Guangzhou — see /shipping",
    },
    {
      label: "Payment process",
      value: `USDT ${PAYMENT.network} online checkout (30 min window) or T/T / Wise / PayPal invoice via sales`,
    },
  ];
}
