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
      title: (<>INDENTIDAD Y<br />POSICIONAMIENTO</>),
      text: "Evaluamos y mejoramos el rendimiento de tu marca frente a la competencia con las mejores estrategias.",
      icon: "/servicios/marketing/icon1.svg",
      ruta: "/servicios/analisis-y-benchmarking/",
    },
    {
      title: (<>NAMING, IDENTIDAD <br />VISUAL Y ESLOGAN</>),
      text: "Definimos las  estrategias, con objetivos claros, segmetación precisa y tácticas eficaces para alcanzar tus metas de negocio.",
      icon: "/servicios/marketing/icon2.svg",
      ruta: "/servicios/naming-logo-slogan/",
    },
    {
      title: (<>DESARROLLO DE <br /> IDENTIDAD VISUAL</>),
      text: "Aseguramos tu presencia online sea, segura, rápida y eficiente para la disponibilidad de tus clientes",
      icon: "/servicios/marketing/icon3.svg",
      ruta: "/servicios/identidad-visual/",
    },
    {
      title: (<>MANUAL DE <br /> MARCA</>),
      text: "Hacemos seguimiento continuo del avance,  gestionando los proyectos,  programas y actividades  de forma efectiva",
      icon: "/servicios/marketing/icon4.svg",
      ruta: "/servicios/manual-marca/",
    },
  ];
  const modales = {
    modalA: {
      text: 'MARKETING Y GESTIÓN DIGITAL',
      fondo: '/servicios/marketing/modal-scroll/marketingygestiondigital.jpg',
      title: 'HAZLO Y CUMPLE TUS SUEÑOS ¡ASESORÍA GRATIS!',
      serviceName: '3',
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
        subtitle="!Has despegar tu marca al éxito digital!"
        text="Conecta, Impacta y Crece: El poder de de despegar tu marca con el Marketing y la Gestion Digital en la era online."
        image="/servicios/marketing/marketing-gestion-hero.png"
      />

      <Description
        title="¿CÓMO FUNCIONA?"
        text="El Marketing Digital consiste en planificar, ejecutar y optimizar estrategias comerciales utilizando herramientas digitales para conectar con el público y alcanzar objetivos de negocio."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text={<>aumenta tus ventas con <br /> marketing digital</>}
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </>
  );
}
