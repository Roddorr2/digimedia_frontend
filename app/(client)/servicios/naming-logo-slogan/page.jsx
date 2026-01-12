import Image from 'next/image';
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
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
          src="/servicios/marketing_gestion_digital/naming_logo_slogan/icons/naming blanco.png"
          alt="Icono de una tarjeta y firma con lápiz"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: 'NAMING',
      description:
        'EL NAMING ES EL PROCESO DE CREAR Y SELECCIONAR EL NOMBRE DE UNA MARCA, PRODUCTO, SERVICIO O PROYECTO.',
    },

    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/naming_logo_slogan/icons/logo blanco.png"
          alt="Icono de un logotipo"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: 'LOGO',
      description:
        'EL LOGO ES UN SÍMBOLO GRÁFICO COMPUESTO POR PALABRAS, IMÁGENES, COLORES O UNA COMBINACIÓN DE ELLOS, QUE SE UTILIZA PARA IDENTIFICAR UNA MARCA O UN PRODUCTO.',
    },

    {
      icon: (
        <Image
          src="/servicios/marketing_gestion_digital/naming_logo_slogan/icons/slogan blanco.png"
          alt="Icono de un cartel"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: 'SLOGAN',
      description:
        'EL ESLOGAN (O SLOGAN EN INGLÉS) ES UNA FRASE CORTA Y PEGADIZA QUE SE UTILIZA PARA IDENTIFICAR UN PRODUCTO, SERVICIO O EMPRESA, BUSCANDO RESALTAR SUS BENEFICIOS, SU ESENCIA O UN MENSAJE CLAVE.',
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
        mainDescription="Desarrollamos los pilares fundamentales de su identidad de marca: naming, logo y slogan. Cada elemento se diseña estratégicamente para construir una percepción sólida, asegurar el reconocimiento de su empresa y diferenciar su producto o servicio en el mercado."
        backgroundImage="/servicios/DisenoUI/branding4.webp"
        heroTitle="NAMING, LOGO Y SLOGAN"
        heroBulletPoints={[]}
        alt="Naming, logo, slogan, piezas gráficas, redes sociales, aplicaciones digitales, señalética, merchandising, lenguaje visual, tono y voz de marca"
        title="Branding y diseño, Manual de marca, Digimedia.webp"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      />
    </div>
  );
}
