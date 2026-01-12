import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { MonitorIcon, Smartphone, PenTool, Layers } from 'lucide-react';
import ModalButton from '../components/ModalButton';

export default function UXUI() {
  const modales = {
    modalA: {
      text: 'DISEÑO Y DESARROLLO WEB',
      fondo: '/servicios/desarrollo/modal-scroll/fondo.webp',
      title: 'OBTÉN UNA ASESORÍA ¡GRATIS!',
      serviceName: '1',
    },
  };

  const featuresuxui = [
    {
      icon: (
        <img
          src="/servicios/diseno_desarrollo_web/seo/seo_on blanco.png"
          alt="Lupa del seo "
          className="w-full h-full stroke-1"
        />
      ),
      title: 'SEO ON-PAGE',
      description:
        'SE REFIERE A LA OPTIMIZACIÓN DE LOS ELEMENTOS DENTRO DE TU PROPIO SITIO WEB PARA MEJORAR SU POSICIONAMIENTO.',
    },
    {
      icon: (
        <img
          src="/servicios/diseno_desarrollo_web/seo/seo_off blanco.png"
          alt="Lupa del seo buscando en la red"
          className="w-full h-full stroke-1"
        />
      ),
      title: 'SEO OFF-PAGE',
      description:
        'SE CENTRA EN LAS ACCIONES QUE REALIZAS FUERA DE TU PROPIO SITIO WEB PARA INFLUIR EN SU POSICIONAMIENTO. LA CONSTRUCCIÓN DE ENLACES (LINK BUILDING) ES UN COMPONENTE CRUCIAL.',
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
        mainDescription="EL SEO (SEARCH ENGINE OPTIMIZATION) ES EL CONJUNTO DE TÉCNICAS Y ESTRATEGIAS QUE SE IMPLEMENTAN EN UN SITIO WEB CON EL OBJETIVO DE MEJORAR SU VISIBILIDAD Y POSICIONAMIENTO EN LOS RESULTADOS ORGÁNICOS (NO PAGADOS) DE LOS MOTORES DE BÚSQUEDA COMO GOOGLE, BING Y OTROS."
        backgroundImage="/servicios/diseno_desarrollo_web/seo/seo_principal.webp"
        heroTitle="SEO  "
        alt="Posicionamiento web,  SEO on page, SEO off page, auditoría SEO, optimización web, herramienta SEO"
        title="Diseño y desarrollo web, SEO, Digimedia.webp"
        heroBulletPoints={[
          'MÁS VISIBILIDAD = MÁS TRÁFICO: APARECER ARRIBA EN GOOGLE SIGNIFICA QUE MÁS GENTE INTERESADA ENCONTRARÁ TU SITIO.',
          'TRÁFICO DE CALIDAD = MEJORES RESULTADOS: ATRAES A PERSONAS QUE REALMENTE BUSCAN LO QUE OFRECES, AUMENTANDO TUS POSIBILIDADES DE ÉXITO.',
          'CONFIANZA Y AUTORIDAD: LOS PRIMEROS RESULTADOS SE VEN MÁS CREÍBLES, LO QUE FORTALECE TU MARCA.',
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
