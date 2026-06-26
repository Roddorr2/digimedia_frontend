"use client";
import React from "react";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/MayaChatbot";

export default function DisenoLogo() {
  const features = [
    {
      icon: (
        <img
          src="/servicios/branding_diseno/publicidad_digital/icons/diseno-de-logo-digimedia.webp"
          alt="Ícono de herramienta de adobe illustrator"
          title="diseño de logo"
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
      {/* Servicio: Branding & Diseño, Subservicio: Diseño de Logo */}
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
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
      <WhatsAppButton />
      <MayaChatbot />
    </div>
  );
}
