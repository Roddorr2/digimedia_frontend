/** @type {import('next').NextConfig} */
const nextConfig = {
  // Para sitio estático exportado, usamos unoptimized: true
  // pero Next.js aún puede servir imágenes con caché inteligente
  images: {
    unoptimized: true,
    // Permitir dominios externos para CloudinaryasImageDomain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'export',
  trailingSlash: true,
  // Optimización de compilación
  experimental: {
    optimizePackageImports: ['@radix-ui/react-*', 'lucide-react','@marsidev/react-turnstile'],
  },
  // Compresión automática de assets
  compress: true,
  // Reducir tamaño de JS
  swcMinify: true,
};

export default nextConfig;
