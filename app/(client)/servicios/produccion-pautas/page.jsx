"use client";
import Contactanos from '../components/Contactanos';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"

export default function ProduccionPautas() {
    const features = [
        {
        icon: <img src="/servicios/gestion/produccion-pautas/icons/first.webp" alt="Diseño de pautas" className="w-full h-full object-contain" />,
        title: "Diseño de pautas",
        description:
            "El diseño de pautas se enfoca principalmente en la parte visual y comunicacional del anuncio. Aquí se busca que la pieza tenga un impacto visual fuerte, que sea coherente con la identidad de marca y que transmita el mensaje de forma clara y atractiva para el público objetivo.",
        },
        {
        icon: <img src="/servicios/gestion/produccion-pautas/icons/second.webp" alt="Producción de pautas" className="w-full h-full object-contain" />,
        title: "Producción de pautas",
        description:
            "La producción de pautas tiene un enfoque más integral y operativo. No solo incluye la parte visual, sino también la planificación estratégica, edición técnica, adaptación a formatos, y preparación de archivos finales para que el anuncio esté listo para su publicación.",
        },
    ]
    
    return (
        <div>
            <UxUiSection 
            features={features} 
            mainDescription='Es el desarrollo de todos los elementos necesarios para ejecutar una campaña publicitaria en redes sociales. Implica tanto la parte creativa como la técnica para que los anuncios funcionen correctamente en las plataformas elegidas.'
            backgroundImage='/servicios/planificacion/produccion_pautas_principal.webp'
            heroTitle="PRODUCCIÓN DE PAUTAS"
            heroBulletPoints={[
            "Crear contenidos listos para ser promocionados.",
            "Asegurar que los anuncios sean visualmente atractivos y técnicamente óptimos.",
            "Maximizar el rendimiento de las campañas en redes sociales.",
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
