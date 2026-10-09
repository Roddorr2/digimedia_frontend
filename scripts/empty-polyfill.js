// Next.js aporta este polyfill-module de forma incondicional (Array.prototype.at,
// Array.prototype.flat/flatMap, Object.fromEntries, Object.hasOwn,
// String.prototype.trimStart/trimEnd, Promise.prototype.finally, URL.canParse),
// sin importar el browserslist del proyecto (github.com/vercel/next.js/issues/86785).
// El browserslist en package.json ya exige navegadores que soportan estas
// funciones de forma nativa, así que se reemplaza por un módulo vacío.
