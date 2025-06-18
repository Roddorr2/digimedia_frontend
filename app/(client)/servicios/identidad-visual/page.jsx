
import Contactanos from '../components/Contactanos';
import '../ui/globals.css';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"

export default function UXUI() {

    const featuresuxui = [
    {
      icon: <MonitorIcon className="w-full h-full stroke-1" />,
      title: "IVC",
      description:
        "ES LA CARA VISIBLE DE LA MARCA, QUE AYUDA A COMUNICAR SU PERSONALIDAD, VALORES Y POSICIONAMIENTO EN EL MERCADO.",
    },
    
  ]
  
  return (

   <div>
      <UxUiSection 
      features={featuresuxui} 
      mainDescription='ES LAMANIFESTACIÓN VISUAL DE LA IDENTIDAD DE UNA EMPRESA, UTILIZANDO ELEMENTOS COMO LOGOTIPOS, COLORES, TIPOGRAFÍAS Y ESTILOS GRÁFICOS PARA CREAR UNA IMAGEN COHERENTE Y RECONOCIBLE.'
      backgroundImage='/servicios/DiseñoUI/branding2.jpg'
      heroTitle="IDENTIDAD VISUAL Y CORPORTIVA"
      heroBulletPoints={[
        "LA IVC AYUDA A QUE LA MARCA SEA FÁCILMENTE RECONOCIBLE Y DIFERENCIADA DE LA COMPETENCIA.",
        "PERMITE MANTENER UNA IMAGEN COHERENTE EN TODOS LOS SOPORTES DE COMUNICACIÓN.",
        "PERMITE QUE LA EMPRESA SE DESTAQUE EN EL MERCADO Y SEA PERCIBIDA DE MANERA ÚNICA.",
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


