import Image from "next/image";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import ModalScroll from "../components/ModalScroll";
import ModalButton from "../components/ModalButton";

import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";

export default function UXUI() {
  const modales = {
    modalA: {
      text: "BRANDING Y DISEÑO",
      fondo: "/servicios/branding/modal-scroll/brandingydiseno.png",
      title: "TU PRIMERA CONSULTA ¡ES GRATIS!",
      serviceName: "4",
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/branding_diseno/desarrollo_brief/icons/brief blanco.png"
          alt="Icono de una computadora con mapas y graficos"
          className="w-full h-full object-contain"
          width={200}
          height={100}
        />
      ),
      title: "BRIEF",
      description:
        "Desarrollamos el brief de su marca como documento estratégico, consolidando identidad y objetivos del proyecto para garantizar un desarrollo visual coherente y alineado a los resultados de su campaña.",
    },
  ];

  return (
    <div>
      <ModalScroll data={modales} />
      <ModalButton
        title="¡DISEÑA TU CAMINO HACIA EL ÉXITO!"
        fondo="/servicios/branding/modal-button/imagen.webp"
        text="BRANDING Y DISEÑO"
        serviceName="4"
      />
      <UxUiSection
        features={featuresuxui}
        mainDescription="Transformamos tus ideas en una hoja de ruta clara para la creación de contenido gráfico y audiovisual. Nuestro proceso de brief asegura que cada proyecto de publicidad digital esté alineado con sus objetivos comerciales y atraiga a su público ideal."
        backgroundImage="/servicios/desarrollo_brief/desarrollo-de-brief.webp"
        heroTitle=<>
          DESARROLLO
          <br />
          DE BRIEF
        </>
        alt="Branding, Diseño gráfico, Identidad visual, Desarrollo de marca, Manual de marca, Brief creativo, Comunicación visual, Estrategia de marca, Diseño corporativo, Posicionamiento"
        title="Branding y diseño - desarrollo de brief - Digimedia.webp"
        category="Branding y diseño"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>
  );
}
