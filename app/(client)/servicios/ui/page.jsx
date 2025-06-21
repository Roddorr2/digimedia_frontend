'use client';
import Contactanos from '../components/Contactanos';
import './globals.css';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function UXUIPageWrapper() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando...</div>}>
      <UXUI />
    </Suspense>
  );
}

export default function UXUI() {

    const searchParams = useSearchParams();
    const from = searchParams.get('from');

    const backgroundImages = {
      disenoDesarrollo: '/servicios/DisenoUI/background_ui.svg',
      gestionRedes: '/servicios/DisenoUI/diseno_principal.webp',
    }

    const backgroundImage = backgroundImages[from] || '/servicios/DisenoUI/background_ui.svg'

    const featuresuxui = [
    {
      icon: <img src="/servicios/DisenoUI/icons/UX.webp" alt="Web con diseño UX" className="w-full h-full object-contain" />,
      title: "Diseño de pautas",
      title: "UX",
      description:
        "EL DISEÑO UX (EXPERIENCIA DE USUARIO) SE CENTRA EN ENTENDER A LAS PERSONAS QUE USARÁN UN PRODUCTO DIGITAL (WEB, APP, ETC.) PARA CREAR UNA EXPERIENCIA EFECTIVA, INTUITIVA Y SATISFACTORIA. INVESTIGA SUS NECESIDADES, COMPORTAMIENTOS Y FRUSTRACIONES PARA DEFINIR LA ESTRUCTURA Y LA FUNCIONALIDAD DEL PRODUCTO.",
    },
    {
      icon: <img src="/servicios/DisenoUI/icons/UI.webp" alt="Web con diseño UI" className="w-full h-full object-contain" />,
      title: "UI",
      description:
        "EL DISEÑO UI (INTERFAZ DE USUARIO) SE ENCARGA DE LA PARTE VISUAL, CREANDO UNA INTERFAZ ATRACTIVA, COHERENTE Y FÁCIL DE NAVEGAR. UTILIZA ELEMENTOS COMO COLORES, TIPOGRAFÍA E IMÁGENES PARA COMUNICAR LA MARCA Y GUIAR AL USUARIO DE MANERA EFICIENTE.",
    },
  ]
  
  return (

   <div>
      <UxUiSection 
      features={featuresuxui} 
      mainDescription='EL DISEÑO UX SE PREOCUPA POR LA EXPERIENCIA GLOBAL DEL USUARIO, MIENTRAS QUE EL DISEÑO UI SE ENFOCA EN LOS DETALLES VISUALES DE LA INTERFAZ. AMBOS TRABAJAN JUNTOS PARA CREAR PRODUCTOS DIGITALES EXITOSOS.'
      backgroundImage={backgroundImage}
      heroTitle="DISEÑO UX Y UI"
      heroBulletPoints={[
        "MAYOR SATISFACCIÓN DEL USUARIO: UN DISEÑO INTUITIVO Y AGRADABLE HACE QUE LOS USUARIOS DISFRUTEN USANDO EL PRODUCTO O SERVICIO.",
        "AUMENTO DE LA USABILIDAD: FACILITA LA NAVEGACIÓN Y LA REALIZACIÓN DE TAREAS, REDUCIENDO LA FRUSTRACIÓN.",
        "MEJORA DE LA ACCESIBILIDAD: PERMITE QUE PERSONAS CON DIVERSAS CAPACIDADES PUEDAN UTILIZAR EL PRODUCTO O SERVICIO.",
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