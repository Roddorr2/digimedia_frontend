import Image from "next/image";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import ModalButton from "../components/ModalButton";
import ServicePopup from "@/app/dashboard/whatsapp/components/ServicePopup";

export default function UXUI() {
  const modales = {
    modalA: {
      text: "MARKETING Y GESTIÓN DIGITAL",
      fondo:
        "/servicios/marketing/modal-scroll/estrategia-marketing-gestion-digital-analisis-datos.webp",
      title: "HAZLO Y CUMPLE TUS SUEÑOS ¡ASESORÍA Gratis!",
      serviceName: "3",
      imageTitle:
        "Estrategia de marketing y gestión digital empresarial | Digimedia Marketing",
      imageAlt:
        "Equipo analizando métricas y gráficos en reunión de estrategia de marketing y gestión digital",
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/naming_logo_slogan/icons/gestion-campanas-publicidad-digital-digimedia.webp"
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
      <ServicePopup idSubservicio={15} />
      <ModalButton
        title="¡EXPLOTA EL CONTENIDO DE TUS REDES!"
        fondo="/servicios/marketing/modal-button/inicio-sesion-cuenta-plataforma-digital.webp"
        text="MARKETING Y GESTIÓN DIGITAL"
        serviceName="3"
        imageTitle="Inicio de sesión en plataforma digital | Acceso seguro"
        imageAlt="Ilustración de usuarios accediendo a una plataforma digital mediante inicio de sesión con usuario y contraseña."
      />

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
    </div>
  );
}
