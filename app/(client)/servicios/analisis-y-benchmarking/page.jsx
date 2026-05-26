"use client";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";


export default function AnalisisBenchmarking() {
  const features = [
    {
      icon: (
        <img
          src="/servicios/marketing_gestion_digital/analisis_benchmarking/icons/analisis-y-benchmarking-card1-analisis.webp"
          alt="Icono de una hoja y una lupa de color morado y fondo oscuro"
          title="Análisis y Benchmarking Análisis"
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
          src="/servicios/marketing_gestion_digital/analisis_benchmarking/icons/analisis-y-benchmarking-card2-benchmarking.webp"
          alt="Icono de una computadora con gráfico color morado y fondo oscuro"
          title="Análisis y Benchmarking Benchmarking"
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
      {/*Servicio: Marketing y Gestión Digital, Subservicio: Análisis y Benchmarking*/}

      <UxUiSection
        features={features}
        mainDescription="En un mercado saturado, la intuición no es suficiente. Auditamos su posición actual y analizamos las tácticas de los líderes del sector para identificar brechas de oportunidad que su competencia está ignorando. Minimizamos el riesgo comercial basando cada decisión en métricas reales."
        backgroundImage="/servicios/analisis_benchmarking/analisis-benchmarking-competencia-digital-digimedia.webp"
        heroTitle="ANALISIS Y BENCHMARKING"
        alt="Profesional analizando métricas y gráficos de rendimiento para estudio de competencia y benchmarking digital"
        title="Análisis y Benchmarking Digital de Competencia | Digimedia Marketing"
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
        iconLeft="/servicios/desarrollo/lineas-conexion-izquierda.webp"
        iconRight="/servicios/desarrollo/lineas-conexion-derecha.webp"
      />
    </div>
  );
}
