import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {(phase: string) => import('next').NextConfig} */
export default (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    ...(isDev ? {} : { output: 'export' }),
    trailingSlash: true,
    experimental: {
      optimizePackageImports: ['@radix-ui/react-*', 'lucide-react','@marsidev/react-turnstile'],
    },
    compress: true,
    webpack: (config, { dev, webpack }) => {
      if (!dev) {
        // Next.js incluye este polyfill de forma incondicional (Array.at, flat,
        // flatMap, Object.fromEntries, Object.hasOwn, String.trimStart/trimEnd),
        // sin respetar el browserslist del proyecto. Como ya solo damos soporte
        // a navegadores que implementan estas funciones de forma nativa, se
        // sustituye por un módulo vacío para no enviarlo al cliente.
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(
            /build[\\/]polyfills[\\/]polyfill-module/,
            path.join(__dirname, 'scripts', 'empty-polyfill.js')
          )
        );
      }
      return config;
    },
  };
};
