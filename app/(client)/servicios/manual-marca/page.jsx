
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from "../components/uxui-section"
import { PencilRuler, Palette, SpellCheck, Layers } from "lucide-react"
import ModalButton from "../components/ModalButton";

export default function UXUI() {
  const modales = {
    modalA: {
      text: "MARKETING Y GESTIÓN DIGITAL",
      fondo: "/servicios/marketing/modal-scroll/fondo.webp",
      title: "HAZLO Y CUMPLE TUS SUEÑOS ¡ASESORÍA GRATIS!",
      serviceName: "3",
    },
  };

  const featuresuxui = [
    // {
    //   icon: <PencilRuler className="w-full h-full stroke-1" />,
    //   title: "logotipo y aplicaciones",
    //   description:
    //     "INCLUYE DIFERENTES VARIANTES DEL LOGOTIPO, COMO VERSIONES CON Y SIN TEXTO, Y PAUTAS SOBRE CÓMO Y DÓNDE USAR CADA UNA.",
    //   alt: "Logotipo, Usos correctos/incorrectos, Tipografía, Paleta de colores, Imagotipo, Isotipo, Logotipo, Retícula, Iconografía, Papelería corporativa",
    // },

    {
      icon: <Palette className="w-full h-full stroke-1" />,
      title: "paleta de colores",
      description:
        "Definimos los colores primarios y secundarios de la marca incluyendo sus códigos, rgb, cmyk y pantone para facilitar sus uso en diferentes soportes.",
      alt: "Logotipo, Usos correctos/incorrectos, Tipografía, Paleta de colores, Imagotipo, Isotipo, Logotipo, Retícula, Iconografía, Papelería corporativa",
    },

    {
      icon: <SpellCheck className="w-full h-full stroke-1" />,
      title: "tipografía",
      description:
        "Seleccionamos las fuentes de letra principales y secundarias, incluyendo ejemplos de como usarías en diferentes tamaños y estilos para titulares y cuerpos de texto.",
      alt: "Logotipo, Usos correctos/incorrectos, Tipografía, Paleta de colores, Imagotipo, Isotipo, Logotipo, Retícula, Iconografía, Papelería corporativa",
    },

  ]

  return (

    <div>
      <ModalScroll data={modales} />

      <ModalButton
        title="¡EXPLOTA EL CONTENIDO DE TUS REDES!"
        fondo="/servicios/marketing/modal-button/imagen.webp"
        text="MARKETING Y GESTIÓN DIGITAL"
        serviceName="3"
      />

      <UxUiSection
        features={featuresuxui}
        mainDescription='La planificación estratégica es el mapa que guía su negocio hacia el éxito en el entorno digital. Definimos objetivos claros, identificamos oportunidades y diseñamos una hoja de ruta personalizada para consolidar su presencia online, maximizar su alcance y asegurar un crecimiento sostenible.'
        backgroundImage='/servicios/DisenoUI/branding3.webp'
        heroTitle="MANUAL DE MARCA"
        heroBulletPoints={[]}
        alt="Piezas gráficas, Redes sociales, Aplicaciones digitales, Señalética, Merchandising, Lenguaje visual, Tono y voz de marca"
        title="Branding y diseño - Manual de marca - Digimedia.webp"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>

  );
}


