"use client";
import Contactanos from "../components/Contactanos";
import ModalScroll from "../components/ModalScroll";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";
import ModalButton from "../components/ModalButton";

export default function ProduccionPautas() {
  const modales = {
    modalA: {
      text: "MARKETING Y GESTIÓN DIGITAL",
      fondo: "/servicios/marketing/modal-scroll/marketingygestiondigital.jpg",
      title: "HAZLO Y CUMPLE TUS SUEÑOS ¡ASESORÍA GRATIS!",
      serviceName: "3",
    },
  };

  const features = [
    {
      icon: (
        <img
          src="/servicios/marketing_gestion_digital/analisis_benchmarking/icons/analisis blanco.png"
          alt="Icono de una hoja y una lupa de color morado y fondo oscuro"
          className="w-full h-full object-contain"
        />
      ),
      title: "ANALISIS",
      description:
        "Te ayudamos a comprender la situación interna y externa de la empresa para tomar decisiones estrategias",
    },
    {
      icon: (
        <img
          src="/servicios/marketing_gestion_digital/analisis_benchmarking/icons/benchmarking blanco.png"
          alt="Icono de una computadora con gráfico color morado y fondo oscuro"
          className="w-full h-full object-contain"
        />
      ),
      title: "BENCHMARKING",
      description:
        "Identificamos mejoras clave en las empresas para definir objetivos y acciones estrategicas.",
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
        features={features}
        mainDescription="En un mercado saturado, la intuición no es suficiente. Auditamos su posición actual y analizamos las tácticas de los líderes del sector para identificar brechas de oportunidad que su competencia está ignorando. Minimizamos el riesgo comercial basando cada decisión en métricas reales."
        backgroundImage="/servicios/analisis_benchmarking/analisis-y-benchmarking.webp"
        heroTitle="ANALISIS Y BENCHMARKING"
        alt="Marketing digital, Análisis de datos, Benchmarking, Estrategias de marketing, Comparación de métricas, Estudio de mercado, Optimización de resultados, Métricas de rendimiento, Informes de Marketing, Gestión digital"
        title="Marketing y gestión digital, análisis y benchmarking, Digimedia.webp"
        category="Marketing y gestión digital"
        // heroBulletPoints={[
        //   "IDENTIFICACIÓN DE ÁREAS DE MEJORA Y ESTABLECIMIENTO DE OBJETIVOS REALISTAS.",
        //   "IDENTIFICACIÓN DE PROCESOS INEFICIENTES Y OPORTUNIDADES DE OPTIMIZACIÓN.",
        //   "APRENDIZAJE DE LAS MEJORES PRÁCTICAS PARA MEJORAR LA CALIDAD DE PRODUCTOS Y SERVICIOS.",
        //   "ADOPCIÓN DE ESTRATEGIAS Y PRÁCTICAS QUE PERMITEN DIFERENCIARSE DE LA COMPETENCIA.",
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
