/**
 * Parse D:\产品商品详情图 filenames → src/data/device-models.generated.json
 * Run: npx tsx scripts/generate-device-models.ts
 */
import fs from "node:fs";
import path from "node:path";

const PRODUCT_DIR = "D:\\产品商品详情图";
const OUT = path.join(process.cwd(), "src", "data", "device-models.generated.json");

type DeviceModel = {
  slug: string;
  name: string;
  brand: string;
  series: string;
  ramGb?: number;
  storageGb?: number;
  ports: string[];
  variant?: string;
  imageFile: string;
  sourceFile: string;
  boxSlug: string;
};

function parseFilename(filename: string): Omit<DeviceModel, "imageFile"> | null {
  if (/site_image|site_package|tiktok|facebook|spotify|whatsapp|youtube|telephone|genfarmer/i.test(filename)) {
    return null;
  }

  const base = filename.replace(/\.[^.]+$/, "");
  const lower = base.toLowerCase();

  const ports: string[] = [];
  if (/usb/i.test(lower)) ports.push("USB");
  if (/lan/i.test(lower)) ports.push("LAN");
  if (/otg/i.test(lower)) ports.push("OTG");
  if (ports.length === 0) ports.push("USB");

  let ramGb: number | undefined;
  let storageGb: number | undefined;
  const mem = lower.match(/(\d+)_(\d+)gb/) || lower.match(/(\d+)gb.*?(\d+)gb/);
  if (mem) {
    ramGb = parseInt(mem[1], 10);
    storageGb = parseInt(mem[2], 10);
  }

  let brand = "Android";
  let name = "Phone Farm Box";
  let series = "Phone Farm Box";
  let variant: string | undefined;
  let slug = "generic";

  if (/note-20|note_20/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy Note 20";
    series = "Galaxy Note";
    slug = "note-20";
  } else if (/note-10-lite|note_10_lite/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy Note 10 Lite";
    series = "Galaxy Note";
    slug = "note-10-lite";
  } else if (/note-9|note_9/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy Note 9";
    series = "Galaxy Note";
    slug = "note-9";
  } else if (/note-8|note_8/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy Note 8";
    series = "Galaxy Note";
    slug = "note-8";
  } else if (/note-8-super|note_8_super/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy Note 8 Super Change";
    series = "Galaxy Note";
    slug = "note-8-super";
    variant = "Super Change Port";
  } else if (/s21-fe|s21_fe/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy S21 FE";
    series = "Galaxy S";
    slug = "s21-fe";
  } else if (/s20/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy S20";
    series = "Galaxy S";
    slug = "s20";
  } else if (/s10-change|s10_change/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy S10";
    series = "Galaxy S";
    slug = "s10-change";
    variant = "Super Change Port";
  } else if (/s10/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy S10";
    series = "Galaxy S";
    slug = "s10";
  } else if (/s9/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy S9";
    series = "Galaxy S";
    slug = "s9";
  } else if (/s8-super|s8_super/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy S8";
    series = "Galaxy S";
    slug = "s8-super";
    variant = "Super Change Port";
  } else if (/s8-change|s8_change/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy S8";
    series = "Galaxy S";
    slug = "s8-change";
    variant = "2026 USB/LAN Port";
  } else if (/s8/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy S8";
    series = "Galaxy S";
    slug = "s8";
  } else if (/z-flip4|z_flip4|zlip_4/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy Z Flip4";
    series = "Galaxy Z";
    slug = "z-flip4";
  } else if (/z-flip3|z_flip3|zlip_3/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy Z Flip3";
    series = "Galaxy Z";
    slug = "z-flip3";
  } else if (/oneplus-8-pro|oneplus_8_pro/.test(lower)) {
    brand = "OnePlus";
    name = "OnePlus 8 Pro";
    series = "OnePlus";
    slug = "oneplus-8-pro";
  } else if (/oneplus-5|oneplus_5/.test(lower)) {
    brand = "OnePlus";
    name = "OnePlus 5";
    series = "OnePlus";
    slug = "oneplus-5";
    variant = "Super Change Port";
  } else if (/pixel-4xl|pixel_4xl/.test(lower)) {
    brand = "Google";
    name = "Pixel 4 XL";
    series = "Pixel";
    slug = "pixel-4xl";
    variant = "Super Change Port";
  } else if (/nubia-z17|nubia_z17/.test(lower)) {
    brand = "Nubia";
    name = "Nubia Z17";
    series = "Nubia";
    slug = "nubia-z17";
    variant = "Super Change Port";
  } else if (/a908n/.test(lower)) {
    brand = "Android";
    name = "A908N";
    series = "Universal Android";
    slug = "a908n";
  } else if (/device-s8|perangkat_s8/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy S8 Device Module";
    series = "Galaxy S";
    slug = "s8-device";
    variant = "Installed in Box";
  } else if (/structure_of/.test(lower)) {
    brand = "Samsung";
    name = "Galaxy S8 Box Structure";
    series = "Galaxy S";
    slug = "s8-structure";
    variant = "Internal Layout";
  } else {
    return null;
  }

  const uniq = `${slug}-${filename.slice(0, 8)}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();

  return {
    slug: uniq,
    name,
    brand,
    series,
    ramGb,
    storageGb,
    ports,
    variant,
    sourceFile: filename,
    boxSlug: "phone-farm-box",
  };
}

function main() {
  if (!fs.existsSync(PRODUCT_DIR)) {
    console.error("Missing:", PRODUCT_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(PRODUCT_DIR).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  const models: (DeviceModel & { image: string })[] = [];
  const seen = new Set<string>();

  for (const file of files.sort()) {
    const parsed = parseFilename(file);
    if (!parsed) continue;
    const key = `${parsed.slug}-${parsed.sourceFile}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const imageSlug = safeSlug(parsed.slug, parsed.sourceFile);
    models.push({
      ...parsed,
      imageFile: `${imageSlug}.webp`,
      image: `/images/models/${imageSlug}.webp`,
    });
  }

  fs.writeFileSync(OUT, JSON.stringify(models, null, 2));
  console.log("Wrote", models.length, "models →", OUT);
}

function safeSlug(slug: string, file: string) {
  const h = file.replace(/\.[^.]+$/, "").slice(-12).replace(/[^a-z0-9]/gi, "").toLowerCase();
  return `${slug}-${h}`.slice(0, 60);
}

main();
