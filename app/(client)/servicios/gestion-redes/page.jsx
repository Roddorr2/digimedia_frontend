// Componentes
import Servicios from "../components/Servicios";
import Contactanos from "../components/Contactanos";
import Description from "../components/Description";
import Main from "../components/Main";
import ModalScroll from "../components/ModalScroll";
import ModalButton from "../components/ModalButton";
import { icon } from "@fortawesome/fontawesome-svg-core";

export default function Page() {
  const servicios = [
    {
      title: (
        <>
          ESTRATEGIA DE
          <br /> CONTENIDO
        </>
      ),
      text: "Definimos la narrativa, los pilares de contenido y el tono de tu marca para comunicar con coherencia y propósito en redes sociales.",
      icon: "/servicios/gestion/icono-lista-tareas-temporizador.webp",
      iconTitle: "Ícono de lista de tareas con temporizador para productividad | DigiMedia Marketing",
      iconAlt: "Lista de tareas con temporizador - gestión de tiempo y productividad",
      ruta: "/servicios/planificacion-cronograma/",
    },
    {
      title: (
        <>
          SOCIAL ADS &
          <br /> PERFORMANCE
        </>
      ),
      text: "Diseñamos y optimizamos campañas de pauta en redes sociales enfocadas en alcance, tráfico, leads y conversiones.",
      icon: "/servicios/gestion/icono-de-planificacion-y-creatividad.webp",
      iconTitle: "Icono de planificación y creatividad ",
      iconAlt: "Lista de planificación y creatividad - mayor organización",

      ruta: "/servicios/diseno-pautas/",
    },
    {
      title: (
        <>
          PRODUCCIÓN
          <br /> AUDIOVISUAL
        </>
      ),
      text: "Creamos contenido audiovisual pensado para redes sociales, optimizado para captar atención y generar engagement.",
      icon: "/servicios/gestion/icono-gestion-procesos-marketing.webp",
      iconTitle: "Ícono de gestión de procesos en marketing digital",
      iconAlt: "Lista de tareas y gestión de procesos para campañas de marketing",

      ruta: "/servicios/produccion-pautas/",
    },
    {
      title: (
        <>
          DISEÑO <br />
          UX Y UI
        </>
      ),
      text: "Diseñamos experiencias digitales funcionales y atractivas que acompañan la estrategia de redes y mejoran la conversión.",
      icon: "/servicios/gestion/icono-diseno-ux-ui.webp",
      iconTitle: "Ícono de diseño UX UI para experiencia de usuario",
      iconAlt: "Pantalla con interfaz UX UI que representa experiencia de usuario en web",
      ruta: "/servicios/ui/?from=gestionRedes",
    },
  ];
  const modales = {
    modalA: {
      text: "GESTIÓN DE REDES SOCIALES",
      fondo: "/servicios/gestion/modal-scroll/gestion-redes-sociales-peru-digimedia.webp",
      title: "SOLO POR HOY ACCEDE A UNA ¡ASESORÍA GRATIS!",
      imageTitle:"Gestión de Redes Sociales en Perú | Digimedia",
      imageAlt:"Servicio de gestión de redes sociales en Perú ofrecido por Digimedia para crecimiento de marcas en Instagram, Facebook y TikTok",
      serviceName: "2",
      width: 256,
      height: 144,
    },
  };

  return (
    <>
      <ModalScroll data={modales} />

      <ModalButton
        title="¡ELEVA TUS CAMPAÑAS A OTRO NIVEL!"
        fondo="/servicios/gestion/modal-button/marketing-digital-redes-sociales-peru-digimedia.webp"
        text="GESTIÓN DE REDES SOCIALES"
        imageTitle="Marketing Digital y Redes Sociales en Perú | Digimedia"
        imageAlt="Ilustración de herramientas de marketing digital y gestión de redes sociales con iconos de interacción, análisis y contenido"
        serviceName="2"
      />

      <Main
        title=<>
          GESTIÓN DE <br /> REDES SOCIALES
        </>
        subtitle="Estrategia y contenido que generan resultados"
        text="Impulsamos tu presencia digital con contenido estratégico, creatividad y decisiones basadas en datos para que tu marca no solo esté presente, sino que destaque."
        image="/servicios/gestion/gestion-redes-sociales-peru-digimedia.webp"
        imageAlt="Ilustración de gestión profesional de redes sociales desde una computadora"
        imageTitle="Gestión estratégica de redes sociales en Perú | Digimedia"
      />

      <Description
        title="¿CÓMO FUNCIONA?"
        text="La gestión de redes sociales consiste en planificar, crear y optimizar contenido y campañas digitales alineadas a los objetivos de la marca, combinando estrategia, creatividad y análisis de performance para generar resultados reales."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text={
          <>
            DEJA QUE TUS REDES ESTÉN <br /> EN OTRO NIVEL
          </>
        }
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </>
  );
}
