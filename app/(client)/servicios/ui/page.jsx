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
  const from = searchParams.get('from') || 'disenoDesarrollo';

  const backgroundImages = {
    disenoDesarrollo: '/servicios/DisenoUI/diseno-UX-y-UI.webp',
    gestionRedes: '/servicios/DisenoUI/disenio-ux-y-ui.webp',
  };

  const dynamicTexts = {
    disenoDesarrollo: {
      modalAText: 'DISEÑO Y DESARROLLO WEB',
      heroTitle: <>EXPERIENCIA DE USUARIO Y DISEÑO</>,
      mainDescription:
        'Diseñamos experiencias digitales estratégicas que conectan, comunican y convierten. Integramos arquitectura de información, usabilidad y diseño visual para crear entornos intuitivos, funcionales y alineados a tus objetivos de negocio. No se trata solo de estética, sino de generar recorridos digitales que transforman visitantes en clientes.',
      modalButtonText: 'DISEÑO Y DESARROLLO WEB',
      contactanosText:
        'Consolida tu presencia web, diseña con nosotros tu página web',
      serviceName: '1',
      features: [
        {
          title: (
            <>
              DISEÑO DE <br />
              EXPERIENCIA (UX)
            </>
          ),
          description:
            'Analizamos el comportamiento del usuario y estructuramos recorridos claros y funcionales, reduciendo fricción y optimizando cada punto de interacción.',
        },
        {
          title: (
            <>
              DISEÑO DE <br />
              INTERFAZ (UI)
            </>
          ),
          description:
            'Desarrollamos propuestas visuales coherentes con la marca, priorizando claridad, usabilidad y una experiencia atractiva en cada dispositivo.',
        },
      ],
      uxUiSectionAlt:
        'Diseño de interfaz (UI) y experiencia de usuario (UX) enfocado en la usabilidad y conversión digital.',
      uxUiSectionTitle:
        'Diseño UX, Diseño UI, experiencia de usuario, interacción digital, navegación fluida, interfaz intuitiva, diseño responsivoTÍTULO: Diseño y desarrollo web, Diseño UX UI, Digimedia.webp',
    },
    gestionRedes: {
      modalAText: 'GESTIÓN DE REDES SOCIALES',
      heroTitle: <>DISEÑO UX Y UI</>,
      mainDescription:
        'Diseñamos experiencias digitales que combinan funcionalidad y estética. Creamos interfaces intuitivas, alineadas con la identidad de marca y orientadas a facilitar la navegación y la conversión.',
      modalButtonText: 'GESTIÓN DE REDES SOCIALES',
      contactanosText:
        'Impulsa tus redes sociales con diseño gráfico de calidad',
      serviceName: '2',
      features: [
        {
          title: (
            <>
              DISEÑO DE <br />
              EXPERIENCIA (UX)
            </>
          ),
          description:
            'Analizamos el comportamiento del usuario y estructuramos recorridos claros y funcionales, reduciendo fricción y optimizando cada punto de interacción.',
        },
        {
          title: (
            <>
              DISEÑO DE <br />
              INTERFAZ (UI)
            </>
          ),
          description:
            'Desarrollamos propuestas visuales coherentes con la marca, priorizando claridad, usabilidad y una experiencia atractiva en cada dispositivo.',
        },
      ],
      uxUiSectionAlt:
        'Diseño de piezas gráficas y contenido visual enfocado en redes sociales y engagement digital.',
      uxUiSectionTitle:
        'Diseño gráfico, piezas visuales, redes sociales, contenido digital, engagement, branding visualTÍTULO: Gestión de Redes, Piezas Gráficas, Digimedia.webp',
    },
  };

  const backgroundImage =
    backgroundImages[from] || backgroundImages.disenoDesarrollo;
  const currentTexts = dynamicTexts[from] || dynamicTexts.disenoDesarrollo;

  const modales = {
    modalA: {
      text: currentTexts.modalAText,
      fondo:
        '/servicios/desarrollo/modal-scroll/diseno-desarrollo-web-digimedia-pop-up.webp',
      title: 'OBTÉN UNA ASESORÍA ¡GRATIS!',
      imageTitle: "Diseño y Desarrollo Web Digimedia Pop Up",
      imageAlt: "OBTÉN UNA ASESORÍA ¡GRATIS!",
      serviceName: currentTexts.serviceName,
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/diseno-ux-experiencia-usuario-digimedia.webp"
          alt="Ícono de interfaz web con texto UX representando diseño de experiencia de usuario en sitios web"
          title="Diseño UX enfocado en experiencia de usuario | Digimedia Marketing"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: currentTexts.features[0].title,
      description: currentTexts.features[0].description,
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/diseno-ui-interfaz-usuario-digimedia.webp"
          alt="Ícono de interfaz web con texto UI representando diseño de interfaz de usuario para sitios web"
          title="Diseño UI e interfaz de usuario profesional | Digimedia Marketing"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: currentTexts.features[1].title,
      description: currentTexts.features[1].description,
    },
  ];

  return (
    <div>
      <ModalScroll data={modales} />

      <ModalButton
        title="Lleva tu negocio al siguiente nivel online"
        fondo="/servicios/desarrollo/modal-button/programacion-desarrollo-web-digimedia.webp"
        text={currentTexts.modalButtonText}
        serviceName={currentTexts.serviceName}
        imageTitle="Programación y desarrollo web profesional | Digimedia Marketing"
        imageAlt="Ilustración de desarrollador trabajando en programación y desarrollo web con ventanas de código en laptop"
      />
      <UxUiSection
        features={featuresuxui}
        mainDescription={currentTexts.mainDescription}
        backgroundImage={backgroundImage}
        heroTitle={currentTexts.heroTitle}
        alt={currentTexts.uxUiSectionAlt}
        title={currentTexts.uxUiSectionTitle}
        category="Gestión de redes Sociales"
      />
      <Contactanos
        text={currentTexts.contactanosText}
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
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