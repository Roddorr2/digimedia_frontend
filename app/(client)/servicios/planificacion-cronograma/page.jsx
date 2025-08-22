"use client";
import Contactanos from '../components/Contactanos';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"

export default function PlanificacionCronograma() {
  const features = [
    {
      icon: <img src="/servicios/gestion/planificacion/icons/first.webp" alt="Tabla de apuntes" className="w-full h-full object-contain" />,
      title: "PLANIFICACIÓN",
      description:
        "La planificación es el proceso de definir qué se quiere lograr, cómo se va a lograr, cuándo se va a lograr y quién será responsable de cada tarea. Es como crear un mapa detallado antes de emprender un viaje.",
    },
    {
      icon: <img src="/servicios/gestion/planificacion/icons/second.webp" alt="Calendario" className="w-full h-full object-contain" />,
      title: "CRONOGRAMA",
      description:
        "Un cronograma es una herramienta que muestra la secuencia de las actividades necesarias para completar un proyecto, junto con sus fechas de inicio y fin estimadas. ",
    },
  ]
  
  return (

   <div>
      <UxUiSection 
      features={features} 
      mainDescription='Es el proceso de definir estrategias, objetivos, temáticas y tipos de contenido que se publicarán en las redes sociales. Esta etapa implica pensar a mediano y largo plazo para construir una presencia digital sólida.'
      backgroundImage='/servicios/gestion/planificacion/planificacion_principal.webp'
      heroTitle="PLANIFICACIÓN Y CRONOGRAMA"
      alt= "Planificación estratégica de contenido con cronogramas visuales para redes sociales y campañas digitales"
      title = "Organización de contenido y planificación digital con cronograma – Digimedia Marketing."
      heroBulletPoints={[
        "Aseguran coherencia y frecuencia constante en las publicaciones.",
        "Permiten optimizar recursos y evitar improvisaciones.",
        "Ayudan a evaluar resultados y hacer ajustes estratégicos.",
        "Facilitan el trabajo colaborativo entre equipos de diseño, redacción y marketing."
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
