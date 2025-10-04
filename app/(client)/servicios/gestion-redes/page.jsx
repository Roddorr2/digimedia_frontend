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
      title: "Plan de contenido estratégico",
      text: "Planificamos tu estrategia en redes para mantenerte activo, relevante y siempre presente ante tu audiencia",
      icon: "/servicios/gestion/icon1.svg",
      ruta: "/servicios/planificacion-cronograma/",
    },
    {
      title: "Diseño gráfico para redes sociales",
      text: "Traducimos tu esencia de marca en pautas claras, creativas y listas para cautivar en redes",
      icon: "/servicios/gestion/icon3.svg",
      ruta: "/servicios/diseno-pautas/",
    },
    {
      title: "Gestión de campañas publicitarias (Meta Ads)",
      text: "Creamos PAUTAS estratégicAS que habla el idioma de tu audiencia y fortalece tu marca",
      icon: "/servicios/gestion/icon2.svg",
      ruta: "/servicios/produccion-pautas/",
    },
    {
      title: "Copywriting para redes sociales",
      text: "Combinamos  (UI) y  (UX) para crear plataformas intuitivas, fáciles de usar y optimizadas para generar conversiones",
      icon: "/servicios/gestion/icon4.svg",
      ruta: "/servicios/ui/?from=gestionRedes",
    },
  ];
  const modales = {
    modalA: {
      text: "GESTIÓN DE REDES SOCIALES",
      fondo: "/servicios/gestion/modal-scroll/fondo.webp",
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
        title="GESTIÓN DE REDES SOCIALES"
        subtitle="¡Conviértete en la marca que todos quieren seguir!"
        text="Impulsamos tu presencia digital con contenido estratégico y cercano, logrando que tu marca conecte, inspire y convierta seguidores en clientes fieles."
        image="/servicios/gestion/img-main.webp"
      />

      <Description
        title="¿QUÉ ES?"
        text="La gestión de redes sociales consiste en planificar, crear y administrar contenido estratégico para potenciar la presencia de una marca en plataformas digitales, conectar con su audiencia y alcanzar objetivos de negocio."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text="Deja que tus redes estén en otro nivel"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </>
  );
}
