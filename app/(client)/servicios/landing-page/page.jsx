import Image from "next/image";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/MayaChatbot";

export default function LandingPage() {
  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/landing_page/diseno-orientado-conversion.webp"
          alt="Ícono que representa el diseño de alta conversión en una landing page creada por Digimedia"
          title="Sub-subservicio de Diseño de Orientado a la Conversión"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: (
        <>
          DISEÑO ORIENTADO A LA <br />
          CONVERSIÓN
        </>
      ),
      description:
        "Creamos landing pages con estructura persuasiva y visual impactante. Cada sección está diseñada para eliminar distracciones y llevar al usuario directamente hacia la acción que tu negocio necesita.",
    },

    ///Segundo Modal
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/landing_page/optimizacion-velocidad.webp"
          alt="Ícono que representa la optimización y los resultados que genera una landing page de Digimedia"
          title="Sub-subservicio de Optimización y Velocidad"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: (
        <>
          OPTIMIZACIÓN <br />Y Velocidad
        </>
      ),
      description:
        "Una landing page lenta pierde clientes. Nos aseguramos de que tu página cargue rápido, funcione en todos los dispositivos y esté lista para conectarse con tus campañas de Google Ads, Meta Ads o email marketing.",
    },
  ];

  return (
    <div>
      <UxUiSection
        features={featuresuxui}
        mainDescription="Diseñamos landing pages estratégicas que capturan la atención de tu audiencia y la convierten en acción. Cada elemento —desde el titular hasta el botón de llamada a la acción— está pensado para guiar al visitante hacia un único objetivo: convertir. No es solo una página bonita, es tu mejor vendedor digital trabajando las 24 horas."
        backgroundImage="/servicios/diseno_desarrollo_web/landing_page/landing-page-digimedia.webp"
        heroTitle="LANDING PAGE"
        alt="Imagen que muestra el servicio de landing page de Digimedia, una página diseñada para convertir visitantes en clientes"
        title="Subservicio de Landing Page"
        category="Diseño y Desarrollo Web"
      />
      <Contactanos
        text="Convierte más visitantes en clientes con una landing page profesional. ¡Hablemos!"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
      <WhatsAppButton />
      <MayaChatbot />
    </div>
  );
}
