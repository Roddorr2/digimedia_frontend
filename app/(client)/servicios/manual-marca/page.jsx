
import Contactanos from '../components/Contactanos';
import '../ui/globals.css';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"

export default function UXUI() {

    const featuresuxui = [
      {
        icon: <MonitorIcon className="w-full h-full stroke-1" />,
        title: "LOGOTIPO",
        description:
        "INCLUYE DIFERENTES VARIANTES DEL LOGOTIPO, COMO VERSIONES CON Y SIN TEXTO, Y PAUTAS SOBRE CÓMO Y DÓNDE USAR CADA UNA.",
    },

    {
        icon: <MonitorIcon className="w-full h-full stroke-1" />,
        title: "PALETA DE COLOR",
        description:
        "DEFINICIÓN DE LOS COLORES PRIMARIOS Y SECUNDARIOS DE LA MARCA, INCLUYENDO SUS CÓDIGOS RGB, CMYK Y PANTONE PARA FACILITAR SU USO EN DIFERENTES SOPORTES.",
    },

    {
        icon: <MonitorIcon className="w-full h-full stroke-1" />,
        title: "TIPOGRAFÍAS",
        description:
        "SELECCIÓN DE FUENTES DE LETRA PRINCIPALES Y SECUNDARIAS, INCLUYENDO EJEMPLOS DE CÓMO USARLAS EN DIFERENTES TAMAÑOS Y ESTILOS PARA TITULARES Y CUERPOS DE TEXTO.",
    },
    
  ]
  
  return (

   <div>
      <UxUiSection 
      features={featuresuxui} 
      mainDescription='UN MANUAL DE MARCA ES UN DOCUMENTO QUE ESTABLECE LAS REGLAS Y DIRECTRICES PARA USAR CORRECTAMENTE LA IDENTIDAD VISUAL Y VERBAL DE UNA MARCA. SIRVE PARA MANTENER LA COHERENCIA EN TODAS LAS COMUNICACIONES, TANTO INTERNAS COMO EXTERNAS, Y ASEGURAR QUE LA MARCA SE VEA, SE SIENTA Y SE COMUNIQUE DE LA MISMA FORMA, SIN IMPORTAR QUIÉN LA USE O DÓNDE SE APLIQUE.'
      backgroundImage='/servicios/DiseñoUI/branding4.jpg'
      heroTitle="MANUAL DE MARCA"
      heroBulletPoints={[ ]}

      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      /> 
   </div>
   
  );
}


