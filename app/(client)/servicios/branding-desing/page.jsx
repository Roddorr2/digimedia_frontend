// Componentes
import Servicios from "../components/Servicios";
import Contactanos from "../components/Contactanos";
import Description from "../components/Description";
import Main from "../components/Main";


export default function BrandingDesing() {
  const servicios = [
    {
      title: (
        <>
          DESARROLLO DE <br /> BRIEF
        </>
      ),
      text: "Estudiamos tu empresa y competencia para definir una marca clara, estratégica y sólida.",
      icon: "/servicios/branding/desarrollo-de-brief-marketing.webp",
      ruta: "/servicios/desarrollo-briefs/",
      iconAlt: "Icono de desarrollo de brief",
      iconTitle:
        "Icono de desarrollo de brief estratégico I Digimedia Marketing",
    },
    {
      title: (
        <>
          PLANIFICACIÓN <br /> ESTRATÉGICA
        </>
      ),
      text: "Creamos identidades visuales únicas que reflejan tu esencia que destacan en el mercado.",
      icon: "/servicios/branding/planificacion-estrategica-marketing.webp",
      ruta: "/servicios/planificacion-estrategica/",
      iconAlt: "Icono en planificación estratégica",
      iconTitle: "Icono de planificación estratégica I Digimedia Marketing",
    },
    {
      title: (
        <>
          DISEÑO <br /> DE LOGO
        </>
      ),
      text: "Diseñamos logotipos memorables y profesionales que representan lo que tu marca es y lo que aspira a ser.",
      icon: "/servicios/branding/diseno-grafico-identidad-visual.webp",
      ruta: "/servicios/publicidad-digital/",
      iconAlt: "Icono de diseño gráfico para identidad visual de marca",
      iconTitle:
        "Icono de diseño gráfico e identidad visual I Digimedia Marketing",
    },
    {
      title: (
        <>
          MANUAL DE <br /> MARCA
        </>
      ),
      text: "Desarrollamos manuales de marca que establecen lineamientos visuales claros para asegurar coherencia en toda la comunicación de tu empresa.",
      icon: "/servicios/branding/manual-de-marca.webp",
      ruta: "/servicios/monitoreo-y-reporting/",
      iconAlt: "Icono de manual de marca oficial",
      iconTitle: "Icono de manual de marca I Digimedia Marketing",
    },
  ];

  return (
    <>

      <Main
        title="BRANDING Y DISEÑO"
        subtitle="Diseñamos marcas con próposito y personalidad"
        text="Creamos marcas que hablan, emocionan y conectan. Desde una identidad visual memorable hasta mensajes que resuenan profundamente, hacemos que tu empresa sea tan única como inolvidable."
        image="/servicios/branding/branding-y-diseno-digimedia-oficial.webp"
        alt="Imagen oficial del servicio de branding y diseño de una marca"
        titleAttr="Digimedia + branding + diseño + marca + servicio"
      />

      <Description
        title="¿CÓMO FUNCIONA?"
        text="El branding y el diseño se encargan de construir la identidad de una marca a través de elementos visuales y conceptuales que comunican su personalidad, valores y propósito, logrando que sea reconocible, coherente y memorable para su público."
      />

      <Servicios servicios={servicios} />

      <Contactanos
        text={
          <>
            conecta de manera creativa e <br /> innovadora con tu audiencia
          </>
        }
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </>
  );
}
