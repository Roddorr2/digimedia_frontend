'use client';
import Image from 'next/image';
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { MonitorIcon, Smartphone, PenTool, Layers } from 'lucide-react';
import ModalButton from '../components/ModalButton';

export default function ProduccionPautas() {
  const modales = {
    modalA: {
      text: 'BRANDING Y DISEÑO',
      fondo: '/servicios/branding/modal-scroll/fondo.webp',
      title: 'TU PRIMERA CONSULTA ¡ES GRATIS!',
      serviceName: '4',
    },
  };

  const features = [
    {
      icon: (
        <Image
          src="/servicios/branding_diseno/monitoreo_reporting/icons/monitoreo blanco.png"
          alt="Icono de una computadora y una lupa con un ojo"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: 'MONITOREO',
      description:
        "Monitoreamos de forma constante los indicadores clave (KPIs) y los datos relevantes para brindarle una visión clara, estratégica y en tiempo real del desempeño.",
    },
    {
      icon: (
        <Image
          src="/servicios/branding_diseno/monitoreo_reporting/icons/reporting blanco.png"
          alt="Icono de un gráfico del rendimiento"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: 'REPORTING',
      description:
        "Presentamos la información mediante informes y paneles de control, transformando los datos en insights accionables para apoyar su toma de decisiones.",
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
        mainDescription="Implementamos procesos interrelacionados de recolección, análisis y presentación de datos clave. Esto permite evaluar el rendimiento de sus proyectos y estrategias, facilitando la toma de decisiones informadas para optimizar la gestión y asegurar la mejora continua."
        backgroundImage="/servicios/monitoreo_reporting/monitoreo_reporting_principal.webp"
        heroTitle="MONITOREO Y REPORTING"
        // heroBulletPoints={[
        //   "PERMITE TOMAR DECISIONES INFORMADAS, IMPLEMENTAR MEDIDAS CORRECTIVAS Y OPTIMIZAR LA GESTIÓN DEL PROYECTO.",
        //   "FACILITA LA TOMA DE DECISIONES, LA COMUNICACIÓN DE LOS RESULTADOS Y LA MEJORA CONTINUA DEL PROCESO.",
        // ]}
        alt="Monitoreo de campañas, reporting digital, análisis de datos, seguimiento de métricas, visualización de informes, medición de resultados, dashboards, rendimiento digital, KPIs, optimización de estrategias, Digimedia"
        title="Monitoreo y reporting, gestión digital, agencia de marketing digimedia"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>
  );
}
