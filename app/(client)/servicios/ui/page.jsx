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
    disenoDesarrollo:
      '/servicios/DisenoUI/experiencia-de-usuario-y-diseno-digimedia.webp',
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
      imageAlt:
        'Imagen que muestra a una persona frente a una pantalla realizando el sub servicio de experiencia de usuario y diseño que ayuda a facilitar la navegación y conversión web',
      imageTitle: 'Subservicio de Experiencia de Usuario y Diseño',
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
      imageAlt:
        'Diseño de piezas gráficas y contenido visual enfocado en redes sociales y engagement digital.',
      imageTitle:
        'Diseño gráfico, piezas visuales, redes sociales, contenido digital, engagement, branding visual',
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
      serviceName: currentTexts.serviceName,
      imageTitle: 'Programación y desarrollo web profesional | Digimedia',
      imageAlt:
        'Imagen que aparece en el pop up para contactar el servicio del servicio de Diseño y Desarrollo Web ofrecido por Digimedia',
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/experiencia-de-usuario-digimedia-icono.webp"
          alt="Ícono que contiene una UX en la pantalla y representa el concepto de experiencia de usuario"
          title="Sub-subservicio de Experiencia de Usuario (UX)"
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
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/diseno-de-interfaces-digimedia-icono.webp"
          alt="Ícono que contiene una UI en la pantalla y representa el concepto de diseño de interfaces"
          title="Sub-subservicio de Diseño de Interfaces (UI)"
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
        fondo="/servicios/desarrollo/modal-button/imagen.webp"
        text={currentTexts.modalButtonText}
        serviceName={currentTexts.serviceName}
      />
      <UxUiSection
        features={featuresuxui}
        mainDescription={currentTexts.mainDescription}
        backgroundImage={backgroundImage}
        heroTitle={currentTexts.heroTitle}
        alt={currentTexts.imageAlt}
        imageTitle={currentTexts.imageTitle}
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
