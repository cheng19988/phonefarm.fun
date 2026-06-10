import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const input = path.resolve(
  process.argv[2] ??
    "C:/Users/cdl30/.cursor/projects/d-phonefarm-fun/assets/c__Users_cdl30_AppData_Roaming_Cursor_User_workspaceStorage_254daf32293dc739eaaff9e13108dba3_images_Untitled_image-f5a85912-d951-464c-b4de-f3e61e16d66a.png",
);
const outWebp = path.join(process.cwd(), "public/images/brand/products-hero-chassis.webp");
const outPng = path.join(process.cwd(), "public/images/brand/products-hero-chassis.png");

async function main() {
  fs.mkdirSync(path.dirname(outWebp), { recursive: true });

  const meta = await sharp(input).metadata();
  console.log("Source:", meta.width, meta.height, "alpha:", meta.hasAlpha);

  const resized = sharp(input).rotate().resize(1600, undefined, { fit: "inside", withoutEnlargement: true });

  const { data, info } = await resized.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  // If source already has transparency, keep pixels as-is.
  // Otherwise only replace pure black export background with white — do NOT key dark metal.
  if (!meta.hasAlpha) {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]!;
      const g = data[i + 1]!;
      const b = data[i + 2]!;
      if (r <= 18 && g <= 18 && b <= 18) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 255;
      }
    }
  }

  const processed = sharp(Buffer.from(data), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 10, background: meta.hasAlpha ? { r: 0, g: 0, b: 0, alpha: 0 } : { r: 255, g: 255, b: 255, alpha: 255 } })
    .extend({
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
      background: meta.hasAlpha ? { r: 0, g: 0, b: 0, alpha: 0 } : { r: 255, g: 255, b: 255, alpha: 255 },
    });

  await processed.clone().webp({ quality: 92 }).toFile(outWebp);
  await processed.clone().png({ compressionLevel: 9 }).toFile(outPng);

  const outMeta = await sharp(outWebp).metadata();
  console.log("Saved:", outWebp, outMeta.width, outMeta.height);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
