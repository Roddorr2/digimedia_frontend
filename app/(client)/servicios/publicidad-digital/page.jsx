'use client';
import React from 'react';

import Contactanos from '../components/Contactanos';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"


export default function DisenoPauta() {
    const features = [
    {
      icon: <img src="/servicios/gestion/diseno-pautas/icons/publicidad_icon.webp" alt="Planificación" className="w-full h-full object-contain" />,
      title: "PUBLICIDAD",
      description:
        'ES UNA FORMA DE MARKETING QUE UTILIZA CANALES EN LÍNEA PARA LLEGAR A UN PÚBLICO OBJETIVO Y PROMOCIONAR PRODUCTOS O SERVICIOS.',
    },
  ]
  
  return (

   <div>
      <UxUiSection 
      features={features} 
      mainDescription='LA PUBLICIDAD DIGITAL PERMITE A LAS EMPRESAS DIRIGIRSE A UN PÚBLICO ESPECÍFICO, MEDIR EL RENDIMIENTO DE LAS CAMPAÑAS EN TIEMPO REAL Y AJUSTAR LAS ESTRATEGIAS PARA OPTIMIZAR LOS RESULTADOS.'
      backgroundImage='/servicios/gestion/diseno-pautas/publicidad_digital1.png'
      heroTitle="PUBLICIDAD DIGITAL"
      heroBulletPoints={[
        "PERMITE LLEGAR A AUDIENCIAS EN TODO EL MUNDO, SIN IMPORTAR LA UBICACIÓN GEOGRÁFICA.",
        "PERMITE DIRIGIR LOS MENSAJES A GRUPOS ESPECÍFICOS DE PERSONAS CON INTERESES Y COMPORTAMIENTOS SIMILARES.",
        "PUEDE GENERAR UN MAYOR NÚMERO DE LEADS Y VENTAS, ESPECIALMENTE CUANDO SE IMPLEMENTA UNA ESTRATEGIA DE MARKETING DIGITAL EFECTIVA."
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