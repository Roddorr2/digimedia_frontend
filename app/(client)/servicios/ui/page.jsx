'use client';
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { MonitorIcon, Smartphone, PenTool, Layers } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ModalButton from '../components/ModalButton';

function UXUIComponent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const modales = {
    modalA: {
      text: 'DISEÑO Y DESARROLLO WEB', 
      fondo: '/servicios/desarrollo/modal-scroll/fondo.webp',
      title: 'OBTÉN UNA ASESORÍA ¡GRATIS!',
      serviceName: '1',
    },
  };

  const backgroundImages = {
    disenoDesarrollo: '/servicios/DisenoUI/background_ui.svg',
    gestionRedes: '/servicios/DisenoUI/diseno_principal.webp',
  };

  const backgroundImage =
    backgroundImages[from] || '/servicios/DisenoUI/background_ui.svg';

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/UX blanco.png"
          alt="Web con diseño UX"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: 'Diseño de pautas',
      title: <>DISEÑO DE <br /> INTERFACES (UI)</>,
      description:
        'Nos encargamos de la apariencia visual de tu marca. Creamos interfaces atractivas y coherentes usando colores, tipografía e imágenes que guían al usuario emocionalmente.',
      
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/UI blanco.png"
          alt="Web con diseño UI"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: <>EXPERIENCIA DE <br /> USARIO (UX)</>,
      description:
        'Nos enfocamos en la funcionalidad. Diseñamos sitios web intuitivos y efectivos basados en las necesidades, comportamientos y objetivos reales de tus clientes para eliminar frustraciones.',
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
        mainDescription="No solo diseñamos páginas bonitas; creamos productos digitales que venden. Fusionamos el Diseño UX (para que tu web sea fácil de usar) con el Diseño UI (para que sea inolvidable). Como expertos en  marketing digital , garantizamos que tu sitio no solo atraiga visitas, sino que convierta usuarios en clientes."
        backgroundImage={backgroundImage}
        heroTitle=<>DISEÑO <br /> UX Y UI</>
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
