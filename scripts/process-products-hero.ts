import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const input = path.resolve(
  process.argv[2] ??
    "C:/Users/cdl30/.cursor/projects/d-phonefarm-fun/assets/c__Users_cdl30_AppData_Roaming_Cursor_User_workspaceStorage_254daf32293dc739eaaff9e13108dba3_images_Untitled_image-163e5e5f-a3e0-4353-9f19-ab49344a3ed3.png",
);
const outWebp = path.join(process.cwd(), "public/images/brand/products-hero-chassis.webp");
const outPng = path.join(process.cwd(), "public/images/brand/products-hero-chassis.png");

async function main() {
  fs.mkdirSync(path.dirname(outWebp), { recursive: true });

  const meta = await sharp(input).metadata();
  console.log("Source:", meta.width, meta.height, "alpha:", meta.hasAlpha);

  // Resize first for web — keeps processing fast
  const resized = sharp(input).rotate().resize(1600, undefined, { fit: "inside", withoutEnlargement: true });

  const { data, info } = await resized.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  if (!meta.hasAlpha) {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]!;
      const g = data[i + 1]!;
      const b = data[i + 2]!;
      const lum = (r + g + b) / 3;
      // Source was exported with solid black instead of alpha — key it out with a soft edge
      if (lum < 40) {
        data[i + 3] = 0;
      } else if (lum < 72) {
        data[i + 3] = Math.round(((lum - 40) / 32) * 255);
      }
    }
  }

  const raw = sharp(Buffer.from(data), {
    raw: { width: info.width, height: info.height, channels: 4 },
  });

  const trimmed = raw
    .clone()
    .trim({ threshold: 10 })
    .extend({
      top: 16,
      bottom: 16,
      left: 16,
      right: 16,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });

  await trimmed.clone().webp({ quality: 90, alphaQuality: 100 }).toFile(outWebp);
  await trimmed.clone().png({ compressionLevel: 9 }).toFile(outPng);

  const outMeta = await sharp(outWebp).metadata();
  console.log("Saved:", outWebp, outMeta.width, outMeta.height, "alpha:", outMeta.hasAlpha);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
