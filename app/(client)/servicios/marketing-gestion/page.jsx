// Componentes
import Servicios from "../components/Servicios";
import Contactanos from "../components/Contactanos";
import Description from "../components/Description";
import Main from "../components/Main";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/Chatbot";

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
      icon: "/servicios/marketing/marketing-y-gestion_sub1-ANALISIS-Y-BENCHMARKING.webp",
      ruta: "/servicios/analisis-y-benchmarking/",
      iconTitle: "Análisis y Benchmarking | Digimedia",
      iconAlt: "ANÁLISIS Y BENCHMARKING",
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
      icon: "/servicios/marketing/marketing-y-gestion_sub2-CAMPANAS-DIGITALES.webp",
      ruta: "/servicios/naming-logo-slogan/",
      iconTitle: "Campañas Digitales | Digimedia",
      iconAlt: "CAMPAÑAS DIGITALES",
    },
    {
      title: (
        <>
          IDENTIDAD VISUAL
          <br /> Y CORPORATIVA
        </>
      ),
      text: "Aseguramos que tu presencia online sea segura, rápida y eficiente para la disponibilidad de tus clientes.",
      icon: "/servicios/marketing/marketing-y-gestion_sub3-IDENTIDAD-VISUAL-Y-CORPORATIVA.webp",
      ruta: "/servicios/identidad-visual/",
      iconTitle: "Identidad Visual y Corporativa | Digimedia",
      iconAlt: "IDENTIDAD VISUAL Y CORPORATIVA",
    },
    {
      title: (
        <>
          ANÁLISIS DE
          <br /> MÉTRICAS
        </>
      ),
      text: "Evaluamos el desempeño de tus estrategias digitales mediante métricas clave para optimizar acciones y tomar decisiones basadas en resultados.",
      icon: "/servicios/marketing/marketing-y-gestion_sub4-ANALISIS-DE-METRICAS.webp",
      iconTitle: "Campañas Digitales | Digitmedia",
      iconAlt: "ANÁLISIS DE MÉTRICAS",
      ruta: "/servicios/manual-marca/",
    },
  ];

  return (
    <>
      <Main
        title="MARKETING Y GESTIÓN DIGITAL"
        subtitle="Conecta, impacta y haz crecer tu marca en el entorno digital"
        text="¡Haz despegar tu marca al éxito digital! Conecta, Impacta y Crece: El poder de despegar tu marca con el Marketing y la Gestión Digital en la era online."
        image="/servicios/marketing/marketing-y-gestion-digital.webp"
        imageTitle="Marketing y Gestión Digital | Digimedia"
        imageAlt="Imagen de MARKETING Y GESTIÓN DIGITAL"
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
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
      <WhatsAppButton />
      <MayaChatbot />
    </>
  );
}
