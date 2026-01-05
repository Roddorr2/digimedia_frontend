// Componentes
import Servicios from '../components/Servicios';
import Contactanos from '../components/Contactanos';
import Description from '../components/Description';
import Main from '../components/Main';
import ModalScroll from '../components/ModalScroll';
import ModalButton from '../components/ModalButton';

export default function Page() {
  const servicios = [
    {
      title: (<>ESTRATEGIA DE<br />  CONTENIDO</>),
      text: "Planificamos tu estrategia en redes para mantenerte activo, relevante para tu audiencia",
      icon: "/servicios/gestion/icon1.svg",
      ruta: "/servicios/planificacion-cronograma/",
    },
    {
      title: (<>DISEÑO DE<br /> PAUTAS</>),
      text: "Transformamos la esencia de tu marca en contenido estratégico que conecta y destaca en redes",
      icon: "/servicios/gestion/icon3.svg",
      ruta: "/servicios/diseno-pautas/",
    },
    {
      title: (<>PRODUCCIÓN<br /> DE PAUTAS</>),
      text: "Creamos campañas estratégicas que hablan el idioma de tu audiencia y fortalecen tu marca digital",
      icon: "/servicios/gestion/icon2.svg",
      ruta: "/servicios/produccion-pautas/",
    },
    {
      title: (<>DISEÑO <br />UX Y UI</>),
      text: "Combinamos UI y UX para crear plataformas intuitivas, fáciles de usar y optimizadas para generar conversiones",
      icon: "/servicios/gestion/icon4.svg",
      ruta: "/servicios/ui/?from=gestionRedes",
    },
  ];
  const modales = {
    modalA: {
      text: 'GESTIÓN DE REDES SOCIALES',
      fondo: '/servicios/gestion/modal-scroll/fondo.webp',
      title: 'SOLO POR HOY ACCEDE A UNA ¡ASESORÍA GRATIS!',
      serviceName: '2',
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
        title="GESTIÓN DE REDES SOCIALES"
        subtitle="¡Conviértete en la marca que todos quieren seguir!"
        text="Impulsamos tu presencia digital con contenido estratégico y cercano, logrando que tu marca conecte, inspire y convierta seguidores en fieles."
        image="/servicios/gestion/gestion-redes-hero.png"
      />

      <Description
        title="¿CÓMO FUNCIONA?"
        text="La gestión de redes sociales consiste en planificar, crear y administrar contenido estratégico para potenciar la presencia de una marca en plataformas digitales, conectar con su audiencia y alcanzar objetivos de negocio."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text={<>DEJA QUE TUS REDES ESTÉN <br /> EN OTRO NIVEL</>}
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </>
  );
}
