'use client';
import React from 'react';

import Contactanos from '../components/Contactanos';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"


export default function DisenoPauta() {
    const features = [
    {
      icon: <img src="/servicios/gestion/diseno-pautas/icons/first.webp" alt="Icono de una hoja con un lápiz" className="w-full h-full object-contain" />,
      title: "PLANIFICACIÓN",
      description:
        'En el área de Gestión de Redes Sociales, el término "Diseño de pautas" se refiere a la creación visual y estratégica de los anuncios pagados (también llamados "pautas publicitarias")',
    },
  ]
  
  return (

   <div>
      <UxUiSection 
      features={features} 
      mainDescription='Es el proceso de crear piezas gráficas o audiovisuales atractivas y efectivas que serán utilizadas en campañas de publicidad digital. Estas piezas están dirigidas a públicos segmentados y tienen un objetivo específico.'
      backgroundImage='/servicios/gestion/diseno-pautas/Diseno-de-Pautas---Digimedia.webp'
      heroTitle="DISEÑO DE PAUTAS"
      alt="Gestión de redes sociales, Diseño de pautas, Publicidad digital, Estrategia en redes, Social media marketing, Meta Ads, Facebook Ads, Anuncios para Instagram, Marketing digital, Community manager"
      title="Gestión de redes sociales, diseño de pautas, Digimedia.webp"
      heroBulletPoints={[
        "Las pautas bien diseñadas incrementan el rendimiento de la inversión publicitaria.",
        "Son clave para posicionar productos, servicios o marcas en mercados competitivos.",
        "Permiten medir resultados y ajustar campañas en tiempo real.",
        "Atraer la atención del público objetivo rápidamente."
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