const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'out');

// Convierte los <link rel="stylesheet" ... data-precedence="next"> que Next.js
// inyecta en el <head> (render-blocking) en carga no bloqueante mediante el
// patrón media="print" -> "all" en el evento load, con <noscript> como
// respaldo para navegadores sin JS.
const STYLESHEET_RE =
  /<link rel="stylesheet" href="([^"]+)" data-precedence="next"\/>/g;

function deferStylesheets(html) {
  let noscriptTags = '';

  const transformed = html.replace(STYLESHEET_RE, (_match, href) => {
    noscriptTags += `<link rel="stylesheet" href="${href}"/>`;
    return `<link rel="stylesheet" href="${href}" data-precedence="next" media="print" onload="this.media='all'"/>`;
  });

  if (!noscriptTags) return html;

  return transformed.replace('</head>', `<noscript>${noscriptTags}</noscript></head>`);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const html = fs.readFileSync(fullPath, 'utf8');
      const result = deferStylesheets(html);
      if (result !== html) {
        fs.writeFileSync(fullPath, result);
      }
    }
  }
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.warn('defer-css: no existe el directorio "out", se omite.');
    return;
  }
  walk(OUT_DIR);
  console.log('defer-css: hojas de estilo diferidas en todo "out/".');
}

main();
