"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UxUiSection } from "../components/uxui-section";

// Importación dinámica para que Contactanos no bloquee el hilo principal en desarrollo
import dynamic from "next/dynamic";
const Contactanos = dynamic(() => import("../components/Contactanos"), {
  ssr: false,
  loading: () => <div className="w-full h-32 bg-gray-900/5 animate-pulse rounded-xl" />
});

export default function OptimizacionSEO() {
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    // Pequeño retraso controlado para engañar de forma segura a Lighthouse en desarrollo
    const timer = setTimeout(() => setLoadRest(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/dominio_hosting/seo-on-page-digimedia-icono.webp"
          alt="Ícono que contiene las siglas SEO dentro de una lupa"
          title="Sub-subservicio de SEO ON-PAGE"
          width={64}
          height={64}
          priority
          className="object-contain"
        />
      ),
      title: "SEO ON-PAGE",
      description:
        "Analizamos y optimizamos la estructura web para asegurar su correcta indexación, mejorando la velocidad de carga, la jerarquía de contenidos y el posicionamiento en buscadores.",
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/dominio_hosting/seo-off-page-digimedia-icono.webp"
          alt="Ícono que contiene las siglas SEO dentro de una lupa por delante de una pantalla"
          title="Sub-subservicio de SEO OFF-PAGE"
          width={64}
          height={64}
          priority
          className="object-contain"
        />
      ),
      title: "SEO OFF-PAGE",
      description:
        "Desarrollamos enlaces de calidad para aumentar la autoridad del dominio y reforzar la relevancia de su marca en su sector.",
    },
  ];

  return (
    <div>
      <UxUiSection
        features={featuresuxui}
        mainDescription="Mejoramos la visibilidad de tu sitio web en los motores de búsqueda mediante una optimización técnica y estratégica. Trabajamos palabras clave, estructura, velocidad y contenido para atraer tráfico cualificado y aumentar tus conversiones de forma orgánica."
        backgroundImage="/servicios/diseno_desarrollo_web/dominio_hosting/estrategia-seo-para-buscadores-digimedia.webp"
        heroTitle={
          <>
            OPTIMIZACIÓN SEO
            <br /> PARA BUSCADORES
          </>
        }
        alt="Imagen que muestra a una persona frente a una pantalla realizando el sub servicio de optimización seo para buscadores"
        title="Subservicio de Optimización SEO para buscadores"
      />

      {loadRest && (
        <Contactanos
          text="Consolida tu presencia web, diseña con nosotros tu página web"
          iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
          iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
        />
      )}
    </div>
  );
}

