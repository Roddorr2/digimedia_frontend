"use client";

import Servicios from "../components/Servicios";
import Contactanos from "../components/Contactanos";
import Description from "../components/Description";
import Main from "../components/Main";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/MayaChatbot";

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
    {
      title: (
        <>
          LANDING <br /> PAGE
        </>
      ),
      text: "Diseñamos landing pages de alta conversión que transforman visitantes en clientes, con mensajes persuasivos y llamadas a la acción efectivas.",
      icon: "/servicios/desarrollo/landing-page-sub-servicio.webp",
      ruta: "/servicios/landing-page/",
      imageTitle: "Subservicio de Landing Page",
      imageAlt: "Ícono del subservicio de Landing Page ofrecido por Digimedia",
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
      <Servicios servicios={servicios} perRow={5} />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
      <WhatsAppButton />
      <MayaChatbot />
    </>
  );
}
