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
      fondo: '/servicios/desarrollo/modal-scroll/disenoydesarrolloweb.png',
      title: 'OBTÉN UNA ASESORÍA ¡GRATIS!',
      serviceName: '1',
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/dominio_hosting/dominio blanco.png"
          alt="Icono de busqueda en la web y una lupa"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: 'DOMINIO',
      description:
        "Es tu dirección exclusiva en internet. No es solo un nombre; es tu activo digital más valioso.",
    },
    {
      icon: (
        <Image
          src="/servicios/diseno_desarrollo_web/dominio_hosting/hosting blanco.png"
          alt="Icono de un servidor en la nube"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: 'HOSTING',
      description:
        "Es el motor invisible que mantiene tu web online 24/7. Olvídate de caídas o webs lentas.",},
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
        mainDescription=" El hosting es la infraestructura esencial que permite que tu sitio web exista. Te aseguramos un Hosting de Alta Velocidad y el registro seguro de tu Nombre de Dominio para proteger tu marca de imitadores."
        backgroundImage="/servicios/diseno_desarrollo_web/dominio_hosting/dominio_hosting_principal.webp"
        heroTitle=<>DOMINIO Y<br /> HOSTING</>
        alt="Dominio web, hosting profesional, hosting optimizado, alojamiento web, servidor seguro, mantenimiento web, seguridad web"
        title="Diseño y desarrollo web, Dominio y Hosting, Digimedia.webp"
        // heroBulletPoints={[
        //   "TE DAN UNA PRESENCIA ONLINE COMPLETA Y PROFESIONAL, GENERAN CONFIANZA, TE DAN CONTROL, AUMENTAN TU VISIBILIDAD Y SON LA BASE PARA CRECER EN INTERNET.",
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
