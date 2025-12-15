"use client";
import React from "react";

import Contactanos from "../components/Contactanos";
import ModalScroll from "../components/ModalScroll";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";
import ModalButton from "../components/ModalButton";

export default function PlanificacionEstrategica() {
  const modales = {
    modalA: {
      text: "BRANDING Y DISEÑO",
      fondo: "/servicios/branding/modal-scroll/fondo.webp",
      title: "TU PRIMERA CONSULTA ¡ES GRATIS!",
      serviceName: "4",
    },
  };

  const features = [
    {
      icon: (
        <img
          src="/servicios/planificacion-estrategica/icons/planificacion.webp"
          alt="Hoja de planificación"
          className="w-full h-full object-contain"
        />
      ),
      title: "PLANIFICACIÓN",
      description:
        "Implica analizar la situación actual e identificar oportunidades y amenazas, y asignar recursos para lograr la visión a largo plazo. ",
    },
  ];

  return (
    <div>
      <ModalScroll data={modales} />
      <ModalButton
        title="¡DISEÑA TU CAMINO HACIA EL ÉXITO!"
        fondo="/servicios/branding/modal-button/imagen.webp"
        text="BRANDING Y DISEÑO"
        serviceName="4"
      />
      <UxUiSection
        features={features}
        mainDescription="Es el proceso sistemático para definir la dirección de una organización, establecer objetivos y desarrollar estrategias para alcanzarlos."
        backgroundImage="/servicios/planificacion-estrategica/planificacion-estrategica-main.webp"
        heroTitle="PLANIFICACIÓN ESTRATÉGICA"
        alt="Planificación estratégica, marketing digital, gestión digital, toma de decisiones, posicionamiento de marca, análisis de mercado, estructura de campañas, crecimiento digital, estrategia de contenidos, agencia Digimedia"
        title="Planificación estratégica, gestión digital, agencia de marketing digimedia"
        heroBulletPoints={[
          "Ayuda a las organizaciones a ser más eficientes y competitivas.",
          "Facilita la toma de decisiones estratégicas.",
          "Mejora la comunicación y el compromiso de los empleados.",
          "Ayuda a anticipar cambios en el entorno y adaptarte a ellos.",
        ]}
        
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>
  );
}
