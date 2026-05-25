"use client";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";

export default function ProduccionPautas() {
  const features = [
    {
      icon: (
        <img
          src="/servicios/gestion/produccion-pautas/icons/diseno-estrategia-pautas-digitales-digimedia.webp"
          alt="Ícono de documentos con bombilla representando diseño estratégico de pautas y campañas digitales en Digimedia"
          title="Diseño estratégico de pautas digitales | Digimedia Marketing"
          className="w-full h-full object-contain"
        />
      ),
      title: "Conceptualización y guión",
      description:
        "Desarrollamos ideas creativas alineadas a la estrategia de contenido. Definimos mensaje, formato y enfoque para asegurar impacto desde los primeros segundos.",
    },
    {
      icon: (
        <img
          src="/servicios/gestion/produccion-pautas/icons/produccion-audiovisual_card-1-produccion-y-edicion.webp"
          alt="Producción y edición"
          title="Producción Audiovisual: Producción y Edición | Digimedia Marketing"
          className="w-full h-full object-contain"
        />
      ),
      title: "Producción y edición",
      description:
        "Realizamos grabación, edición y adaptación de piezas audiovisuales optimizadas para cada plataforma, priorizando dinamismo, claridad y engagement.",
    },
  ];

  return (
    <div>
      {/* Servicio: Gestión de Redes Sociales, Subservicio: Producción Audiovisual*/ }

      <UxUiSection
        features={features}
        mainDescription="Creamos contenido visual que capta atención y genera conexión. Desarrollamos piezas audiovisuales pensadas estratégicamente para redes sociales, combinando creatividad, narrativa y objetivos de marca."
        backgroundImage="/servicios/planificacion/produccion-audiovisual.webp"
        heroTitle=<>
          PRODUCCIÓN
          <br />
          AUDIOVISUAL
        </>
        alt="Producción de anuncios gráficos y textos publicitarios listos para campañas en Meta Ads y redes sociales."
        title="Producción creativa de pautas para campañas publicitarias – Digimedia"
        category="Gestión de redes sociales"
        // heroBulletPoints={[
        // "Crear contenidos listos para ser promocionados.",
        // "Asegurar que los anuncios sean visualmente atractivos y técnicamente óptimos.",
        // "Maximizar el rendimiento de las campañas en redes sociales.",
        // ]}
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </div>
  );
}
