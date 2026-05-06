import Image from "next/image";
import Contactanos from "../components/Contactanos";
import ModalScroll from "../components/ModalScroll";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";
import ModalButton from "../components/ModalButton";

export default function UXUI() {
  const modales = {
    modalA: {
      text: "DISEÑO Y DESARROLLO WEB",
      fondo: "/servicios/desarrollo/modal-scroll/diseno-desarrollo-web-digimedia-pop-up.webp",
      alt:'diseno digimedia pop up',
      title: "OBTÉN UNA ASESORÍA ¡GRATIS!",
      serviceName: "1",
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/dominio_hosting/estrategia-SEO_card1-SEO ON-PAGE.webp"
          alt="Icono de busqueda en la web y una lupa"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: "SEO ON-PAGE",
      description:
        "Analizamos y optimizamos la estructura web para asegurar su correcta indexación, mejorando la velocidad de carga, la jerarquía de contenidos y el posicionamiento en buscadores.",
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/dominio_hosting/estrategia-SEO_card2-SEO OFF-PAGE.webp"
          alt="Icono de un servidor en la nube"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: "SEO OFF-PAGE",
      description:
        "Desarrollamos enlaces de calidad para aumentar la autoridad del dominio y reforzar la relevancia de su marca en su sector.",
    },
  ];

  return (
    <div>
      <ModalScroll data={modales} />
      <ModalButton
        title="Lleva tu negocio al siguiente nivel online"
        fondo="/servicios/desarrollo/modal-button/imagen.webp"
        text="DISEÑO Y DESARROLLO WEB"
        serviceName="1"
      />
      <UxUiSection
        features={featuresuxui}
        mainDescription="Mejoramos la visibilidad de tu sitio web en los motores de búsqueda mediante una optimización técnica y estratégica. Trabajamos palabras clave, estructura, velocidad y contenido para atraer tráfico cualificado y aumentar tus conversiones de forma orgánica."
        backgroundImage="/servicios/diseno_desarrollo_web/dominio_hosting/estrategia-SEO-para-buscadores.webp"
        heroTitle=<>
          OPTIMIZACIÓN SEO
          <br /> PARA BUSCADORES
        </>
        alt="Dominio web, hosting profesional, hosting optimizado, alojamiento web, servidor seguro, mantenimiento web, seguridad web"
        title="Diseño y desarrollo web, Dominio y Hosting, Digimedia.webp"
      // heroBulletPoints={[
      //   "TE DAN UNA PRESENCIA ONLINE COMPLETA Y PROFESIONAL, GENERAN CONFIANZA, TE DAN CONTROL, AUMENTAN TU VISIBILIDAD Y SON LA BASE PARA CRECER EN INTERNET.",
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
