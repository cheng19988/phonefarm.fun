/**
 * Sync images from D:\网站搭建素材库 into public/images
 * Run: npx tsx scripts/sync-assets.ts
 */
import fs from "node:fs";
import path from "node:path";

const ASSET_ROOT = "D:\\网站搭建素材库";
const SITE_SRC = path.join(ASSET_ROOT, "02_six_website_ready", "phonefarm.fun_main_factory_site");
const PUBLIC_IMAGES = path.join(process.cwd(), "public", "images");
const COMPANY_OUT = path.join(PUBLIC_IMAGES, "company");

const COMPANY_MAP: Record<string, string[]> = {
  warehouse: ["仓库"],
  workshop: ["生产车间"],
  frontdesk: ["前台"],
  office: ["公司办公室", "办公室", "办公"],
  meeting: ["会议室"],
};

function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    console.warn("Missing:", src);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function syncCompanyPhotos() {
  fs.mkdirSync(COMPANY_OUT, { recursive: true });
  // Remove legacy duplicate files; keep only normalized English names
  for (const file of fs.readdirSync(COMPANY_OUT)) {
    if (!/^(office|frontdesk|meeting|workshop|warehouse)\.png$/i.test(file)) {
      fs.unlinkSync(path.join(COMPANY_OUT, file));
    }
  }
  const folders = ["公司照片1", "公司照片2", "公司照片3"].map((f) => path.join(ASSET_ROOT, f));

  for (const [key, keywords] of Object.entries(COMPANY_MAP)) {
    const dest = path.join(COMPANY_OUT, `${key}.png`);
    for (const folder of folders) {
      if (!fs.existsSync(folder)) continue;
      for (const file of fs.readdirSync(folder)) {
        if (!/\.(png|jpg|jpeg|webp)$/i.test(file)) continue;
        if (keywords.some((kw) => file.includes(kw))) {
          fs.copyFileSync(path.join(folder, file), dest);
          console.log(`Company: ${key} <- ${file}`);
          break;
        }
      }
      if (fs.existsSync(dest)) break;
    }
  }
}

console.log("Asset root:", ASSET_ROOT);
copyDir(SITE_SRC, PUBLIC_IMAGES);
syncCompanyPhotos();
console.log("Done.");
