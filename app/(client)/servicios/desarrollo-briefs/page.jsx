import Image from 'next/image';
import Contactanos from '../components/Contactanos';
import { UxUiSection } from '../components/uxui-section';
import ModalScroll from '../components/ModalScroll';
import ModalButton from '../components/ModalButton';

import { MonitorIcon, Smartphone, PenTool, Layers } from 'lucide-react';

export default function UXUI() {
  const modales = {
    modalA: {
      text: 'BRANDING Y DISEÑO',
      fondo: '/servicios/branding/modal-scroll/fondo.webp',
      title: 'TU PRIMERA CONSULTA ¡ES GRATIS!',
      serviceName: '4',
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
      title: 'BRIEF',
      description:
        'ES UN DOCUMENTO CLAVE QUE RECOGE LA INFORMACIÓN ESENCIAL PARA DESARROLLAR UN PROYECTO VISUAL ALINEADO CON LOS OBJETIVOS DE UNA MARCA. SUELE INCLUIR DATOS SOBRE LA IDENTIDAD DE LA EMPRESA (COMO SU HISTORIA, MISIÓN, VISIÓN Y VALORES), ASÍ COMO EL OBJETIVO DEL ENCARGO, YA SEA CREAR UN LOGO, RENOVAR LA IDENTIDAD VISUAL O LANZAR UNA CAMPAÑA.',
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
        mainDescription="ES LA CONSTRUCCIÓN DE UNA GUÍA QUE RECOGE TODA LA INFORMACIÓN ESENCIAL DE UN PROYECTO DE DISEÑO O BRANDING. SIRVE COMO BASE PARA DEFINIR LA IDENTIDAD VISUAL, TONO, MENSAJE Y OBJETIVOS DE UNA MARCA, PRODUCTO O CAMPAÑA."
        backgroundImage="/servicios/desarrollo_brief/desarrollo_brieff_principal.webp"
        heroTitle="DESARROLLO DE BRIEF"
        alt="Branding, Diseño gráfico, Identidad visual, Desarrollo de marca, Manual de marca, Brief creativo, Comunicación visual, Estrategia de marca, Diseño corporativo, Posicionamiento"
        title="Branding y diseño - desarrollo de brief - Digimedia.webp"
        heroBulletPoints={[
          'ALINEAR AL CLIENTE Y AL EQUIPO CREATIVO EN UNA MISMA VISIÓN Y DIRECCIÓN.',
          'REDUCIR MALENTENDIDOS O CAMBIOS INNECESARIOS DURANTE EL PROCESO.',
          'GUIAR CADA DECISIÓN DE DISEÑO PARA QUE SEA COHERENTE CON LOS VALORES Y OBJETIVOS DE MARCA.',
          'AYUDA A JUSTIFICAR LAS DECISIONES CREATIVAS ANTE EL CLIENTE.',
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
