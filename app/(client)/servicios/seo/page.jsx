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
          src="/servicios/diseno_desarrollo_web/seo/diseno-responsive-digimedia-icono.webp"
          alt="Ícono que muestra diferentes dispositivos tecnológicos y representa el objetivo del servicio que es el adaptar un sitio web a todos los aparatos digitales"
          title="Sub-subservicio de Diseño responsive"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: 'DISEÑO RESPONSIVE',
      description:
        'Adaptamos tu sitio a todos los dispositivos para garantizar una experiencia fluida y profesional.',
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/seo/integraciones-digitales-digimedia-icono.webp"
          alt="ícono que muestra una nube y representa la conexión digital que ofrece el servicio al conectar la web con diferentes herramientas digitales"
          title="Sub-subservicio de Integraciones digitales"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: (
        <>
          INTEGRACIONES <br /> DIGITALES
        </>
      ),
      description:
        'Conectamos tu web con herramientas como WhatsApp, redes sociales y formularios para facilitar la conversión.',
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
        mainDescription="Creamos sitios web adaptables a todos los dispositivos e integramos herramientas digitales clave, pasarelas de pago, automatizaciones y analítica para optimizar la experiencia del usuario y potenciar la conversión."
        backgroundImage="/servicios/diseno_desarrollo_web/seo/desarrollo-responsive-e-integraciones-digitales-digimedia.webp"
        heroTitle="DESARROLLO RESPONSIVE E INTEGRACIONES DIGITALES"
        alt="Imagen que muestra a una persona frente a una pizarra con papeles que contienen estrategias de optimización seo para buscadores con el objetivo de desarrollar sitios webs adaptables a cualquier dispositivo"
        title="Subservicio de Desarrollo responsive e integraciones digitales"
        // heroBulletPoints={[
        //   "MÁS VISIBILIDAD = MÁS TRÁFICO: APARECER ARRIBA EN GOOGLE SIGNIFICA QUE MÁS GENTE INTERESADA ENCONTRARÁ TU SITIO.",
        //   "TRÁFICO DE CALIDAD = MEJORES RESULTADOS: ATRAES A PERSONAS QUE REALMENTE BUSCAN LO QUE OFRECES, AUMENTANDO TUS POSIBILIDADES DE ÉXITO.",
        //   "CONFIANZA Y AUTORIDAD: LOS PRIMEROS RESULTADOS SE VEN MÁS CREÍBLES, LO QUE FORTALECE TU MARCA."
        // ]}
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </div>
  );
}
