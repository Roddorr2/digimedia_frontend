'use client';
import React from 'react';

import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { MonitorIcon, Smartphone, PenTool, Layers } from 'lucide-react';
import Image from 'next/image';
import ModalButton from '../components/ModalButton';

export default function DisenoPauta() {
  const modales = {
    modalA: {
      text: 'GESTIÓN DE REDES SOCIALES',
      fondo: '/servicios/gestion/modal-scroll/gestionderedessociales.png',
      title: 'SOLO POR HOY ACCEDE A UNA ¡ASESORÍA GRATIS!',
      serviceName: '2',
    },
  };

  const features = [
    {
      icon: (
        <Image
          src="/servicios/gestion/diseno-pautas/icons/first blanco 1.png"
          alt="Icono de una hoja con un lápiz"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: 'PLANIFICACIÓN',
      description:
        'En la gestión de redes sociales, planificamos sus campañas de anuncios pagados definiendo objetivos, públicos, mensajes, formatos y presupuesto para asegurar resultados claros, eficientes y medibles.',
    },
  ];

  return (
    <div>
      <ModalScroll data={modales} />
      <ModalButton
        title="¡ELEVA TUS CAMPAÑAS A OTRO NIVEL!"
        fondo="/servicios/gestion/modal-button/imagen.webp"
        text="GESTIÓN DE REDES SOCIALES"
        serviceName="2"
      />

      <UxUiSection
        features={features}
        mainDescription="Brindamos servicio de diseño y gestión de campañas de publicidad digital en redes sociales y otras plataformas. Creamos piezas gráficas y audiovisuales alineadas con tus objetivos comerciales y las orientamos a públicos específicos para maximizar el rendimientoe la inversión."
        backgroundImage="/servicios/gestion/diseno-pautas/Diseño-de-Pautas-Digimedia.webp"
        heroTitle=<>
          DISEÑO DE <br />
          PAUTAS
        </>
        // heroBulletPoints={[
        //   "Las pautas bien diseñadas incrementan el rendimiento de la inversión publicitaria.",
        //   "Son clave para posicionar productos, servicios o marcas en mercados competitivos.",
        //   "Permiten medir resultados y ajustar campañas en tiempo real.",
        //   "Atraer la atención del público objetivo rápidamente.",
        // ]}
        alt="Gestión de redes sociales, Diseño de pautas, Publicidad digital, Estrategia en redes, Social media marketing, Meta Ads, Facebook Ads, Anuncios para Instagram, Marketing digital, Community manager"
        title="Gestión de redes sociales, diseño de pautas, Digimedia.webp"
        category="Gestión de redes sociales"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>
  );
}
