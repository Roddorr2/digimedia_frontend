'use client';
import Contactanos from '../components/Contactanos';
import './globals.css';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"
import { useSearchParams } from 'next/navigation';

export default function UXUI() {

    const searchParams = useSearchParams();
    const from = searchParams.get('from');

    const backgroundImages = {
      disenoDesarrollo: '/servicios/DiseñoUI/background_ui.svg',
      gestionRedes: '/servicios/DiseñoUI/background_ui_2.jpg',
    }

    const backgroundImage = backgroundImages[from]

    const featuresuxui = [
    {
      icon: <img src="/servicios/DiseñoUI/icons/UX.webp" alt="UX" className="w-full h-full object-contain" />,
      title: "Diseño de pautas",
      title: "UX",
      description:
        "EL DISEÑO UX (EXPERIENCIA DE USUARIO) SE ENFOCA EN LA EXPERIENCIA GENERAL AL USAR UN PRODUCTO DIGITAL. MIDE Y ESTUDIA CÓMO UNA EXPERIENCIA HACE SENTIR AL USUARIO Y QUÉ TAN INTUITIVA ES.",
    },
    {
      icon: <img src="/servicios/DiseñoUI/icons/UI.webp" alt="UI" className="w-full h-full object-contain" />,
      title: "UI",
      description:
        "EL DISEÑO UI (INTERFAZ DE USUARIO) SE ENCARGA DE CREAR Y DESARROLLAR UNA INTERFAZ ATRACTIVA, COHERENTE Y FÁCIL DE NAVEGAR.",
    },
  ]
  
  return (

   <div>
      <UxUiSection 
      features={featuresuxui} 
      mainDescription='EL DISEÑO UX SE PREOCUPA POR LA EXPERIENCIA DEL USUARIO, CENTRÁNDOSE EN LA USABILIDAD Y SE ENFOCA EN LOS DETALLES VISUALES DE LA INTERFAZ DIGITAL, DISEÑADA PARA CREAR PRODUCTOS ATRACTIVOS.'
      backgroundImage={backgroundImage}
      heroTitle="DISEÑO UX Y UI"
      heroBulletPoints={[
        "MAYOR SATISFACCIÓN DEL USUARIO: UN DISEÑO INTUITIVO Y AGRADABLE HACE QUE LOS USUARIOS DISFRUTEN USANDO EL PRODUCTO O SERVICIO.",
        "AUMENTO DE LA USABILIDAD: FACILITA LA NAVEGACIÓN Y EL USO DEL PRODUCTO, REDUCIENDO LA FRUSTRACIÓN.",
        "MAYOR RETENCIÓN DE USUARIOS: PERMITE QUE PERSONAS CON DIVERSAS CAPACIDADES PUEDAN UTILIZAR EL PRODUCTO O SERVICIO.",
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


