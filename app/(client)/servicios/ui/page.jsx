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
    gestionRedes: "/servicios/DisenoUI/disenio-UX-y-UI.webp",
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
      title: currentTexts.features[0].title,
      description: currentTexts.features[0].description,
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
        alt={currentTexts.uxUiSectionAlt}
        title={currentTexts.uxUiSectionTitle}
      />
      <Contactanos
        text={currentTexts.contactanosText}
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