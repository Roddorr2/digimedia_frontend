import Image from "next/image";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";

export default function IntegracionesDigitales() {
  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/seo/diseno-responsive-digimedia-icono.webp"
          alt="Ícono que muestra diferentes dispositivos tecnológicos y representa el objetivo del servicio que es el adaptar un sitio web a todos los aparatos digitales"
          title="Sub-subservicio de Diseño responsive"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: "DISEÑO RESPONSIVE",
      description:
        "Adaptamos tu sitio a todos los dispositivos para garantizar una experiencia fluida y profesional.",
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/seo/integraciones-digitales-digimedia-icono.webp"
          alt="ícono que muestra una nube y representa la conexión digital que ofrece el servicio al conectar la web con diferentes herramientas digitales"
          title="Sub-subservicio de Integraciones digitales"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: (
        <>
          INTEGRACIONES <br /> DIGITALES
        </>
      ),
      description:
        "Conectamos tu web con herramientas como WhatsApp, redes sociales and formularios para facilitar la conversión.",
    },
  ];

  return (
    <div>
      {/* Servicio: Diseño Web y Desarrollo Web, Subservicio: Integraciones Digitales */}
      <UxUiSection
        features={featuresuxui}
        mainDescription="Creamos sitios web adaptables a todos los dispositivos e integramos herramientas digitales clave, pasarelas de pago, automatizaciones y analítica para optimizar la experiencia del usuario y potenciar la conversión."
        backgroundImage="/servicios/diseno_desarrollo_web/seo/desarrollo-responsive-e-integraciones-digitales-digimedia.webp"
        heroTitle="DESARROLLO RESPONSIVE E INTEGRACIONES DIGITALES"
        alt="Imagen que muestra a una persona frente a una pizarra con papeles que contienen estrategias de optimización seo para buscadores con el objetivo de desarrollar sitios webs adaptables a cualquier dispositivo"
        title="Subservicio de Desarrollo responsive e integraciones digitales"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </div>
  );
}
