"use client";
import React from "react";

import Contactanos from "../components/Contactanos";
import ModalScroll from "../components/ModalScroll";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";
import ModalButton from "../components/ModalButton";

export default function DisenoPauta() {
  const modales = {
    modalA: {
      text: "BRANDING Y DISEÑO",
      fondo: "/servicios/branding/modal-scroll/Branding-y-diseno-digimedia-pop-up.webp",
      title: "TU PRIMERA CONSULTA ¡ES GRATIS!",
      serviceName: "4",
    },
  };

  const features = [
    {
      icon: (
        <img
          src="/servicios/branding_diseno/publicidad_digital/icons/diseno-de-logo_card1-DISENO-DE-LOGO.webp"
          alt="Computadora con iconos de publicidad"
          className="w-full h-full object-contain"
        />
      ),
      title: "DISEÑO DE LOGO",
      description:
        "Tu logo es la base de tu identidad visual y la primera impresión de tu marca. Un diseño profesional te permite diferenciarte, generar reconocimiento y transmitir confianza en todos tus canales de comunicación.",
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
        mainDescription="Creamos logotipos profesionales que reflejan la identidad y propósito de tu marca. Cada diseño es único, pensado estratégicamente para comunicar los valores, personalidad y posicionamiento de tu empresa ante tu público objetivo."
        backgroundImage="/servicios/gestion/diseno-pautas/diseno-de-logo.webp"
        heroTitle=<>
          DISEÑO <br /> DE LOGO
        </>
        alt="Representación visual de estrategias de branding digital con iconos de creatividad, redes sociales, análisis de datos y posicionamiento online, parte de los servicios que ofrece Digimedia agencia de marketing Digital"
        title="Publicidad Digital, gestión digital, Agencia de Marketing Digimedia "
        category="Branding y Diseño"
        // heroBulletPoints={[
        //   "PERMITE LLEGAR A AUDIENCIAS EN TODO EL MUNDO, SIN IMPORTAR LA UBICACIÓN GEOGRÁFICA.",
        //   "PERMITE DIRIGIR LOS MENSAJES A GRUPOS ESPECÍFICOS DE PERSONAS CON INTERESES Y COMPORTAMIENTOS SIMILARES.",
        //   "PUEDE GENERAR UN MAYOR NÚMERO DE LEADS Y VENTAS, ESPECIALMENTE CUANDO SE IMPLEMENTA UNA ESTRATEGIA DE MARKETING DIGITAL EFECTIVA."
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
