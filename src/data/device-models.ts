import generated from "@/data/device-models.generated.json";

export type DeviceModel = {
  slug: string;
  name: string;
  brand: string;
  series: string;
  ramGb?: number;
  storageGb?: number;
  ports: string[];
  variant?: string;
  image: string;
  cardImage?: string;
  sourceFile?: string;
  boxSlug: string;
};

export const DEVICE_MODELS = generated as DeviceModel[];

export const DEVICE_BRANDS = [...new Set(DEVICE_MODELS.map((m) => m.brand))].sort();

export function specLine(model: DeviceModel): string {
  const parts: string[] = [];
  if (model.ramGb && model.storageGb) parts.push(`${model.ramGb}GB RAM · ${model.storageGb}GB storage`);
  if (model.variant) parts.push(model.variant);
  parts.push(model.ports.join(" · "));
  return parts.join(" · ");
}

export function getModelsByBrand(brand: string) {
  return DEVICE_MODELS.filter((m) => m.brand === brand);
}
