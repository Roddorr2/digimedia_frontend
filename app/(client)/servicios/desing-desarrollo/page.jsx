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
      title: "CREACIÓN Y DESARROLLO WEB",
      text: "Creamos experiencias modernas que atrapan, cautivan y convierten visitantes en clientes fieles.",
      icon: "/servicios/desarrollo/icon1.svg",
      ruta: "/servicios/ui/?from=disenoDesarrollo",
    },
    {
      title: "EXPERIENCIA DE USUARIO Y DISEÑO",
      text: "Más modernos, funcionales y personalizados que impulsen tu negocio y destaque frente a la competencia.",
      icon: "/servicios/desarrollo/icon2.svg",
      ruta: "/servicios/desarrollo-webs/",
    },
    {
      title: "DOMINIO Y HOSTING WEB",
      text: "Aseguramos que tu presencia online sea, segura, rápida y eficiente para la disponibilidad de tus clientes.",
      icon: "/servicios/desarrollo/icon3.svg",
      ruta: "/servicios/dominio_hosting/",
    },
    {
      title: "OPTIMIZACIÓN PARA BUSCADORES",
      text: "Mejoramos tu posición en navegadores con una estrategia que aumente tu visibilidad.",
      icon: "/servicios/desarrollo/icon4.svg",
      ruta: "/servicios/seo/",
    },
  ];

  const modales = {
    modalA: {
      text: "DISEÑO Y DESARROLLO WEB",
      fondo: "/servicios/desarrollo/modal-scroll/fondo.webp",
      title: "OBTÉN UNA ASESORÍA ¡GRATIS!",
      serviceName: "1",
      width: 256,
      height: 144,
    },
  };

  return (
    <>
      <ModalScroll data={modales} />

      <ModalButton
        title="Lleva tu negocio al siguiente nivel online"
        fondo="/servicios/desarrollo/modal-button/imagen.webp"
        text="DISEÑO Y DESARROLLO WEB"
        serviceName="1"
      />

      <Main
        title="DISEÑO Y DESARROLLO WEB"
        subtitle={
          <>
            ¡Convierte clics en clientes con
            <br />
            un sitio web que impacta!
          </>
        }
        text="Diseñamos y desarrollamos sitios web que capturan la atención desde el primer clic. Modernos, rápidos y visualmente impactantes, pensados para que tu marca destaque y FIDELIZAR A TUS clientes."
        image="/servicios/desarrollo/img-main.webp"
      />

      <Description
        title="¿QUE ES?"
        text="Es crear páginas que impresionan a primera vista y que funcionen sin fallas. el diseño cautiva con lo visual y que hace el desarrollo posible. juntos convertiremos tu sitio en una herramienta poderosa que distribuirá, comunicará y  posicionará tu marca donde debe estar: en lo mas alto."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </>
  );
}
