'use client';
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { MonitorIcon, Smartphone, PenTool, Layers } from 'lucide-react';
import ModalButton from '../components/ModalButton';

export default function ProduccionPautas() {
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
        <img
          src="/servicios/gestion/produccion-pautas/icons/first blanco.png"
          alt="Diseño de pautas"
          className="w-full h-full object-contain"
        />
      ),
      title: 'Diseño de pautas',
      description:
        'Creamos anuncios visuales estratégicos y alineados a su marca, con mensajes claros que captan la atención de su público objetivo y fomentan la acción.',
    },
    {
      icon: (
        <img
          src="/servicios/gestion/produccion-pautas/icons/first 2 blanco.png"
          alt="Hoja de apuntes"
          className="w-full h-full object-contain"
        />
      ),
      title: 'Producción de pautas',
      description:
        'Gestionamos integralmente el ciclo del anuncio, desde la planificación y edición hasta su adaptación y publicación, asegurando piezas listas para generar resultados.',
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
        mainDescription=" Desarrollamos y ejecutamos campañas publicitarias digitales completas. Integramos la creatividad visual con la optimización técnica para asegurar que cada anuncio genere el máximo impacto y retorno en las plataformas seleccionadas."
        backgroundImage="/servicios/planificacion/produccion_pautas_principal.webp"
        heroTitle=<>
          PRODUCCIÓN
          <br />
          DE PAUTAS
        </>
        alt="Producción de anuncios gráficos y textos publicitarios listos para campañas en Meta Ads y redes sociales."
        title="Producción creativa de pautas para campañas publicitarias – Digimedia"
        category="Gestión de redes sociales"
        // heroBulletPoints={[
        // "Crear contenidos listos para ser promocionados.",
        // "Asegurar que los anuncios sean visualmente atractivos y técnicamente óptimos.",
        // "Maximizar el rendimiento de las campañas en redes sociales.",
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
