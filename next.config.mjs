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
    ...(isDev ? {} : { output: 'export' }),
    trailingSlash: true,
    experimental: {
      optimizePackageImports: ['@radix-ui/react-*', 'lucide-react','@marsidev/react-turnstile'],
    },
    compress: true,
    swcMinify: true,
    webpack: (config, { dev }) => {
      if (!dev) {
        config.optimization.minimize = true;
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        };
      }
      return config;
    },
  };
};
