import Image from 'next/image';
import ModalScroll from '../components/ModalScroll';
import Contactanos from '../components/Contactanos';
import { UxUiSection } from '../components/uxui-section';
import ModalButton from '../components/ModalButton';

export default function Web() {
  const modales = {
    modalA: {
      text: 'DISEÑO Y DESARROLLO WEB',
      fondo: '/servicios/desarrollo/modal-scroll/fondo.webp',
      title: 'OBTÉN UNA ASESORÍA ¡GRATIS!',
      serviceName: '1', // Ajusta según corresponda
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/desarrollo_web/desarrollo_front blanco.png"
          alt="Icono de una computadora"
          className="w-full h-full object-contain"
          width={200}
          height={100}
        />
      ),
      title: 'DESARROLLO FRONT-END',
      description:
        'SE ENFOCA EN LA PARTE VISUAL DEL SITIO WEB CON LA QUE LOS USUARIOS INTERACTÚAN DIRECTAMENTE. UTILIZA LENGUAJES COMO HTML, CSS Y JAVASCRIPT PARA CREAR LA ESTRUCTURA, EL ESTILO Y LA INTERACTIVIDAD DE LA PÁGINA.',
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/desarrollo_web/desarrollo-back blanco.png"
          alt="Icono de una base de datos"
          className="w-full h-full object-contain"
          width={200}
          height={100}
        />
      ),
      title: 'DESARROLLO BACK-END',
      description:
        'SE OCUPA DE LA "TRASTIENDA" DEL SITIO WEB, GESTIONANDO EL SERVIDOR, LA BASE DE DATOS Y LA LÓGICA DE LA APLICACIÓN. LENGUAJES COMUNES INCLUYEN PYTHON, JAVA, PHP Y NODE.JS.',
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
        mainDescription="EL DESARROLLO WEB ES EL PROCESO DE CREAR Y MANTENER SITIOS WEB Y APLICACIONES QUE SE EJECUTAN EN INTERNET. IMPLICA UNA COMBINACIÓN DE DISEÑO, PROGRAMACIÓN Y GESTIÓN DE BASES DE DATOS PARA ASEGURAR QUE UN SITIO WEB SEA FUNCIONAL, ATRACTIVO Y ACCESIBLE PARA LOS USUARIOS."
        backgroundImage="/servicios/DisenoUI/diseno_1.webp"
        heroTitle="DESARROLLO WEB"
        alt="Diseño UX, Diseño UI, experiencia de usuario, interacción digital, navegación fluida, interfaz intuitiva, diseño responsivo"
        title="Diseño y desarrollo web, Diseño UX UI, Digimedia.webp"
        heroBulletPoints={[
          'PLANIFICACIÓN: DEFINIR LOS OBJETIVOS DEL SITIO WEB, EL PÚBLICO OBJETIVO Y LAS FUNCIONALIDADES NECESARIAS.',
          'DISEÑO: CREAR LA APARIENCIA VISUAL Y LA EXPERIENCIA DE USUARIO (UX/UI).',
          'DESARROLLO FRONT-END: ESCRIBIR EL CÓDIGO PARA LA INTERFAZ DE USUARIO.',
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
