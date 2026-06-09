import generated from "@/data/device-models.generated.json";
import type { DeviceModel } from "@/data/device-models.types";

export type { DeviceModel } from "@/data/device-models.types";

export const DEVICE_MODELS = generated as DeviceModel[];

/** Gallery frames, structure diagrams, and page screenshots — not catalog product shots */
const SKIP_SOURCE =
  /gallery|frame_\d|structure_of|structureof|perangkat|box_speci|llery\d|y4frame|device-s8-id|box_speci/i;

const PREFERRED_SOURCE = /main_box|en_main|main_box_phone|_main_/i;

function catalogQualityScore(m: DeviceModel): number {
  const src = (m.sourceFile ?? m.slug).toLowerCase();
  if (SKIP_SOURCE.test(src)) return -100;
  let score = 0;
  if (PREFERRED_SOURCE.test(src)) score += 50;
  if (m.ramGb && m.storageGb) score += 25;
  if (m.ports.length >= 3) score += 5;
  if (/structure|device module|layout/i.test(m.name)) score -= 40;
  if (/super change/i.test(m.variant ?? "")) score -= 5;
  return score;
}

/** One best image per brand+model — main product photos only */
export function getCatalogModels(): DeviceModel[] {
  const byKey = new Map<string, DeviceModel>();
  for (const m of DEVICE_MODELS) {
    const score = catalogQualityScore(m);
    if (score < 0) continue;
    const key = `${m.brand}:${m.name}`;
    const prev = byKey.get(key);
    if (!prev || catalogQualityScore(prev) < score) byKey.set(key, m);
  }
  return [...byKey.values()].sort((a, b) => catalogQualityScore(b) - catalogQualityScore(a));
}

export function getFeaturedCatalogModels(limit = 8): DeviceModel[] {
  return getCatalogModels().slice(0, limit);
}

/** Filtered list for grids — excludes gallery screenshots */
export const DEVICE_MODELS_CATALOG = getCatalogModels();

export const DEVICE_BRANDS = [...new Set(DEVICE_MODELS_CATALOG.map((m) => m.brand))].sort();

export function specLine(model: DeviceModel): string {
  const parts: string[] = [];
  if (model.ramGb && model.storageGb) parts.push(`${model.ramGb}GB RAM · ${model.storageGb}GB storage`);
  if (model.variant) parts.push(model.variant);
  parts.push(model.ports.join(" · "));
  return parts.join(" · ");
}

export function getModelsByBrand(brand: string) {
  return DEVICE_MODELS_CATALOG.filter((m) => m.brand === brand);
}
