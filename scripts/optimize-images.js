const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const TARGET_DIR = path.join(PUBLIC_DIR, 'optimized_images');

async function optimizeMobileImages() {
  const mobileImgs = [
    '/image-home/celular-1.webp',
    '/image-home/celular-2.webp',
    '/image-home/celular-3.webp',
    '/image-home/celular-4.webp',
  ];
  
  const iconImgs = [
    '/headerFooter/icono_threads.webp',
    '/headerFooter/icono-x.webp',
    '/headerFooter/icono-instagram-digimedia.webp',
    '/headerFooter/icono-facebook-digimedia.webp',
    '/headerFooter/icono-tiktok-digimedia.webp',
    '/headerFooter/icono-youtube-digimedia.webp',
    '/headerFooter/icono-telefono-digimedia.webp',
    '/headerFooter/icono-ubicacion-digimedia.webp',
    '/headerFooter/icono-correo-digimedia.webp',
  ];

  for (const imgPath of [...mobileImgs, ...iconImgs]) {
    const srcPath = path.join(PUBLIC_DIR, imgPath);
    if (!fs.existsSync(srcPath)) {
      console.log(`Skipping ${imgPath} - not found`);
      continue;
    }
    
    const outName = path.join(TARGET_DIR, imgPath);
    const outDir = path.dirname(outName);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    
    const buffer = await fs.promises.readFile(srcPath);
    const img = sharp(buffer);
    
    const targetImg = imgPath.includes('/image-home/') 
      ? img.resize({ width: 721 }) 
      : img.resize({ width: 49 });
    
    const outPath = outName + '.webp';
    await targetImg.webp({ quality: 75 }).toFile(outPath);
    console.log(`Optimized: ${outPath}`);
  }
}

optimizeMobileImages().catch(console.error);
