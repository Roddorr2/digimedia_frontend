import Image from "next/image";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/Chatbot";

export default function CampanasDigitales() {
  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/naming_logo_slogan/icons/gestion-campanas-digital-digimedia.webp"
          alt="Ícono de megáfono representando gestión de campañas y publicidad digital en redes sociales"
          className="w-full h-full object-contain"
          title="Gestión de campañas de publicidad digital | Digimedia Marketing"
          width={48}
          height={48}
        />
      ),
      title: "GESTIÓN DE CAMPAÑAS",
      description:
        "Creamos y administramos campañas digitales desde su planificación hasta su ejecución, definiendo objetivos claros, segmentación precisa y estrategias alineadas con tu público objetivo.",
    },

    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/naming_logo_slogan/icons/planificacion-calendario-campanas-digitales-digimedia.webp"
          alt="Ícono de calendario con reloj representando planificación y programación de campañas digitales"
          title="Planificación y programación de campañas digitales | Digimedia Marketing"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: "OPTIMIZACIÓN CONTINUA",
      description:
        "Supervisamos el rendimiento en tiempo real y realizamos ajustes estratégicos en presupuesto, anuncios y segmentación para mejorar resultados y reducir costos por conversión.",
    },
  ];

  return (
    <div>
      {/* Servicio: Marketing y Gestión Digital, Subservicio: Campañas Digitales */}
      <UxUiSection
        features={featuresuxui}
        mainDescription="Desarrollamos campañas digitales orientadas a resultados, combinando análisis de datos, segmentación estratégica y optimización continua. Nuestro enfoque permite mejorar el desempeño de la inversión publicitaria, alcanzar a la audiencia correcta y potenciar el crecimiento de la marca de manera sostenible."
        backgroundImage="/servicios/DisenoUI/campanias-digitales.webp"
        heroTitle=<>
          CAMPAÑAS
          <br /> DIGITALES
        </>
        // heroBulletPoints={[]}
        alt="Naming, logo, slogan, piezas gráficas, redes sociales, aplicaciones digitales, señalética, merchandising, lenguaje visual, tono y voz de marca"
        title="Campañas Digitales"
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
