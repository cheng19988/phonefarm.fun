import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const input = path.resolve(
  process.argv[2] ??
    "C:/Users/cdl30/.cursor/projects/d-phonefarm-fun/assets/c__Users_cdl30_AppData_Roaming_Cursor_User_workspaceStorage_254daf32293dc739eaaff9e13108dba3_images____14-f0bcbe87-7fe6-4733-bda7-e9b9dd9dcb9c.png",
);
const outWebp = path.join(process.cwd(), "public/images/brand/products-hero-chassis.webp");
const outPng = path.join(process.cwd(), "public/images/brand/products-hero-chassis.png");

async function main() {
  fs.mkdirSync(path.dirname(outWebp), { recursive: true });

  const meta = await sharp(input).metadata();
  console.log("Source:", meta.width, meta.height, "format:", meta.format);

  const resized = sharp(input).rotate().resize(1800, undefined, { fit: "inside", withoutEnlargement: false });
  const { data, info } = await resized.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // Fade light-gray watermark on white export — keep product colors intact.
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max - min;
    const lum = (r + g + b) / 3;
    if (lum >= 208 && sat <= 28) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = 255;
    }
  }

  const processed = sharp(Buffer.from(data), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .trim({ threshold: 12, background: { r: 255, g: 255, b: 255 } })
    .extend({
      top: 12,
      bottom: 12,
      left: 12,
      right: 12,
      background: { r: 255, g: 255, b: 255 },
    });

  await processed.clone().webp({ quality: 93 }).toFile(outWebp);
  await processed.clone().png({ compressionLevel: 9 }).toFile(outPng);

  const outMeta = await sharp(outWebp).metadata();
  console.log("Saved:", outWebp, outMeta.width, outMeta.height);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
