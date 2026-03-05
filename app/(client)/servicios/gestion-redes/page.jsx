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
          ESTRATEGIA DE
          <br /> CONTENIDO
        </>
      ),
      text: "Definimos la narrativa, los pilares de contenido y el tono de tu marca para comunicar con coherencia y propósito en redes sociales.",
      icon: "/servicios/gestion/gestion-de-redes_sub1-ESTRATEGIA-DE-CONTENIDO.webp",
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
      icon: "/servicios/gestion/gestion-de-redes_sub2-SOCIAL-ADS-&-PERFORMANCE.webp",
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
      icon: "/servicios/gestion/gestion-de-redes_card3-SOCIAL-ADS-&-PERFORMANCE.webp",
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
      icon: "/servicios/gestion/gestion-de-redes_card4-PRODUCCION-AUDIOVISUAL.webp",
      ruta: "/servicios/ui/?from=gestionRedes",
    },
  ];
  const modales = {
    modalA: {
      text: "GESTIÓN DE REDES SOCIALES",
      fondo: "/servicios/gestion/modal-scroll/gestion-redes-sociales-peru-digimedia.webp",
      title: "SOLO POR HOY ACCEDE A UNA ¡ASESORÍA GRATIS!",
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
        fondo="/servicios/gestion/modal-button/imagen.webp"
        text="GESTIÓN DE REDES SOCIALES"
        serviceName="2"
      />

      <Main
        title=<>
          GESTIÓN DE <br /> REDES SOCIALES
        </>
        subtitle="Estrategia y contenido que generan resultados"
        text="Impulsamos tu presencia digital con contenido estratégico, creatividad y decisiones basadas en datos para que tu marca no solo esté presente, sino que destaque."
        image="/servicios/gestion/gestion-de-redes-sociales.webp"
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
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </>
  );
}
