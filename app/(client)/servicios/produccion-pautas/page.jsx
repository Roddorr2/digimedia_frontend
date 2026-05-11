"use client";
import Contactanos from "../components/Contactanos";
import ModalScroll from "../components/ModalScroll";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";
import ModalButton from "../components/ModalButton";
import ServicePopup from "@/app/dashboard/whatsapp/components/ServicePopup";

export default function ProduccionPautas() {
  const modales = {
    modalA: {
      text: "GESTIÓN DE REDES SOCIALES",
      fondo:
        "/servicios/gestion/modal-scroll/gestion-redes-sociales-peru-digimedia.webp",
      title: "SOLO POR HOY ACCEDE A UNA ¡ASESORÍA GRATIS!",
      imageTitle: "Gestión de Redes Sociales en Perú | Digimedia",
      imageAlt:
        "Servicio de gestión de redes sociales en Perú ofrecido por Digimedia para crecimiento de marcas en Instagram, Facebook y TikTok",
      serviceName: "2",
    },
  };

  const features = [
    {
      icon: (
        <img
          src="/servicios/gestion/produccion-pautas/icons/diseno-estrategia-pautas-digitales-digimedia.webp"
          alt="Ícono de documentos con bombilla representando diseño estratégico de pautas y campañas digitales en Digimedia"
          title="Diseño estratégico de pautas digitales | Digimedia Marketing"
          className="w-full h-full object-contain"
        />
      ),
      title: "Conceptualización y guión",
      description:
        "Desarrollamos ideas creativas alineadas a la estrategia de contenido. Definimos mensaje, formato y enfoque para asegurar impacto desde los primeros segundos.",
    },
    {
      icon: (
        <img
          src="/servicios/gestion/produccion-pautas/icons/produccion-audiovisual_card-1-produccion-y-edicion.webp"
          alt="Producción y edición"
          title="Producción Audiovisual: Producción y Edición | Digimedia Marketing"
          className="w-full h-full object-contain"
        />
      ),
      title: "Producción y edición",
      description:
        "Realizamos grabación, edición y adaptación de piezas audiovisuales optimizadas para cada plataforma, priorizando dinamismo, claridad y engagement.",
    },
  ];

  return (
    <div>
      <ServicePopup idSubservicio={7} />
      <ModalScroll data={modales} />
      <ModalButton
        title="¡ELEVA TUS CAMPAÑAS A OTRO NIVEL!"
        fondo="/servicios/gestion/modal-button/marketing-digital-redes-sociales-peru-digimedia.webp"
        imageTitle="Marketing Digital y Redes Sociales en Perú | Digimedia"
        imageAlt="Ilustración de herramientas de marketing digital y gestión de redes sociales con iconos de interacción, análisis y contenido"
        text="GESTIÓN DE REDES SOCIALES"
        serviceName="2"
      />

      <UxUiSection
        features={features}
        mainDescription="Creamos contenido visual que capta atención y genera conexión. Desarrollamos piezas audiovisuales pensadas estratégicamente para redes sociales, combinando creatividad, narrativa y objetivos de marca."
        backgroundImage="/servicios/planificacion/produccion-audiovisual.webp"
        heroTitle=<>
          PRODUCCIÓN
          <br />
          AUDIOVISUAL
        </>
        alt="Producción de anuncios gráficos y textos publicitarios listos para campañas en Meta Ads y redes sociales."
        title="Producción creativa de pautas para campañas publicitarias – Digimedia"
        category="Gestión de redes sociales"
        // heroBulletPoints={[
        // "Crear contenidos listos para ser promocionados.",
        // "Asegurar que los anuncios sean visualmente atractivos y técnicamente óptimos.",
        // "Maximizar el rendimiento de las campañas en redes sociales.",
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
