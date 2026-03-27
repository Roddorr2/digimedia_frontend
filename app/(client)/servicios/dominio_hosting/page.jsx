import Image from 'next/image';
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { MonitorIcon, Smartphone, PenTool, Layers } from 'lucide-react';
import ModalButton from '../components/ModalButton';

export default function UXUI() {
  const modales = {
    modalA: {
      text: 'DISEÑO Y DESARROLLO WEB',
      fondo: '/servicios/desarrollo/modal-scroll/diseno-y-desarrollo-web.webp',
      title: 'OBTÉN UNA ASESORÍA ¡GRATIS!',
      serviceName: '1',
      imageTitle: 'Obtén una asesoría ¡Gratis!',
      imageAlt:
        'La imagen muestra a una persona buscando imágenes en un biblioteca virtual',
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/dominio_hosting/seo-on-page-digimedia-icono.webp"
          alt="Ícono que contiene las siglas SEO dentro de una lupa y representa la técnica que se usa para optimizar y mejorar la visibilidad de una página web"
          title="Sub-subservicio de SEO ON-PAGE"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: 'SEO ON-PAGE',
      description:
        'Analizamos y optimizamos la estructura web para asegurar su correcta indexación, mejorando la velocidad de carga, la jerarquía de contenidos y el posicionamiento en buscadores.',
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/dominio_hosting/seo-off-page-digimedia-icono.webp"
          alt="Ícono que contiene las siglas SEO dentro de una lupa por delante de una pantalla y representa los resultados de una búsqueda web"
          title="Sub-subservicio de SEO OFF-PAGE"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: 'SEO OFF-PAGE',
      description:
        'Desarrollamos enlaces de calidad para aumentar la autoridad del dominio y reforzar la relevancia de su marca en su sector.',
    },
  ];

  return (
    <div>
      <ModalScroll data={modales} />
      <ModalButton
        title="Lleva tu negocio al siguiente nivel online"
        fondo="/servicios/desarrollo/modal-button/imagen.webp"
        text="DISEÑO Y DESARROLLO WEB"
        serviceName="1"
      />
      <UxUiSection
        features={featuresuxui}
        mainDescription="Mejoramos la visibilidad de tu sitio web en los motores de búsqueda mediante una optimización técnica y estratégica. Trabajamos palabras clave, estructura, velocidad y contenido para atraer tráfico cualificado y aumentar tus conversiones de forma orgánica."
        backgroundImage="/servicios/diseno_desarrollo_web/dominio_hosting/estrategia-seo-para-buscadores-digimedia.webp"
        heroTitle={
          <>
            OPTIMIZACIÓN SEO
            <br /> PARA BUSCADORES
          </>
        }
        alt="Imagen que muestra a una persona frente a una pantalla realizando el sub servicio de optimización seo para buscadores con el objetivo de optimizar el posicionamiento de una página web"
        title="Subservicio de Optimización SEO para buscadores"
      />

      {/* heroBulletPoints={[
  "TE DAN UNA PRESENCIA ONLINE COMPLETA..."
]} */}

      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </div>
  );
}
