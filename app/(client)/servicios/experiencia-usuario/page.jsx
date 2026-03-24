'use client';
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { MonitorIcon, Smartphone, PenTool, Layers } from 'lucide-react';
import Image from 'next/image';
import ModalButton from '../components/ModalButton';

export default function ExperienciaUsuario() {
  const modales = {
    modalA: {
      text: 'EXPERIENCIA DE USUARIO',
      fondo: '/servicios/desarrollo/modal-scroll/diseno-desarrollo-web-digimedia-pop-up.webp',
      title: 'OBTÉN UNA ASESORÍA ¡GRATIS!',
      serviceName: '1',
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/diseno-UX-UI_card1-EXPERIENCIA-DE-USUARIO-(UX).webp"
          alt="Research UX"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: (
        <>
          EXPERIENCIA DE <br />
          USUARIO (UX)
        </>
      ),
      description:
        'Nos enfocamos en la funcionalidad. Diseñamos sitios web intuitivos y efectivos basados en las necesidades, comportamientos y objetivos reales de tus clientes para eliminar frustraciones.',
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/diseno-UX-UI_card2-DISENO-DE-INTERFACES-(UI).webp"
          alt="Arquitectura de Información UX"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: (
        <>
          DISEÑO DE <br />
          INTERFACES (UI)
        </>
      ),
      description:
        'Nos encargamos de la apariencia visual de tu marca. Creamos interfaces atractivas y coherentes usando colores, tipografía e imágenes que guían al usuario emocionalmente.',
    },
  ];

  return (
    <div>
      <ModalScroll data={modales} />

      <ModalButton
        title="Lleva tu negocio al siguiente nivel online"
        fondo="/servicios/desarrollo/modal-button/imagen.webp"
        text="EXPERIENCIA DE USUARIO"
        serviceName="1"
      />
      <UxUiSection
        features={featuresuxui}
        mainDescription="Diseñamos experiencias digitales estratégicas que conectan, comunican y convierten. Integramos arquitectura de información, usabilidad y diseño visual para crear entornos intuitivos, funcionales y alineados a tus objetivos de negocio. No se trata solo de estética, sino de generar recorridos digitales que transforman visitantes en clientes."
        backgroundImage="/servicios/DisenoUI/diseno-UX-y-UI.webp"
        heroTitle=<>EXPERIENCIA DE USUARIO Y DISEÑO</>
        alt="Diseño de Experiencia de Usuario (UX) enfocado en usabilidad, investigación y arquitectura de información."
        title="Diseño UX, experiencia de usuario, usabilidad, investigación de usuarios, arquitectura de información, interacciones digitales, Digimedia.webp"
      />
      <Contactanos
        text="Crea productos digitales pensando en el usuario. ¡Hablemos de tu proyecto!"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </div>
  );
}
