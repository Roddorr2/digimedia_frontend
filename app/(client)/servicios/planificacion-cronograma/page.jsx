"use client";
import Image from "next/image";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import WhatsAppButton from "../../components/WhatsAppButton";
import MayaChatbot from "../../components/Chatbot";

export default function EstrategiaContenido() {
  const features = [
    {
      icon: (
        <Image
          src="/servicios/gestion/planificacion/icons/tabla-apuntes-planificacion-estrategia-digital-digimedia.webp"
          alt="Ícono de tabla de apuntes con checklist representando planificación y gestión de estrategia de marketing digital en Digimedia"
          title="Tabla de apuntes para planificación de estrategia digital | Digimedia Marketing"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: "PLANIFICACIÓN",
      description:
        "Definimos pilares de contenido, formatos, tono de comunicación y objetivos claros. Establecemos KPIs y una estructura estratégica que guía cada publicación.",
    },
    {
      icon: (
        <Image
          src="/servicios/gestion/planificacion/icons/calendario-planificacion-contenido-redes-sociales-digimedia.webp"
          alt="Ícono de calendario representando planificación y programación de contenido para redes sociales y marketing digital en Digimedia"
          title="Calendario de planificación de contenido para redes sociales | Digimedia Marketing"
          className="w-full h-full object-contain"
          width={200}
          height={150}
        />
      ),
      title: "CRONOGRAMA",
      description:
        "Organizamos el calendario de contenidos para asegurar coherencia, frecuencia y presencia constante en redes sociales, optimizando cada momento clave de interacción.",
    },
  ];

  return (
    <div>
      {/* Servicio: Gestión de Redes Sociales, Subservicio: Estrategia de Contenido */}

      <UxUiSection
        features={features}
        mainDescription="Transformamos ideas en planes accionables. Diseñamos estrategias de contenido alineadas a los objetivos de marca, identificando oportunidades, definiendo pilares y construyendo una narrativa coherente que conecte con la audiencia correcta."
        backgroundImage="/servicios/gestion/planificacion/estrategia-de-contenido.webp"
        heroTitle=<>
          {" "}
          ESTRATEGIA DE <br /> CONTENIDO
        </>
        alt="Planificación estratégica de contenido con cronogramas visuales para redes sociales y campañas digitales"
        title="Organización de contenido y planificación digital con cronograma – Digimedia Marketing."
        category="Gestión de redes sociales"
        // heroBulletPoints={[
        //   "Aseguran coherencia y frecuencia constante en las publicaciones.",
        //   "Permiten optimizar recursos y evitar improvisaciones.",
        //   "Ayudan a evaluar resultados y hacer ajustes estratégicos.",
        //   "Facilitan el trabajo colaborativo entre equipos de diseño, redacción y marketing."
        // ]}
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
      <WhatsAppButton />
      <MayaChatbot />
    </div>
  );
}
