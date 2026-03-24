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
      imageTitle: "Programación y desarrollo web profesional | Digimedia",
      imageAlt: "Imagen que aparece en el pop up para contactar el servicio del servicio de Diseño y Desarrollo Web ofrecido por Digimedia"
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
          src="/servicios/diseno_desarrollo_web/diseno_ux_ui/diseno-de-interfaces-digimedia-icono.webp"
          alt="Ícono que contiene una UI en la pantalla y representa el concepto de diseño de interfaces"
          title="Sub-subservicio de Diseño de Interfaces (UI)"
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
        backgroundImage="/servicios/DisenoUI/experiencia-de-usuario-y-diseno-digimedia.webp"
        heroTitle=<>EXPERIENCIA DE USUARIO Y DISEÑO</>
        alt="Imagen que muestra a una persona frente a una pantalla realizando el sub servicio de experiencia de usuario y diseño que ayuda a facilitar la navegación y conversión web"
        imageTitle="Subservicio de Experiencia de Usuario y Diseño"
      />
      <Contactanos
        text="Crea productos digitales pensando en el usuario. ¡Hablemos de tu proyecto!"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>
  );
}
