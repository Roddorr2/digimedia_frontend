import Image from 'next/image';
import Contactanos from '../components/Contactanos';
import ModalScroll from '../components/ModalScroll';
import { UxUiSection } from '../components/uxui-section';
import { Lightbulb, Smartphone, PenTool, Layers } from 'lucide-react';
import ModalButton from '../components/ModalButton';
import ServicePopup from '@/app/dashboard/whatsapp/components/ServicePopup';

export default function UXUI() {
  const modales = {
    modalA: {
      text: 'MARKETING Y GESTIÓN DIGITAL',
      fondo:
        '/servicios/marketing/modal-scroll/estrategia-marketing-gestion-digital-analisis-datos.webp',
      title: 'HAZLO Y CUMPLE TUS SUEÑOS ¡ASESORÍA Gratis!',
      serviceName: '3',
      imageTitle: "Estrategia de marketing y gestión digital empresarial | Digimedia Marketing",
      imageAlt: "Equipo analizando métricas y gráficos en reunión de estrategia de marketing y gestión digital",
    },
  };

  const featuresuxui = [
    {
      icon: (
        <Image
          // src="/servicios/marketing_gestion_digital/identidad_visual/icons/identidad-visual_card1-IVC.webp"
          src="/servicios/marketing_gestion_digital/identidad_visual/icons/concepto-creativo-identidad-visual-digimedia.webp"
          title= "Concepto creativo e identidad visual | Digimedia Marketing"
          alt=" Ícono de bombilla representando concepto creativo y desarrollo de identidad visual"
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      ),
      title: 'IVC',
      description:
        'A través de ella comunicaremos su personalidad, valores y propuesta de valor, estableciendo un posicionamiento claro y distintivo en la mente de sus clientes.',
    },
  ];

  return (
    <div>
      <ServicePopup idSubservicio={11} />
      <ModalScroll data={modales} />
      <ModalButton
        title="¡EXPLOTA EL CONTENIDO DE TUS REDES!"
        fondo="/servicios/marketing/modal-button/inicio-sesion-cuenta-plataforma-digital.webp"
        text="MARKETING Y GESTIÓN DIGITAL"
        serviceName="3"
        imageTitle="Inicio de sesión en plataforma digital | Acceso seguro"
        imageAlt="Ilustración de usuarios accediendo a una plataforma digital mediante inicio de sesión con usuario y contraseña."
      />

      <UxUiSection
        features={featuresuxui}
        mainDescription="Desarrollamos la manifestación visual de su marca, creando un sistema gráfico coherente que incluye logotipos, colores y tipografías. Esta identidad estratégica asegura el reconocimiento, la diferenciación y el posicionamiento de su empresa en el mercado."
        backgroundImage="/servicios/DisenoUI/identidad-visual-y-corporativa.webp"
        heroTitle=<>
          IDENTIDAD VISUAL <br />Y CORPORATIVA
        </>
        category="Marketing y gestión digital"
        // heroBulletPoints={
        //   [
        //     // 'LA IVC AYUDA A QUE LA MARCA SEA FÁCILMENTE RECONOCIBLE Y DIFERENCIADA DE LA COMPETENCIA.',
        //     // 'PERMITE MANTENER UNA IMAGEN COHERENTE EN TODOS LOS SOPORTES DE COMUNICACIÓN.',
        //     // 'PERMITE QUE LA EMPRESA SE DESTAQUE EN EL MERCADO Y SEA PERCIBIDA DE MANERA ÚNICA.',
        //   ]
        // }
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </div>
  );
}
