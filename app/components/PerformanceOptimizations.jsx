'use client';

import { useEffect } from 'react';

/**
 * Componente que inyecta preconnect/dns-prefetch links para mejorar TTFB
 * Ejecuta una sola vez al cargar la página
 */
export default function PerformanceOptimizations() {
  useEffect(() => {
    // Preconectar a Google Tag Manager
    const preconnectGTM = document.createElement('link');
    preconnectGTM.rel = 'preconnect';
    preconnectGTM.href = 'https://www.googletagmanager.com';
    document.head.appendChild(preconnectGTM);

    // Preconectar a Google Analytics
    const preconnectGA = document.createElement('link');
    preconnectGA.rel = 'preconnect';
    preconnectGA.href = 'https://www.google-analytics.com';
    document.head.appendChild(preconnectGA);

    // DNS prefetch a Cloudinary (si lo usas)
    const dnsPrefetchCloudinary = document.createElement('link');
    dnsPrefetchCloudinary.rel = 'dns-prefetch';
    dnsPrefetchCloudinary.href = 'https://res.cloudinary.com';
    document.head.appendChild(dnsPrefetchCloudinary);

    return () => {
      // Cleanup (opcional, pero buena práctica)
      document.head.removeChild(preconnectGTM);
      document.head.removeChild(preconnectGA);
      document.head.removeChild(dnsPrefetchCloudinary);
    };
  }, []);

  return null;
}
