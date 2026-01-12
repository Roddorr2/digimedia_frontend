import Image from 'next/image';
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { Lightbulb, Smartphone, PenTool, Layers } from 'lucide-react';
import ModalButton from '../components/ModalButton';

export default function UXUI() {
  const modales = {
    modalA: {
      text: 'MARKETING Y GESTIÓN DIGITAL',
      fondo: '/servicios/marketing/modal-scroll/fondo.webp',
      title: 'HAZLO Y CUMPLE TUS SUEÑOS ¡ASESORÍA GRATIS!',
      serviceName: '3',
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/identidad_visual/icons/Foco blanco.png"
          alt="Icono de una tarjeta y firma con lápiz"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: 'IVC',
      description:
        'ES LA CARA VISIBLE DE LA MARCA, QUE AYUDA A COMUNICAR SU PERSONALIDAD, VALORES Y POSICIONAMIENTO EN EL MERCADO.',
    },
  ];

  return (
    <div>
      <ModalScroll data={modales} />
      <ModalButton
        title="¡EXPLOTA EL CONTENIDO DE TUS REDES!"
        fondo="/servicios/marketing/modal-button/imagen.webp"
        text="MARKETING Y GESTIÓN DIGITAL"
        serviceName="3"
      />

      <UxUiSection
        features={featuresuxui}
        mainDescription="ES LAMANIFESTACIÓN VISUAL DE LA IDENTIDAD DE UNA EMPRESA, UTILIZANDO ELEMENTOS COMO LOGOTIPOS, COLORES, TIPOGRAFÍAS Y ESTILOS GRÁFICOS PARA CREAR UNA IMAGEN COHERENTE Y RECONOCIBLE."
        backgroundImage="/servicios/DisenoUI/branding2.webp"
        heroTitle="IDENTIDAD VISUAL Y CORPORTIVA"
        heroBulletPoints={[
          'LA IVC AYUDA A QUE LA MARCA SEA FÁCILMENTE RECONOCIBLE Y DIFERENCIADA DE LA COMPETENCIA.',
          'PERMITE MANTENER UNA IMAGEN COHERENTE EN TODOS LOS SOPORTES DE COMUNICACIÓN.',
          'PERMITE QUE LA EMPRESA SE DESTAQUE EN EL MERCADO Y SEA PERCIBIDA DE MANERA ÚNICA.',
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
