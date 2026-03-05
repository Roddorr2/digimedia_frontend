import Image from "next/image";
import Contactanos from "../components/Contactanos";
import ModalScroll from "../components/ModalScroll";
import { UxUiSection } from "../components/uxui-section";
import { PencilRuler, Palette, SpellCheck, Layers } from "lucide-react";
import ModalButton from "../components/ModalButton";

export default function UXUI() {
  const modales = {
    modalA: {
      text: "MARKETING Y GESTIÓN DIGITAL",
      fondo: "/servicios/marketing/modal-scroll/marketing-y-gestión-digital-digimedia-pop-up.webp",
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
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/manual_marca/icons/analisis-de-metricas_card1-analisis-de-kpis.webp"
          alt="Icono de un check para kpis"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: "ANÁLISIS DE KPIs",
      description:
        "Medimos indicadores clave de rendimiento como alcance, conversiones, CTR y ROI para evaluar el impacto real de cada acción digital.",
      alt: "Logotipo, Usos correctos/incorrectos, Tipografía, Paleta de colores, Imagotipo, Isotipo, Logotipo, Retícula, Iconografía, Papelería corporativa",
    },

    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/manual_marca/icons/analisis-de-metricas_card2-interpretacion-de-datos.webp"
          alt="Icono de crecimiento de interpretacion de datos"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: "INTERPRETACIÓN DE DATOS",
      description:
        "Transformamos datos complejos en información clara y comprensible que facilite la toma de decisiones estratégicas.",
      alt: "Logotipo, Usos correctos/incorrectos, Tipografía, Paleta de colores, Imagotipo, Isotipo, Logotipo, Retícula, Iconografía, Papelería corporativa",
    },
    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/manual_marca/icons/analisis-de-metricas_card3-reportes-estrategicos.webp"
          alt="Icono de tendendencia de reportes"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: "REPORTES ESTRATÉGICOS",
      description:
        "Elaboramos informes detallados y visuales que muestran resultados, tendencias y oportunidades de mejora.",
      alt: "Logotipo, Usos correctos/incorrectos, Tipografía, Paleta de colores, Imagotipo, Isotipo, Logotipo, Retícula, Iconografía, Papelería corporativa",
    },
  ];

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
        mainDescription="Evaluamos el desempeño de tus estrategias digitales a través del análisis de datos y métricas clave. Interpretamos la información obtenida para identificar oportunidades de mejora, optimizar recursos y tomar decisiones estratégicas basadas en resultados reales y medibles."
        backgroundImage="/servicios/DisenoUI/analisis-de-metricas.webp"
        heroTitle=<>
          ANÁLISIS DE <br /> MÉTRICAS
        </>
        // heroBulletPoints={[]}
        alt="Piezas gráficas, Redes sociales, Aplicaciones digitales, Señalética, Merchandising, Lenguaje visual, Tono y voz de marca"
        title="Branding y diseño - Manual de marca - Digimedia.webp"
        category="Marketing y gestión digital"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>
  );
}
