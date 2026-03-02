import Contactanos from "../components/Contactanos";
import ModalScroll from "../components/ModalScroll";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";
import ModalButton from "../components/ModalButton";

export default function UXUI() {
  const modales = {
    modalA: {
      text: "DISEÑO Y DESARROLLO WEB",
      fondo: "/servicios/desarrollo/modal-scroll/disenoydesarrolloweb.png",
      title: "OBTÉN UNA ASESORÍA ¡GRATIS!",
      serviceName: "1",
    },
  };

  const featuresuxui = [
    {
      icon: (
        <img
          src="/servicios/diseno_desarrollo_web/seo/desarrollo-web-card-1-diseno-responsive.webp"
          alt="Lupa del seo "
          className="w-full h-full stroke-1"
        />
      ),
      title: "DISEÑO RESPONSIVE",
      description:
        "Adaptamos tu sitio a todos los dispositivos para garantizar una experiencia fluida y profesional.",
    },
    {
      icon: (
        <img
          src="/servicios/diseno_desarrollo_web/seo/desarrollo-web-card-2-integraciones-digitales.webp"
          alt="Lupa del seo buscando en la red"
          className="w-full h-full stroke-1"
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
      <ModalScroll data={modales} />
      <ModalButton
        title="Lleva tu negocio al siguiente nivel online"
        fondo="/servicios/desarrollo/modal-button/imagen.webp"
        text="DISEÑO Y DESARROLLO WEB"
        serviceName="1"
      />
      <UxUiSection
        features={featuresuxui}
        mainDescription="Creamos sitios web adaptables a todos los dispositivos e integramos herramientas digitales clave, pasarelas de pago, automatizaciones y analítica para optimizar la experiencia del usuario y potenciar la conversión."
        backgroundImage="/servicios/diseno_desarrollo_web/seo/seo_principal.webp"
        heroTitle="DESARROLLO RESPONSIVE E INTEGRACIONES DIGITALES"
        alt="Posicionamiento web,  SEO on page, SEO off page, auditoría SEO, optimización web, herramienta SEO"
        title="Diseño y desarrollo web, SEO, Digimedia.webp"
      // heroBulletPoints={[
      //   "MÁS VISIBILIDAD = MÁS TRÁFICO: APARECER ARRIBA EN GOOGLE SIGNIFICA QUE MÁS GENTE INTERESADA ENCONTRARÁ TU SITIO.",
      //   "TRÁFICO DE CALIDAD = MEJORES RESULTADOS: ATRAES A PERSONAS QUE REALMENTE BUSCAN LO QUE OFRECES, AUMENTANDO TUS POSIBILIDADES DE ÉXITO.",
      //   "CONFIANZA Y AUTORIDAD: LOS PRIMEROS RESULTADOS SE VEN MÁS CREÍBLES, LO QUE FORTALECE TU MARCA."
      // ]}
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>
  );
}
