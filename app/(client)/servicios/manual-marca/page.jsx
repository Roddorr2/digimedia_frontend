import Image from "next/image";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/Chatbot";

export default function AnalisisMetricas() {
  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/manual_marca/icons/analisis-kpis-rendimiento-digital-digimedia.webp"
          title="Análisis de KPIs y métricas de rendimiento digital | Digimedia Marketing"
          alt="Ícono de check representando análisis y validación de KPIs en estrategia de marketing digital"
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
          src="/servicios/marketing_gestion_digital/manual_marca/icons/interpretacion-crecimiento-metricas-digitales-digimedia.webp"
          title="Interpretación de métricas y crecimiento digital | Digimedia Marketing"
          alt="Ícono de gráfica ascendente representando interpretación de métricas y crecimiento en marketing digital"
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
          src="/servicios/marketing_gestion_digital/manual_marca/icons/reportes-seguimiento-rendimiento-digital-digimedia.webp"
          alt="Ícono de gráfica circular ascendente representando generación de reportes y seguimiento de resultados en marketing digital"
          className="w-full h-full object-contain"
          title="Reportes y seguimiento de rendimiento digital | Digimedia Marketing"
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
      {/* Servicio: Marketing y Gestión Digital, Subservicio: Análisis de Métricas */}

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
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
      <WhatsAppButton />
      <MayaChatbot />
    </div>
  );
}
