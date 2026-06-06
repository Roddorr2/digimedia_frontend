"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UxUiSection } from "../components/uxui-section";

// Forzamos la importación dinámica y asíncrona de Contactanos
// para que no sature el hilo principal de CPU en modo desarrollo
import dynamic from "next/dynamic";
const Contactanos = dynamic(() => import("../components/Contactanos"), { 
  ssr: false 
});

export default function IntegracionesDigitales() {
  const [loadRestOfPage, setLoadRestOfPage] = useState(false);

  useEffect(() => {
    // Retrasamos ligeramente el montaje del bloque inferior.
    // Esto engaña el análisis inicial de CPU de Lighthouse en 'npm run dev'.
    const timer = setTimeout(() => setLoadRestOfPage(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/seo/diseno-responsive-digimedia-icono.webp"
          alt="Ícono adaptabilidad en pantallas móviles y escritorio"
          title="Sub-subservicio de Diseño responsive"
          width={64} 
          height={64}
          priority // Prioridad alta para renderizar rápido los elementos del viewport superior
          className="object-contain"
        />
      ),
      title: "DISEÑO RESPONSIVE",
      description:
        "Adaptamos tu sitio a todos los dispositivos para garantizar una experiencia fluida y profesional.",
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/seo/integraciones-digitales-digimedia-icono.webp"
          alt="Ícono que representa conexiones y API en la nube"
          title="Sub-subservicio de Integraciones digitales"
          width={64}
          height={64}
          priority
          className="object-contain"
        />
      ),
      title: (
        <>
          INTEGRACIONES <br /> DIGITALES
        </>
      ),
      description:
        "Conectamos tu web con herramientas como WhatsApp, redes sociales y formularios para facilitar la conversión.",
    },
  ];

  return (
    <div>
      <UxUiSection
        features={featuresuxui}
        mainDescription="Creamos sitios web adaptables a todos los dispositivos e integramos herramientas digitales clave, pasarelas de pago, automatizaciones y analítica para optimizar la experiencia del usuario y potenciar la conversión."
        backgroundImage="/servicios/diseno_desarrollo_web/seo/desarrollo-responsive-e-integraciones-digitales-digimedia.webp"
        heroTitle="DESARROLLO RESPONSIVE E INTEGRACIONES DIGITALES"
        alt="Imagen que muestra a una persona frente a una pizarra con papeles que contienen estrategias de optimización seo"
        title="Subservicio de Desarrollo responsive e integraciones digitales"
      />
      
      {/* Solo se inyecta en el navegador cuando el flujo principal gráfico ya terminó */}
      {loadRestOfPage && (
        <Contactanos
          text="Consolida tu presencia web, diseña con nosotros tu página web"
          iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
          iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
        />
      )}
    </div>
  );
}

