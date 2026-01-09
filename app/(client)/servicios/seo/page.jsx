
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"
import ModalButton from "../components/ModalButton";

export default function UXUI() {
  const modales = {
    modalA: {
      text: "DISEÑO Y DESARROLLO WEB",
      fondo: "/servicios/desarrollo/modal-scroll/fondo.webp",
      title: "OBTÉN UNA ASESORÍA ¡GRATIS!",
      serviceName: "1",
    },
  };

  const featuresuxui = [
    {
      icon: <img src="/servicios/seo/seo_on.webp" alt="Lupa del seo " className="w-full h-full stroke-1" />,
      title: "SEO ON-PAGE",
      description:
        "SAnalizamos y optimizamos la estructura web para asegurar su correcta indexación, mejorando la velocidad de carga, la jerarquía de contenidos y el posicionamiento en buscadores.",
    },
    {
      icon: <img src="/servicios/seo/seo_off.webp" alt="Lupa del seo buscando en la red" className="w-full h-full stroke-1" />,
      title: "SEO OFF-PAGE",
      description:
        "Desarrollamos enlaces de calidad para aumentar la autoridad del dominio y reforzar la relevancia de su marca en su sector.",
    },
  ]

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
        mainDescription='La visibilidad en buscadores es un activo crítico para la captación de tráfico cualificado. En DigiMedia, implementamos metodologías de posicionamiento basadas en datos y análisis técnico. Nuestro objetivo es alinear su infraestructura digital con los estándares de calidad de Google para asegurar un crecimiento sostenible en los resultados de búsqueda, sin depender exclusivamente de la inversión publicitaria.'
        backgroundImage='/servicios/seo/seo_principal.webp'
        heroTitle="SEO  "
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


