"use client";
import React from "react";

import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";

export default function PlanificacionEstrategica() {
  const features = [
    {
      icon: (
        <img
          src="/servicios/branding_diseno/planificacion_estrategica/icons/diseno-de-logo-digimedia.webp"
          alt="Icono que muestra la representación estratégica"
          title="Planificacion Estrategica"
          className="w-full h-full object-contain"
        />
      ),
      title: "PLANIFICACIÓN",
      description:
        "Analizamos su situación actual, identificamos oportunidades clave y optimizamos el uso de recursos para construir una estrategia sostenible y orientada al crecimiento de su empresa.",
    },
  ];

  return (
    <div>
      {/* Servicio: Branding y Diseño, Subservicio: Planificación Estratégica */}
      <UxUiSection
        features={features}
        mainDescription="Definimos la dirección de su organización, establecemos objetivos claros y desarrollamos estrategias accionables para alcanzarlos. Nuestro enfoque sistemático asegura que su negocio no solo compita, sino que lidere en su sector."
        backgroundImage="/servicios/planificacion-estrategica/planificacion-estrategica.webp"
        heroTitle="PLANIFICACIÓN ESTRATÉGICA"
        alt="Planificación estratégica, marketing digital, gestión digital, toma de decisiones, posicionamiento de marca, análisis de mercado, estructura de campañas, crecimiento digital, estrategia de contenidos, agencia Digimedia"
        title="Planificación estratégica, gestión digital, agencia de marketing digimedia"
        category="Branding y Diseño"
        // heroBulletPoints={[
        //   "Ayuda a las organizaciones a ser más eficientes y competitivas.",
        //   "Facilita la toma de decisiones estratégicas.",
        //   "Mejora la comunicación y el compromiso de los empleados.",
        //   "Ayuda a anticipar cambios en el entorno y adaptarte a ellos.",
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
