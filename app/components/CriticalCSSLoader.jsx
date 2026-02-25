'use client';

import { useEffect } from 'react';

/**
 * Componente que carga CSS no crítico de forma deferred
 * Usar en el layout para mejorar FCP/LCP
 * Los estilos críticos (layout, fonts, colores) se inline en Head
 * Los estilos no críticos se cargan con media="print" + onload trick
 */
export default function CriticalCSSLoader() {
  useEffect(() => {
    // Cargar todos los stylesheets del head (que hayan sido marcados con rel="preload" y media="print")
    // Esto hace que se carguen en paralelo pero sin bloquear render inicial
    const links = document.querySelectorAll(
      'link[rel="preload"][media="print"][data-defer="true"]',
    );
    links.forEach((link) => {
      const onload = () => (link.media = 'all'); // Cambiar media a 'all' cuando esté cargado
      link.addEventListener('load', onload);
      link.media = 'all'; // Por si ya está cargado
    });
  }, []);

  return null; // Este componente no renderiza nada
}
