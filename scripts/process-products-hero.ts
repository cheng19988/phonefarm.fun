import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const input = path.resolve(
  process.argv[2] ??
    "C:/Users/cdl30/.cursor/projects/d-phonefarm-fun/assets/c__Users_cdl30_AppData_Roaming_Cursor_User_workspaceStorage_254daf32293dc739eaaff9e13108dba3_images_Untitled_image-e1ea07df-1aac-4157-9719-3a8a870e1b89.png",
);
const outWebp = path.join(process.cwd(), "public/images/brand/products-hero-chassis.webp");
const outPng = path.join(process.cwd(), "public/images/brand/products-hero-chassis.png");

async function main() {
  fs.mkdirSync(path.dirname(outWebp), { recursive: true });

  const meta = await sharp(input).metadata();
  console.log("Source:", meta.width, meta.height, "format:", meta.format, "alpha:", meta.hasAlpha);

  const resized = sharp(input).rotate().resize(1600, undefined, { fit: "inside", withoutEnlargement: true });
  const { data, info } = await resized.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  if (meta.hasAlpha) {
    // True transparent PNG — keep every pixel, only resize.
    console.log("Using source alpha as-is.");
  } else {
    // Exported as black JPEG/PNG — turn only pure black into transparency.
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]!;
      const g = data[i + 1]!;
      const b = data[i + 2]!;
      if (r <= 8 && g <= 8 && b <= 8) {
        data[i + 3] = 0;
      }
    }
  }

  const out = sharp(Buffer.from(data), {
    raw: { width: info.width, height: info.height, channels: 4 },
  });

  await out.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(outWebp);
  await out.clone().png({ compressionLevel: 9 }).toFile(outPng);

  const check = await sharp(outWebp).metadata();
  const { data: checkData } = await sharp(outWebp).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let transparent = 0;
  for (let i = 3; i < checkData.length; i += 4) {
    if (checkData[i]! < 10) transparent++;
  }
  console.log("Saved:", outWebp, check.width, check.height, "transparent px:", transparent);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
