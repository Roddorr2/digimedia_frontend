const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directories inside /public to scan (non-recursive roots to keep safe)
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const TARGET_DIR = path.join(PUBLIC_DIR, 'optimized_images');
const SCAN_FOLDERS = [
  'image-home',
  'headerFooter',
  'login',
  'servicios',
  'Img-nosotros',
];

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR, { recursive: true });

async function processFile(srcPath, relOutName) {
  try {
    const outBase = path.join(TARGET_DIR, relOutName);
    const outDir = path.dirname(outBase);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const buffer = await fs.promises.readFile(srcPath);
    const img = sharp(buffer);
    const metadata = await img.metadata();

    // Generate AVIF (quality 60) and WebP (quality 75)
    const avifPath = outBase + '.avif';
    const webpPath = outBase + '.webp';

    // Skip if already exists and is newer
    const promises = [];
    promises.push(
      img
        .avif({ quality: 60 })
        .toFile(avifPath)
        .catch((e) => console.error('avif error', srcPath, e.message)),
    );
    promises.push(
      img
        .webp({ quality: 75 })
        .toFile(webpPath)
        .catch((e) => console.error('webp error', srcPath, e.message)),
    );

    await Promise.all(promises);
  } catch (err) {
    console.error('Failed to process', srcPath, err.message);
  }
}

(async function main() {
  for (const folder of SCAN_FOLDERS) {
    const dir = path.join(PUBLIC_DIR, folder);
    if (!fs.existsSync(dir)) continue;
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isFile()) {
        const ext = path.extname(ent.name).toLowerCase();
        if (ALLOWED_EXT.includes(ext)) {
          const srcPath = path.join(dir, ent.name);
          const relOutName = path.join(folder, path.basename(ent.name, ext));
          await processFile(srcPath, relOutName);
        }
      } else if (ent.isDirectory()) {
        // one-level deep scan
        const subdir = path.join(dir, ent.name);
        const subentries = await fs.promises.readdir(subdir, {
          withFileTypes: true,
        });
        for (const s of subentries) {
          if (s.isFile()) {
            const ext = path.extname(s.name).toLowerCase();
            if (ALLOWED_EXT.includes(ext)) {
              const srcPath = path.join(subdir, s.name);
              const relOutName = path.join(
                folder,
                ent.name,
                path.basename(s.name, ext),
              );
              await processFile(srcPath, relOutName);
            }
          }
        }
      }
    }
  }
})();
