import Image from 'next/image';
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { PencilRuler, Palette, SpellCheck, Layers } from 'lucide-react';
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
      title: 'logotipo y aplicaciones',
      description:
        'INCLUYE DIFERENTES VARIANTES DEL LOGOTIPO, COMO VERSIONES CON Y SIN TEXTO, Y PAUTAS SOBRE CÓMO Y DÓNDE USAR CADA UNA.',
      alt: 'Logotipo, Usos correctos/incorrectos, Tipografía, Paleta de colores, Imagotipo, Isotipo, Logotipo, Retícula, Iconografía, Papelería corporativa',
    },

    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/manual_marca/icons/paleta de colores blanco.png"
          alt="Icono de una tarjeta y firma con lápiz"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: 'paleta de colores',
      description:
        'DEFINICIÓN DE LOS COLORES PRIMARIOS Y SECUNDARIOS DE LA MARCA, INCLUYENDO SUS CÓDIGOS RGB, CMYK Y PANTONE PARA FACILITAR SU USO EN DIFERENTES SOPORTES.',
      alt: 'Logotipo, Usos correctos/incorrectos, Tipografía, Paleta de colores, Imagotipo, Isotipo, Logotipo, Retícula, Iconografía, Papelería corporativa',
    },

    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/manual_marca/icons/tipografia blanco.png"
          alt="Icono de una tarjeta y firma con lápiz"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: 'tipografía',
      description:
        'SELECCIÓN DE FUENTES DE LETRA PRINCIPALES Y SECUNDARIAS, INCLUYENDO EJEMPLOS DE CÓMO USARLAS EN DIFERENTES TAMAÑOS Y ESTILOS PARA TITULARES Y CUERPOS DE TEXTO.',
      alt: 'Logotipo, Usos correctos/incorrectos, Tipografía, Paleta de colores, Imagotipo, Isotipo, Logotipo, Retícula, Iconografía, Papelería corporativa',
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
        mainDescription="UN MANUAL DE MARCA ES UN DOCUMENTO QUE ESTABLECE LAS REGLAS Y DIRECTRICES PARA USAR CORRECTAMENTE LA IDENTIDAD VISUAL Y VERBAL DE UNA MARCA. SIRVE PARA MANTENER LA COHERENCIA EN TODAS LAS COMUNICACIONES, TANTO INTERNAS COMO EXTERNAS, Y ASEGURAR QUE LA MARCA SE VEA, SE SIENTA Y SE COMUNIQUE DE LA MISMA FORMA, SIN IMPORTAR QUIÉN LA USE O DÓNDE SE APLIQUE."
        backgroundImage="/servicios/DisenoUI/branding3.webp"
        heroTitle="MANUAL DE MARCA"
        heroBulletPoints={[]}
        alt="Piezas gráficas, Redes sociales, Aplicaciones digitales, Señalética, Merchandising, Lenguaje visual, Tono y voz de marca"
        title="Branding y diseño - Manual de marca - Digimedia.webp"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>
  );
}
