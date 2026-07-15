/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'export',
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['@radix-ui/react-*', 'lucide-react','@marsidev/react-turnstile'],
  },
  compress: true,
  swcMinify: true,
};

export default nextConfig;
