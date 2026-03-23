import Image from "next/image";
import Contactanos from "../components/Contactanos";
import ModalScroll from "../components/ModalScroll";
import { UxUiSection } from "../components/uxui-section";
import ModalButton from "../components/ModalButton";

export default function UXUI() {
  const modales = {
    modalA: {
      text: "MARKETING Y GESTIÓN DIGITAL",
      fondo: "/servicios/marketing/modal-scroll/estrategia-marketing-gestion-digital-analisis-datos.webp",
      title: "HAZLO Y CUMPLE TUS SUEÑOS ¡ASESORÍA Gratis!",
      serviceName: "3",
      imageTitle: "Estrategia de marketing y gestión digital empresarial | Digimedia Marketing",
      imageAlt: "Equipo analizando métricas y gráficos en reunión de estrategia de marketing y gestión digital",
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/naming_logo_slogan/icons/gestion-de-campanias_card1-gestion-de-campanias.webp"
          alt="Icono de una anuncio marketing"
          className="w-full h-full object-contain"
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
          src="/servicios/marketing_gestion_digital/naming_logo_slogan/icons/gestion-de-campanas_card2-optimizacion-continua.webp"
          alt="Icono de gestión campaña"
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
      <ModalScroll data={modales} />
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
        title="Branding y diseño, Manual de marca, Digimedia.webp"
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
