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
      title: 'UX',
      description:
        'EL DISEÑO UX (EXPERIENCIA DE USUARIO) SE CENTRA EN ENTENDER A LAS PERSONAS QUE USARÁN UN PRODUCTO DIGITAL (WEB, APP, ETC.) PARA CREAR UNA EXPERIENCIA EFECTIVA, INTUITIVA Y SATISFACTORIA. INVESTIGA SUS NECESIDADES, COMPORTAMIENTOS Y FRUSTRACIONES PARA DEFINIR LA ESTRUCTURA Y LA FUNCIONALIDAD DEL PRODUCTO.',
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
      title: 'UI',
      description:
        'EL DISEÑO UI (INTERFAZ DE USUARIO) SE ENCARGA DE LA PARTE VISUAL, CREANDO UNA INTERFAZ ATRACTIVA, COHERENTE Y FÁCIL DE NAVEGAR. UTILIZA ELEMENTOS COMO COLORES, TIPOGRAFÍA E IMÁGENES PARA COMUNICAR LA MARCA Y GUIAR AL USUARIO DE MANERA EFICIENTE.',
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
        mainDescription="EL DISEÑO UX SE PREOCUPA POR LA EXPERIENCIA GLOBAL DEL USUARIO, MIENTRAS QUE EL DISEÑO UI SE ENFOCA EN LOS DETALLES VISUALES DE LA INTERFAZ. AMBOS TRABAJAN JUNTOS PARA CREAR PRODUCTOS DIGITALES EXITOSOS."
        backgroundImage={backgroundImage}
        heroTitle="DISEÑO UX Y UI"
        alt="Diseño de interfaz (UI) y experiencia de usuario (UX) enfocado en la usabilidad y conversión digital."
        title="Diseño UX, Diseño UI, experiencia de usuario, interacción digital, navegación fluida, interfaz intuitiva, diseño responsivoTÍTULO: Diseño y desarrollo web, Diseño UX UI, Digimedia.webp"
        heroBulletPoints={[
          'MAYOR SATISFACCIÓN DEL USUARIO: UN DISEÑO INTUITIVO Y AGRADABLE HACE QUE LOS USUARIOS DISFRUTEN USANDO EL PRODUCTO O SERVICIO.',
          'AUMENTO DE LA USABILIDAD: FACILITA LA NAVEGACIÓN Y LA REALIZACIÓN DE TAREAS, REDUCIENDO LA FRUSTRACIÓN.',
          'MEJORA DE LA ACCESIBILIDAD: PERMITE QUE PERSONAS CON DIVERSAS CAPACIDADES PUEDAN UTILIZAR EL PRODUCTO O SERVICIO.',
        ]}
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
