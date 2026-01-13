'use client';
import Image from 'next/image';
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { MonitorIcon, Smartphone, PenTool, Layers } from 'lucide-react';
import ModalButton from '../components/ModalButton';

export default function PlanificacionCronograma() {
  const modales = {
    modalA: {
      text: 'GESTIÓN DE REDES SOCIALES',
      fondo: '/servicios/gestion/modal-scroll/fondo.webp',
      title: 'SOLO POR HOY ACCEDE A UNA ¡ASESORÍA GRATIS!',
      serviceName: '2',
    },
  };

  const features = [
    {
      icon: (
        <Image
          src="/servicios/gestion/planificacion/icons/first 2 blanco.png"
          alt="Tabla de apuntes"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: 'PLANIFICACIÓN',
      description:
        "Definimos pilares y formatos alineados a sus objetivos trimestrales y acordamos los KPIs para medir el impacto de la comunicación.",
    },
    {
      icon: (
        <Image
          src="/servicios/gestion/planificacion/icons/second blanco.png"
          alt="Calendario"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: 'CRONOGRAMA',
      description:
        "Gestionamos sus publicaciones para mantener una presencia digital continua y coherente en los momentos clave para su audiencia.",
    },
  ];

  return (
    <div>
      <ModalButton
        title="¡ELEVA TUS CAMPAÑAS A OTRO NIVEL!"
        fondo="/servicios/gestion/modal-button/imagen.webp"
        text="GESTIÓN DE REDES SOCIALES"
        serviceName="2"
      />

      <UxUiSection
        features={features}
        mainDescription='Transformamos datos en decisiones rentables. Realizamos diagnósticos precisos del desempeño actual y comparativas de mercado para identificar ineficiencias y capitalizar oportunidades no explotadas por la competencia.'
        backgroundImage='/servicios/gestion/planificacion/planificacion_principal.webp'
        heroTitle=<> ESTRATEGIA DE <br /> CONTENIDO</>
        alt="Planificación estratégica de contenido con cronogramas visuales para redes sociales y campañas digitales"
        title="Organización de contenido y planificación digital con cronograma – Digimedia Marketing."
        // heroBulletPoints={[
        //   "Aseguran coherencia y frecuencia constante en las publicaciones.",
        //   "Permiten optimizar recursos y evitar improvisaciones.",
        //   "Ayudan a evaluar resultados y hacer ajustes estratégicos.",
        //   "Facilitan el trabajo colaborativo entre equipos de diseño, redacción y marketing."
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
