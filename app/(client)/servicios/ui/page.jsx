"use client";
import Contactanos from "../components/Contactanos";
import ModalScroll from "../components/ModalScroll";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ModalButton from "../components/ModalButton";

function UXUIComponent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const modales = {
    modalA: {
      text: "DISEÑO Y DESARROLLO WEB",
      fondo: "/servicios/desarrollo/modal-scroll/diseno-desarrollo-web-digimedia-pop-up.webp",
      title: "OBTÉN UNA ASESORÍA ¡GRATIS!",
      serviceName: "1",
    },
  };

  const backgroundImages = {
    disenoDesarrollo: "/servicios/DisenoUI/diseno-UX-y-UI.webp",
    gestionRedes: "/servicios/DisenoUI/diseno_principal.webp",
  };

  const backgroundImage =
    backgroundImages[from] || "/servicios/DisenoUI/diseno-UX-y-UI.webp";

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/diseno-UX-UI_card1-EXPERIENCIA-DE-USUARIO-(UX).webp"
          alt="Web con diseño UX"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: "Diseño de pautas",
      title: (
        <>
          DISEÑO DE <br />
          EXPERIENCIA (UX)
        </>
      ),
      description:
        "Analizamos el comportamiento del usuario y estructuramos recorridos claros y funcionales, reduciendo fricción y optimizando cada punto de interacción.",
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/diseno-UX-UI_card2-DISENO-DE-INTERFACES-(UI).webp"
          alt="Web con diseño UI"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: (
        <>
          DISEÑO DE <br />
          INTERFAZ (UI)
        </>
      ),
      description:
        "Desarrollamos propuestas visuales coherentes con la marca, priorizando claridad, usabilidad y una experiencia atractiva en cada dispositivo.",
    },
  ];

  return (
    <div>
      <ModalScroll data={modales} />

      <ModalButton
        title="Lleva tu negocio al siguiente nivel online"
        fondo="/servicios/desarrollo/modal-button/imagen.webp"
        text="DISEÑO Y DESARROLLO WEB"
        serviceName="1"
      />
      <UxUiSection
        features={featuresuxui}
        mainDescription="Diseñamos experiencias digitales que combinan funcionalidad y estética. Creamos interfaces intuitivas, alineadas a la identidad de marca y orientadas a facilitar la navegación y la conversión."
        backgroundImage={backgroundImage}
        heroTitle=<>DISEÑO UX Y UI</>
        alt="Diseño de interfaz (UI) y experiencia de usuario (UX) enfocado en la usabilidad y conversión digital."
        title="Diseño UX, Diseño UI, experiencia de usuario, interacción digital, navegación fluida, interfaz intuitiva, diseño responsivoTÍTULO: Diseño y desarrollo web, Diseño UX UI, Digimedia.webp"
        // heroBulletPoints={[
        //   'MAYOR SATISFACCIÓN DEL USUARIO: UN DISEÑO INTUITIVO Y AGRADABLE HACE QUE LOS USUARIOS DISFRUTEN USANDO EL PRODUCTO O SERVICIO.',
        //   'AUMENTO DE LA USABILIDAD: FACILITA LA NAVEGACIÓN Y LA REALIZACIÓN DE TAREAS, REDUCIENDO LA FRUSTRACIÓN.',
        //   'MEJORA DE LA ACCESIBILIDAD: PERMITE QUE PERSONAS CON DIVERSAS CAPACIDADES PUEDAN UTILIZAR EL PRODUCTO O SERVICIO.',
        // ]}
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>
  );
}

export default function UXUI() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Cargando...
        </div>
      }
    >
      <UXUIComponent />
    </Suspense>
  );
}
