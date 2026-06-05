/*
"use client";

import Servicios from "../components/Servicios";
import Contactanos from "../components/Contactanos";
import Description from "../components/Description";
import Main from "../components/Main";

export default function DisenoDesarrolloWeb() {
  const servicios = [
    {
      title: (
        <>
          DESARROLLO <br /> RESPONSIVE
        </>
      ),
      text: "Creamos experiencias modernas que atrapan, cautivan y convierten visitantes en clientes fieles.",
      icon: "/servicios/desarrollo/creacion-desarrollo-web-sub-servicio.webp",
      ruta: "/servicios/desarrollo-webs/",
      imageTitle: "Sub servicio de creación y desarrollo web",
      imageAlt:
        "ícono del sub servicio de creación y desarrollo web ofrecido por Digimedia",
    },
    {
      title: (
        <>
          EXPERIENCIA DE <br /> USUARIO Y DISEÑO
        </>
      ),
      text: "Mas modernos, funcionales y personalizados que impulsen tu negocio y destaque frente a la competencia.",
      icon: "/servicios/desarrollo/experiencia-de-experiencia-de-usuario-sub-servicio.webp",
      ruta: "/servicios/experiencia-usuario/",
      imageTitle: "Sub servicio de experiencia de usuario y diseño",
      imageAlt:
        "Ícono del sub servicio de experiencia de usuario y diseño ofrecido por Digimedia",
    },
    {
      title: (
        <>
          OPTIMIZACIÓN SEO <br /> PARA BUSCADORES
        </>
      ),
      text: "Mayor visibilidad, mejor posicionamiento y más clientes potenciales. Llevamos tu sitio web a los primeros resultados de búsqueda.",
      icon: "/servicios/desarrollo/optimizacion-seo-para-buscadores-sub-servicio.webp",
      ruta: "/servicios/dominio_hosting/",
      imageTitle: "Sub servicio de optimización SEO para buscadores",
      imageAlt: "Ícono del sub servicio de optimización SEO para buscadores",
    },
    {
      title: (
        <>
          DESARROLLO <br />
          RESPONSIVE E <br />
          INTEGRACIONES <br />
          DIGITALES
        </>
      ),
      text: "Desarrollamos sitios web adaptables y conectados con herramientas digitales que potencian la conversión y optimizan tu gestión.",
      icon: "/servicios/desarrollo/desarrollo-responsive-integraciones-digitales-sub-servicio.webp",
      ruta: "/servicios/seo/",
      imageTitle:
        "Subservicio de Desarrollo responsive e integraciones digitales",
      imageAlt:
        "Ícono del subservicio de Desarrollo responsive e integraciones digitales",
    },
  ];

  return (
    <>
      <Main
        title="DISEÑO Y DESARROLLO WEB"
        subtitle={
          <>
            ¡Convierte clics en clientes
            <br />
            con un sitio web que impacte!
          </>
        }
        text="Transformamos tu visión en una presencia digital impactante. Diseñamos y desarrollamos sitios web modernos, rápidos y seguros, enfocados en convertir visitantes en clientes y fortalecer la lealtad de su audiencia. Tu éxito online comienza aquí."
        image="/servicios/desarrollo/diseno-desarrollo-web-digimedia-oficial.webp"
        imageTitle="Obtén una asesoría ¡Gratis!"
        imageAlt="La imagen muestra a una persona buscando imágenes en un biblioteca virtual"
      />
      <Description
        title="¿CÓMO FUNCIONA?"
        text="Creamos experiencias digitales que cautivan y funcionan sin interrupciones. Desde el diseño visual hasta la implementación técnica, convertimos su sitio web en una herramienta poderosa que posiciona su marca, comunica su valor y genera resultados tangibles."
      />
      <Servicios servicios={servicios} />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </>
  );
}
*/

import dynamic from "next/dynamic";

// Componentes
import Servicios from "../components/Servicios";
import Contactanos from "../components/Contactanos";
import Description from "../components/Description";
import Main from "../components/Main";
/*
import ModalButton from "../components/ModalButton";
import ModalScroll from "../components/ModalScroll";
*/

const ServicePopup = dynamic(
  () => import("@/app/dashboard/whatsapp/components/ServicePopup"),
  // {
  //   ssr: false,
  // }
);

export default function Page() {
  const servicios = [
    {
      title: "CREACIÓN Y|DESARROLLO WEB",
      text: "Creamos experiencias modernas que atrapan, cautivan y convierten visitantes en clientes fieles.",
      icon: "/servicios/desarrollo/creacion-desarrollo-web-sub-servicio.webp",
      ruta: "/servicios/desarrollo-webs/",
      imageTitle: "Sub servicio de creación y desarrollo web",
      imageAlt:
        "Ícono del sub servicio de creación y desarrollo web ofrecido por Digimedia",
    },
    {
      title: "EXPERIENCIA DE|USUARIO Y DISEÑO",
      text: "Más modernos, funcionales y personalizados que impulsen tu negocio y destaquen frente a la competencia.",
      icon: "/servicios/desarrollo/experiencia-de-experiencia-de-usuario-sub-servicio.webp",
      ruta: "/servicios/experiencia-usuario/",
      imageTitle: "Sub servicio de experiencia de usuario y diseño",
      imageAlt:
        "Ícono del sub servicio de experiencia de usuario y diseño ofrecido por Digimedia",
    },
    {
      title: "OPTIMIZACIÓN SEO|PARA BUSCADORES",
      text: "Mayor visibilidad, mejor posicionamiento y más clientes potenciales.",
      icon: "/servicios/desarrollo/optimizacion-seo-para-buscadores-sub-servicio.webp",
      ruta: "/servicios/dominio_hosting/",
      imageTitle: "Sub servicio de optimización SEO para buscadores",
      imageAlt:
        "Ícono del sub servicio de optimización SEO para buscadores",
    },
    {
      title:
        "DESARROLLO|RESPONSIVE E|INTEGRACIONES|DIGITALES",
      text: "Desarrollamos sitios web adaptables y conectados con herramientas digitales.",
      icon: "/servicios/desarrollo/desarrollo-responsive-integraciones-digitales-sub-servicio.webp",
      ruta: "/servicios/seo/",
      imageTitle:
        "Subservicio de desarrollo responsive e integraciones digitales",
      imageAlt:
        "Ícono del subservicio de desarrollo responsive e integraciones digitales",
    },
  ];

  /*
  const modales = {
    modalA: {
      text: "DISEÑO Y DESARROLLO WEB",
      fondo:
        "/servicios/desarrollo/modal-scroll/diseno-y-desarrollo-web.webp",
      alt: "Diseño Digimedia pop up",
      title: "OBTÉN UNA ASESORÍA ¡GRATIS!",
      serviceName: "1",
      width: 256,
      height: 144,
      imageTitle: "Obtén una asesoría gratis",
      imageAlt:
        "La imagen muestra a una persona buscando imágenes en una biblioteca virtual",
    },
  };
  */

  return (
    <>
      <ServicePopup idSubservicio={4} />

      {/* <ModalScroll data={modales} />

      <ModalButton
        title="Lleva tu negocio al siguiente nivel online"
        fondo="/servicios/desarrollo/modal-button/imagen.webp"
        text="DISEÑO Y DESARROLLO WEB"
        serviceName="1"
      /> */}

      <Main
        title="DISEÑO Y DESARROLLO WEB"
        subtitle={
          <>
            ¡Convierte clics en clientes!
            <br />
            Con un sitio web que impacte
          </>
        }
        text="Transformamos tu visión en una presencia digital impactante."
        image="/servicios/desarrollo/diseno-desarrollo-web-digimedia-oficial.webp"
        imageTitle="Obtén una asesoría gratis"
        imageAlt="Persona buscando imágenes en una biblioteca virtual"
      />

      <Description
        title="¿CÓMO FUNCIONA?"
        text="Creamos experiencias digitales que cautivan y funcionan sin interrupciones."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </>
  );
}

