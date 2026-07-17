import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

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
    // "output: export" obliga a que TODO param dinámico exista en
    // generateStaticParams(), y en `next dev` eso revienta con un
    // Runtime Error al visitar un blog en borrador. Solo lo activamos
    // para el build de producción; en dev, Next renderiza sobre la
    // marcha y respeta dynamicParams = false con un 404 normal.
    ...(isDev ? {} : { output: 'export' }),
    trailingSlash: true,
    experimental: {
      optimizePackageImports: ['@radix-ui/react-*', 'lucide-react','@marsidev/react-turnstile'],
    },
    compress: true,
    swcMinify: true,
  };
};
