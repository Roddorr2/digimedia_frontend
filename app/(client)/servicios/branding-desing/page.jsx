// Componentes
import Servicios from '../components/Servicios';
import Contactanos from '../components/Contactanos';
import Description from '../components/Description';
import Main from '../components/Main';
import ModalButton from '../components/ModalButton';
import ModalScroll from '../components/ModalScroll';

export default function Page() {
  const servicios = [
    {
      title: "Auditoría digital completa + análisis de competencia",
      text: "El brief nos permite entender tu empresa para crear y definir tu marca.",
      icon: "/servicios/branding/icon1.svg",
      ruta: "/servicios/desarrollo-briefs/",
    },
    {
      title: "Estrategia de marketing digital personalizada",
      text: "Creamos identidades visuales únicas que reflejan tu esencia que destacan en el mercado.",
      icon: "/servicios/branding/icon2.svg",
      ruta: "/servicios/planificacion-estrategica/",
    },
    {
      title: "Publicidad digital efectiva en Meta Ads y Google Ads",
      text: "Creamos elementos clave que representen tu marca y conecten con tu audencia.",
      icon: "/servicios/branding/icon3.svg",
      ruta: "/servicios/publicidad-digital/",
    },
    {
      title: "Monitoreo constante + reportes de resultados claros",
      text: "Definimos las reglas que guiarán todas las estrategias para tu marca.",
      icon: "/servicios/branding/icon4.svg",
      ruta: "/servicios/monitoreo-y-reporting/",
    },
  ];

  const modales = {
    modalA: {
      text: 'BRANDING Y DISEÑO',
      fondo: '/servicios/branding/modal-scroll/fondo.webp',
      title: 'TU PRIMERA CONSULTA ¡ES GRATIS!',
      serviceName: '4',
    },
  };

  return (
    <>
      <ModalScroll data={modales} />

      {/* <ModalScroll
        text="BRANDING Y DISEÑO"
        fondo="/servicios/branding/modal-scroll/fondo.webp"
        title="TU PRIMERA CONSULTA ¡ES GRATIS!"
        serviceName="4"
      /> */}

      <ModalButton
        title="¡DISEÑA TU CAMINO HACIA EL ÉXITO!"
        fondo="/servicios/branding/modal-button/imagen.webp"
        text="BRANDING Y DISEÑO"
        serviceName="4"
      />

      <Main
        title="BRANDING Y DISEÑO"
        subtitle="La Voz y la Cara de tu Marca"
        text="Creamos marcas que hablan, emocionan y conectan. Desde una identidad visual memorable hasta mensajes que resuenan profundamente, hacemos que tu empresa sea tan única como inolvidable."
        image="/servicios/branding/branding-disenio.png"
      />

      <Description
        title="¿CÓMO FUNCIONA?"
        text="El branding y el diseño se encargan de construir la identidad de una marca a través de elementos visuales y conceptuales que comunican su personalidad, valores y propósito, logrando que sea reconocible, coherente y memorable para su público."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text="Conecta de manera creativa e innovadora con tu audiencia"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </>
  );
}
