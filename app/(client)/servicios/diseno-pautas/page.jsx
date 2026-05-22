"use client";
import React from "react";

import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";
import Image from "next/image";
import ModalButton from "../components/ModalButton";
import ServicePopup from "@/app/dashboard/whatsapp/components/ServicePopup";

export default function DisenoPauta() {
  const modales = {
    modalA: {
      text: "GESTIÓN DE REDES SOCIALES",
      fondo: "/servicios/gestion/modal-scroll/gestion-redes-sociales-peru-digimedia.webp",
      title: "SOLO POR HOY ACCEDE A UNA ¡ASESORÍA GRATIS!",
      imageAlt:"Ilustración de gestión profesional de redes sociales desde una computadora",
      imageTitle:"Gestión estratégica de redes sociales en Perú | Digimedia",
      serviceName: "2",
    },
  };

  const features = [
    {
      icon: (
        <Image
          src="/servicios/gestion/diseno-pautas/icons/creacion-contenido-planificacion-digital-digimedia.png"
          title="Creación y planificación de contenido digital | Digimedia Marketing"
          alt="Ícono de documento con lápiz representando creación y planificación de contenido para marketing digital en Digimedia"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: "PLANIFICACIÓN DE CAMPAÑAS",
      description:
        "Definimos objetivos, audiencias, presupuesto y estructura de anuncios. Creamos estrategias de segmentación precisas alineadas a los objetivos del negocio.",
    },
    {
      icon: (
        <Image
          src="/servicios/gestion/diseno-pautas/icons/social-ads_card2-optimizacion-y-analisis.webp"
          title="Social Ads Optimización y Análisis Web"
          alt="Icono de una hoja con un lápiz"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: "OPTIMIZACIÓN Y ANÁLISIS",
      description:
        "Monitoreamos métricas clave, realizamos pruebas A/B y optimizamos campañas en tiempo real para mejorar el rendimiento y maximizar el retorno de inversión.",
    },
  ];

  return (
    <div>
      <ServicePopup idSubservicio={6}/>
      <ModalButton
        title="¡ELEVA TUS CAMPAÑAS A OTRO NIVEL!"
        fondo="/servicios/gestion/modal-button/marketing-digital-redes-sociales-peru-digimedia.webp"
        imageTitle="Marketing Digital y Redes Sociales en Perú | Digimedia"
        imageAlt="Ilustración de herramientas de marketing digital y gestión de redes sociales con iconos de interacción, análisis y contenido"
        text="GESTIÓN DE REDES SOCIALES"
        serviceName="2"
      />

      <UxUiSection
        features={features}
        mainDescription="Convertimos inversión en resultados medibles. Diseñamos y gestionamos campañas publicitarias en redes sociales enfocadas en performance, optimizando cada etapa del embudo para maximizar alcance, tráfico, leads y conversiones."
        backgroundImage="/servicios/gestion/diseno-pautas/social-ads-&-performance.webp"
        heroTitle=<>
          SOCIAL ADS &<br />
          PERFORMANCE
        </>
        // heroBulletPoints={[
        //   "Las pautas bien diseñadas incrementan el rendimiento de la inversión publicitaria.",
        //   "Son clave para posicionar productos, servicios o marcas en mercados competitivos.",
        //   "Permiten medir resultados y ajustar campañas en tiempo real.",
        //   "Atraer la atención del público objetivo rápidamente.",
        // ]}
        alt="Gestión de redes sociales, Diseño de pautas, Publicidad digital, Estrategia en redes, Social media marketing, Meta Ads, Facebook Ads, Anuncios para Instagram, Marketing digital, Community manager"
        title="Gestión de redes sociales, diseño de pautas, Digimedia.webp"
        category="Gestión de redes sociales"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </div>
  );
}
