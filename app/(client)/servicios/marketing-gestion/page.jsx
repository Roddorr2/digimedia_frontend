// Componentes
import Servicios from "../components/Servicios";
import Contactanos from "../components/Contactanos";
import Description from "../components/Description";
import Main from "../components/Main";
import ModalScroll from "../components/ModalScroll";
import ModalButton from "../components/ModalButton";

export default function Page() {
  const servicios = [
    {
      title: (
        <>
          ANÁLISIS Y<br />
          BENCHMARKING
        </>
      ),
      text: "Evaluamos y mejoramos el rendimiento de tu marca frente a la competencia con las mejores estrategias.",
      icon: "/servicios/marketing/icon1.svg",
      ruta: "/servicios/analisis-y-benchmarking/",
    },
    {
      title: (
        <>
          CAMPAÑAS
          <br />
          DIGITALES
        </>
      ),
      text: "Planificamos y optimizamos campañas en plataformas digitales para mejorar el rendimiento, la conversión y el retorno de inversión de tu marca.",
      icon: "/servicios/marketing/icon2.svg",
      ruta: "/servicios/naming-logo-slogan/",
    },
    {
      title: (
        <>
          IDENTIDAD VISUAL
          <br /> Y CORPORATIVA
        </>
      ),
      text: "Aseguramos que tu presencia online sea segura, rápida y eficiente para la disponibilidad de tus clientes.",
      icon: "/servicios/marketing/icon3.svg",
      ruta: "/servicios/identidad-visual/",
    },
    {
      title: (
        <>
          ANÁLISIS DE
          <br /> MÉTRICAS
        </>
      ),
      text: "Evaluamos el desempeño de tus estrategias digitales mediante métricas clave para optimizar acciones y tomar decisiones basadas en resultados.",
      icon: "/servicios/marketing/icon4.svg",
      ruta: "/servicios/manual-marca/",
    },
  ];
  const modales = {
    modalA: {
      text: "MARKETING Y GESTIÓN DIGITAL",
      fondo: "/servicios/marketing/modal-scroll/marketingygestiondigital.jpg",
      title: "HAZLO Y CUMPLE TUS SUEÑOS ¡ASESORÍA GRATIS!",
      serviceName: "3",
      width: 256,
      height: 144,
    },
  };
  return (
    <>
      <ModalScroll data={modales} />

      <ModalButton
        title="¡EXPLOTA EL CONTENIDO DE TUS REDES!"
        fondo="/servicios/marketing/modal-button/imagen.webp"
        text="MARKETING Y GESTIÓN DIGITAL"
        serviceName="3"
      />

      <Main
        title="MARKETING Y GESTIÓN DIGITAL"
        subtitle="Conecta, impacta y haz crecer tu marca en el entorno digital"
        text="¡Haz despegar tu marca al éxito digital! Conecta, Impacta y Crece: El poder de despegar tu marca con el Marketing y la Gestión Digital en la era online."
        image="/servicios/marketing/marketing-y-gestion-digital.webp"
      />

      <Description
        title="¿CÓMO FUNCIONA?"
        text="El Marketing Digital consiste en planificar, ejecutar y optimizar estrategias comerciales utilizando herramientas digitales para conectar con el público y alcanzar objetivos de negocio."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text={
          <>
            aumenta tus ventas con <br /> marketing digital
          </>
        }
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </>
  );
}
