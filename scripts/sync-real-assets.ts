/**
 * Sync & process real factory/product photos into public/images/real + banners.
 * Run: npx tsx scripts/sync-real-assets.ts
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_REAL = path.join(ROOT, "public", "images", "real");
const OUT_BANNERS = path.join(ROOT, "public", "images", "banners");
const OUT_HERO = path.join(ROOT, "public", "images", "hero-real");
const OUT_FACTORY = path.join(ROOT, "public", "images", "factory");
const OUT_MODELS = path.join(ROOT, "public", "images", "models");
const MANIFEST_PATH = path.join(ROOT, "src", "lib", "real-images-manifest.json");
const GALLERY_MAP_PATH = path.join(ROOT, "src", "lib", "real-gallery-map.json");

const SOURCES = {
  promo: "E:\\宣传资料主板机照片",
  motherboard: "E:\\主板机照片素材",
  slides: "E:\\主板机照片素材\\水印\\演示文稿",
  products: "D:\\产品商品详情图",
  assetLib: "D:\\网站搭建素材库",
} as const;

const IMAGE_EXT = /\.(jpe?g|png|webp|heic|heif)$/i;

type ProcessedFile = { name: string; rel: string };

async function loadBuffer(filePath: string): Promise<Buffer | null> {
  const ext = path.extname(filePath).toLowerCase();
  const raw = fs.readFileSync(filePath);
  if (ext === ".heic" || ext === ".heif") {
    try {
      const heicConvert = (await import("heic-convert")).default;
      const converted = await heicConvert({ buffer: raw, format: "JPEG", quality: 0.92 });
      return Buffer.from(converted);
    } catch (e) {
      console.warn("HEIC skip:", filePath, e);
      return null;
    }
  }
  return raw;
}

async function writeWebp(
  input: Buffer,
  dest: string,
  width: number,
  height?: number,
  fit: "cover" | "inside" = "cover",
): Promise<void> {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let pipeline = sharp(input).rotate();
  if (height) {
    pipeline = pipeline.resize(width, height, { fit, position: "centre" });
  } else {
    pipeline = pipeline.resize(width, undefined, { fit: "inside", withoutEnlargement: false });
  }
  await pipeline.webp({ quality: 86 }).toFile(dest);
}

function listImages(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    console.warn("Missing source:", dir);
    return [];
  }
  const out: string[] = [];
  const walk = (d: string) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (IMAGE_EXT.test(e.name)) out.push(full);
    }
  };
  walk(dir);
  return out;
}

function safeName(base: string) {
  return base.replace(/[^a-z0-9-]/gi, "-").replace(/-+/g, "-").toLowerCase().slice(0, 80);
}

async function processSlides(): Promise<ProcessedFile[]> {
  const files = listImages(SOURCES.slides).sort();
  const out: ProcessedFile[] = [];
  let i = 0;
  for (const file of files) {
    i++;
    const buf = await loadBuffer(file);
    if (!buf) continue;
    const name = `slide-${String(i).padStart(2, "0")}.webp`;
    await writeWebp(buf, path.join(OUT_BANNERS, name), 1920, 720);
    await writeWebp(buf, path.join(OUT_HERO, `hero-${String(i).padStart(2, "0")}.webp`), 2560, 1440);
    out.push({ name, rel: `/images/banners/${name}` });
    console.log("Slide:", name);
  }
  return out;
}

async function processFactoryPhotos(): Promise<ProcessedFile[]> {
  const dirs = [SOURCES.promo, SOURCES.motherboard];
  const files = [...new Set(dirs.flatMap(listImages))].sort();
  const out: ProcessedFile[] = [];
  let i = 0;
  for (const file of files) {
    if (!/\.(jpe?g|png|webp|heic|heif)$/i.test(file)) continue;
    const buf = await loadBuffer(file);
    if (!buf) continue;
    i++;
    const name = `factory-${String(i).padStart(2, "0")}.webp`;
    await writeWebp(buf, path.join(OUT_FACTORY, name), 1600, 900);
    out.push({ name, rel: `/images/factory/${name}` });
    if (i >= 24) break;
  }
  console.log("Factory photos:", i);
  return out;
}

/** Map product detail PNGs to site slugs */
function slugFromProductFilename(filename: string): string | null {
  const lower = filename.toLowerCase();
  if (lower.includes("motherboard") || lower.includes("circuit_board") && lower.includes("array")) {
    return "motherboard-box";
  }
  if (lower.includes("phone_farm") || lower.includes("phone-farm") || lower.includes("box-phone")) {
    if (lower.includes("iphone")) return "iphone-phone-farm";
    return "phone-farm-box";
  }
  if (lower.includes("cabinet") || lower.includes("rack")) return "custom-cabinet";
  if (lower.includes("usb") || lower.includes("hub") || lower.includes("otg")) return "usb-hub";
  if (lower.includes("power")) return "power-supply-solution";
  if (lower.includes("cool")) return "cooling-solution";
  return null;
}

async function writeProductStage(input: Buffer, dest: string, size: number) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(input)
    .rotate()
    .resize(size, size, {
      fit: "contain",
      background: { r: 238, g: 242, b: 247, alpha: 1 },
    })
    .webp({ quality: 88 })
    .toFile(dest);
}

/** Parse product filename for model metadata (mirrors generate-device-models.ts) */
function parseModelMeta(filename: string) {
  const lower = filename.toLowerCase();
  if (/site_image|site_package|tiktok|facebook|spotify|whatsapp|youtube|telephone|genfarmer/i.test(lower)) return null;
  const ports: string[] = [];
  if (/usb/i.test(lower)) ports.push("USB");
  if (/lan/i.test(lower)) ports.push("LAN");
  if (/otg/i.test(lower)) ports.push("OTG");
  if (!ports.length) ports.push("USB");

  let ramGb: number | undefined;
  let storageGb: number | undefined;
  const mem = lower.match(/(\d+)_(\d+)gb/);
  if (mem) {
    ramGb = parseInt(mem[1], 10);
    storageGb = parseInt(mem[2], 10);
  }

  type M = { slug: string; name: string; brand: string; series: string; ramGb?: number; storageGb?: number; ports: string[]; variant?: string };
  let m: M | null = null;

  const set = (slug: string, brand: string, name: string, series: string, variant?: string) => {
    m = { slug, brand, name, series, ramGb, storageGb, ports, variant };
  };

  if (/note-20|note_20/.test(lower)) set("note-20", "Samsung", "Galaxy Note 20", "Galaxy Note");
  else if (/note-10-lite|note_10_lite/.test(lower)) set("note-10-lite", "Samsung", "Galaxy Note 10 Lite", "Galaxy Note");
  else if (/note-9|note_9/.test(lower)) set("note-9", "Samsung", "Galaxy Note 9", "Galaxy Note");
  else if (/note-8-super|note_8_super/.test(lower)) set("note-8-super", "Samsung", "Galaxy Note 8 Super Change", "Galaxy Note", "Super Change");
  else if (/note-8|note_8/.test(lower)) set("note-8", "Samsung", "Galaxy Note 8", "Galaxy Note");
  else if (/s21-fe|s21_fe/.test(lower)) set("s21-fe", "Samsung", "Galaxy S21 FE", "Galaxy S");
  else if (/s20/.test(lower)) set("s20", "Samsung", "Galaxy S20", "Galaxy S");
  else if (/s10-change|s10_change/.test(lower)) set("s10-change", "Samsung", "Galaxy S10", "Galaxy S", "Super Change");
  else if (/s10/.test(lower)) set("s10", "Samsung", "Galaxy S10", "Galaxy S");
  else if (/s9/.test(lower)) set("s9", "Samsung", "Galaxy S9", "Galaxy S");
  else if (/s8-super|s8_super/.test(lower)) set("s8-super", "Samsung", "Galaxy S8", "Galaxy S", "Super Change");
  else if (/s8-change|s8_change/.test(lower)) set("s8-change", "Samsung", "Galaxy S8", "Galaxy S", "2026 Port");
  else if (/s8/.test(lower)) set("s8", "Samsung", "Galaxy S8", "Galaxy S");
  else if (/z-flip4|z_flip4|zlip_4/.test(lower)) set("z-flip4", "Samsung", "Galaxy Z Flip4", "Galaxy Z");
  else if (/z-flip3|z_flip3|zlip_3/.test(lower)) set("z-flip3", "Samsung", "Galaxy Z Flip3", "Galaxy Z");
  else if (/oneplus-8-pro|oneplus_8_pro/.test(lower)) set("oneplus-8-pro", "OnePlus", "OnePlus 8 Pro", "OnePlus");
  else if (/oneplus-5|oneplus_5/.test(lower)) set("oneplus-5", "OnePlus", "OnePlus 5", "OnePlus", "Super Change");
  else if (/pixel-4xl|pixel_4xl/.test(lower)) set("pixel-4xl", "Google", "Pixel 4 XL", "Pixel", "Super Change");
  else if (/nubia-z17|nubia_z17/.test(lower)) set("nubia-z17", "Nubia", "Nubia Z17", "Nubia", "Super Change");
  else if (/a908n/.test(lower)) set("a908n", "Android", "A908N", "Universal Android");
  else if (/device-s8|perangkat_s8/.test(lower)) set("s8-device", "Samsung", "Galaxy S8 Device Module", "Galaxy S", "In-box module");
  else if (/structure_of/.test(lower)) set("s8-structure", "Samsung", "S8 Box Internal Structure", "Galaxy S", "Layout");
  else return null;

  const fileKey = filename.replace(/\.[^.]+$/, "").slice(-16).replace(/[^a-z0-9]/gi, "").toLowerCase();
  const imageSlug = `${m.slug}-${fileKey}`.slice(0, 64);
  return { ...m, imageSlug, sourceFile: filename };
}

async function processModelCatalog(): Promise<Record<string, unknown>[]> {
  fs.mkdirSync(OUT_MODELS, { recursive: true });
  const files = listImages(SOURCES.products);
  const catalog: Record<string, unknown>[] = [];

  for (const file of files.sort()) {
    const base = path.basename(file);
    const lower = base.toLowerCase();
    // Skip gallery frames, structure diagrams, and page screenshots
    if (/gallery|frame_\d|structure_of|perangkat|box_speci|device-s8-id/.test(lower)) continue;
    // Prefer main product hero shots; skip if no main marker unless it has RAM/storage specs
    if (!/main_box|en_main|main_box_phone|_main_/.test(lower) && !/\d+_\d+gb/.test(lower)) continue;

    const meta = parseModelMeta(base);
    if (!meta) continue;
    const buf = await loadBuffer(file);
    if (!buf) continue;
    const webpName = `${meta.imageSlug}.webp`;
    await writeProductStage(buf, path.join(OUT_MODELS, webpName), 960);
    await writeProductStage(buf, path.join(OUT_MODELS, `${meta.imageSlug}-card.webp`), 640);
    catalog.push({
      slug: meta.imageSlug,
      name: meta.name,
      brand: meta.brand,
      series: meta.series,
      ramGb: meta.ramGb,
      storageGb: meta.storageGb,
      ports: meta.ports,
      variant: meta.variant,
      image: `/images/models/${webpName}`,
      cardImage: `/images/models/${meta.imageSlug}-card.webp`,
      sourceFile: meta.sourceFile,
      boxSlug: "phone-farm-box",
    });
    console.log("Model:", meta.name, "→", webpName);
  }

  const catalogPath = path.join(ROOT, "src", "data", "device-models.generated.json");
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
  return catalog;
}

async function processProductDetailsLegacy(): Promise<{ manifest: string[]; galleryMap: Record<string, string[]> }> {
  const files = listImages(SOURCES.products).filter((f) => !/site_image|site_package|tiktok|facebook|spotify|whatsapp|youtube|telephone|genfarmer/i.test(path.basename(f)));
  const galleryMap: Record<string, string[]> = {};
  const manifest: string[] = [];
  const slugCounts: Record<string, number> = {};

  for (const file of files) {
    const slug = slugFromProductFilename(path.basename(file)) ?? "phone-farm-box";
    slugCounts[slug] = (slugCounts[slug] ?? 0) + 1;
    const idx = slugCounts[slug];
    const name = `${slug}-${idx}.webp`;
    const cardName = `${slug}-card.webp`;

    const buf = await loadBuffer(file);
    if (!buf) continue;

    await writeWebp(buf, path.join(OUT_REAL, name), 1200, 900);
    manifest.push(name);
    if (!galleryMap[slug]) galleryMap[slug] = [];
    galleryMap[slug].push(name);

    if (idx === 1) {
      await writeWebp(buf, path.join(OUT_REAL, cardName), 800, 800);
      manifest.push(cardName);
    }
    console.log("Product:", slug, "←", path.basename(file));
  }

  return { manifest, galleryMap };
}

async function processMotherboardForSlug(): Promise<void> {
  const files = listImages(SOURCES.motherboard).filter((f) => /\.(jpe?g|png|heic|heif)$/i.test(f));
  const slug = "motherboard-box";
  let idx = (fs.existsSync(OUT_REAL) ? fs.readdirSync(OUT_REAL).filter((f) => f.startsWith(slug)).length : 0) || 0;

  for (const file of files.slice(0, 12)) {
    const buf = await loadBuffer(file);
    if (!buf) continue;
    idx++;
    const name = `${slug}-real-${idx}.webp`;
    await writeWebp(buf, path.join(OUT_REAL, name), 1200, 900);
    console.log("Motherboard real:", name);
  }
}

async function syncCompanyFromAssetLib() {
  const companyOut = path.join(ROOT, "public", "images", "company");
  fs.mkdirSync(companyOut, { recursive: true });
  const map: Record<string, string[]> = {
    office: ["办公室", "办公"],
    frontdesk: ["前台"],
    meeting: ["会议室"],
    workshop: ["生产车间", "车间"],
    warehouse: ["仓库"],
  };
  const folders = ["公司照片1", "公司照片2", "公司照片3"].map((f) => path.join(SOURCES.assetLib, f));
  for (const [key, keywords] of Object.entries(map)) {
    for (const folder of folders) {
      if (!fs.existsSync(folder)) continue;
      for (const file of fs.readdirSync(folder)) {
        if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
        if (keywords.some((kw) => file.includes(kw))) {
          const src = path.join(folder, file);
          const buf = fs.readFileSync(src);
          await writeWebp(buf, path.join(companyOut, `${key}.webp`), 1600, 900);
          console.log("Company:", key);
          break;
        }
      }
    }
  }
}

async function main() {
  console.log("=== Sync real assets ===");
  for (const dir of [OUT_REAL, OUT_BANNERS, OUT_HERO, OUT_FACTORY, OUT_MODELS]) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await processSlides();
  await processFactoryPhotos();
  await processModelCatalog();
  const { manifest, galleryMap } = await processProductDetailsLegacy();
  await processMotherboardForSlug();
  await syncCompanyFromAssetLib();

  const allReal = fs.readdirSync(OUT_REAL).filter((f) => f.endsWith(".webp"));
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(allReal, null, 2));

  const mbFiles = allReal.filter((f) => f.startsWith("motherboard-box"));
  if (mbFiles.length) {
    galleryMap["motherboard-box"] = [...new Set([...(galleryMap["motherboard-box"] ?? []), ...mbFiles])];
  }
  galleryMap["android-phone-farm"] = galleryMap["phone-farm-box"]?.slice(0, 4) ?? [];

  fs.writeFileSync(GALLERY_MAP_PATH, JSON.stringify(galleryMap, null, 2));
  console.log("Manifest:", allReal.length, "files");
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
