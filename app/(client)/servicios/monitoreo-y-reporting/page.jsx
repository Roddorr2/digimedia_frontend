"use client";
import Image from "next/image";
import Contactanos from "../components/Contactanos";
import ModalScroll from "../components/ModalScroll";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";
import ModalButton from "../components/ModalButton";

export default function ProduccionPautas() {
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
        <Image
          src="/servicios/branding_diseno/monitoreo_reporting/icons/manual-de-marca_card1-MANUAL-DE-IDENTIDAD-DE-MARCA.webp"
          alt="Icono de diagrama de arquitectura y diseño de sistemas"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: "MANUAL DE IDENTIDAD DE MARCA",
      description:
        "Un manual de identidad garantiza coherencia y uniformidad en todas las aplicaciones de tu marca. Evita errores visuales y refuerza una imagen profesional en cada punto de contacto.",
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
        mainDescription="Desarrollamos manuales de identidad de marca que definen los lineamientos visuales y normas necesarias para garantizar coherencia y consistencia en la comunicación de tu empresa."
        backgroundImage="/servicios/monitoreo_reporting/manual-de-marca.webp"
        heroTitle="MANUAL DE MARCA"
        // heroBulletPoints={[
        //   "PERMITE TOMAR DECISIONES INFORMADAS, IMPLEMENTAR MEDIDAS CORRECTIVAS Y OPTIMIZAR LA GESTIÓN DEL PROYECTO.",
        //   "FACILITA LA TOMA DE DECISIONES, LA COMUNICACIÓN DE LOS RESULTADOS Y LA MEJORA CONTINUA DEL PROCESO.",
        // ]}
        alt="Monitoreo de campañas, reporting digital, análisis de datos, seguimiento de métricas, visualización de informes, medición de resultados, dashboards, rendimiento digital, KPIs, optimización de estrategias, Digimedia"
        title="Monitoreo y reporting, gestión digital, agencia de marketing digimedia"
        category="Branding y Diseño"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </div>
  );
}
