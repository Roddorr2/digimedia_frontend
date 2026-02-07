'use client';
import React from 'react';

import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { MonitorIcon, Smartphone, PenTool, Layers } from 'lucide-react';
import ModalButton from '../components/ModalButton';

export default function DisenoPauta() {
  const modales = {
    modalA: {
      text: 'BRANDING Y DISEÑO',
      fondo: '/servicios/branding/modal-scroll/brandingydiseno.png',
      title: 'TU PRIMERA CONSULTA ¡ES GRATIS!',
      serviceName: '4',
    },
  };

  const features = [
    {
      icon: (
        <img
          src="/servicios/branding_diseno/publicidad_digital/icons/publicidad_icon blanco.png"
          alt="Computadora con iconos de publicidad"
          className="w-full h-full object-contain"
        />
      ),
      title: 'PUBLICIDAD',
      description:
        'Cada campaña comienza con una planificación estratégica: definimos objetivos claros, elegimos los canales más efectivos y alineamos sus metas comerciales con las expectativas de su audiencia.',
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
        features={features}
        mainDescription="Implementamos campañas de publicidad digital que conectan su marca con el público adecuado en el momento preciso, optimizando el rendimiento para lograr resultados medibles y un mayor retorno de inversión."
        backgroundImage="/servicios/gestion/diseno-pautas/publicidad_digital1.webp"
        heroTitle=<>
          PUBLICIDAD <br /> DIGITAL
        </>
        alt="Representación visual de estrategias de branding digital con iconos de creatividad, redes sociales, análisis de datos y posicionamiento online, parte de los servicios que ofrece Digimedia agencia de marketing Digital"
        title="Publicidad Digital, gestión digital, Agencia de Marketing Digimedia "
        category="Branding y Diseño"
        // heroBulletPoints={[
        //   "PERMITE LLEGAR A AUDIENCIAS EN TODO EL MUNDO, SIN IMPORTAR LA UBICACIÓN GEOGRÁFICA.",
        //   "PERMITE DIRIGIR LOS MENSAJES A GRUPOS ESPECÍFICOS DE PERSONAS CON INTERESES Y COMPORTAMIENTOS SIMILARES.",
        //   "PUEDE GENERAR UN MAYOR NÚMERO DE LEADS Y VENTAS, ESPECIALMENTE CUANDO SE IMPLEMENTA UNA ESTRATEGIA DE MARKETING DIGITAL EFECTIVA."
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
