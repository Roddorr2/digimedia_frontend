"use client";
import Contactanos from '../components/Contactanos';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"

export default function ProduccionPautas() {
    const features = [
        {
        icon: <img src="/servicios/monitoreo_reporting/icons/monitoreo.webp" alt="Icono de una computadora y una lupa con un ojo" className="w-full h-full object-contain" />,
        title: "MONITOREO",
        description:
            "IMPLICA LA OBSERVACIÓN CONSTANTE DE INDICADORES CLAVE (KPI) Y LA RECOPILACIÓN DE DATOS RELEVANTES.",
        },
        {
        icon: <img src="/servicios/monitoreo_reporting/icons/reporting.webp" alt="Icono de un gráfico del rendimiento" className="w-full h-full object-contain" />,
        title: "REPORTING",
        description:
            "EL PROCESO DE PRESENTAR LA INFORMACIÓN RECOPILADA A TRAVÉS DE INFORMES, PRESENTACIONES O PANELES DE CONTROL.",
        },
    ]
    
    return (
        <div>
            <UxUiSection 
            features={features} 
            mainDescription='SON PROCESOS INTERRELACIONADOS QUE SE ENFOCAN EN LA RECOLECCIÓN, ANÁLISIS Y PRESENTACIÓN DE DATOS PARA EVALUAR EL RENDIMIENTO Y LA EFECTIVIDAD DE UN PROYECTO, PROGRAMA O ESTRATEGIA.'
            backgroundImage='/servicios/monitoreo_reporting/monitoreo_reporting_principal.webp'
            heroTitle="MONITOREO Y REPORTING"
            heroBulletPoints={[
            "PERMITE TOMAR DECISIONES INFORMADAS, IMPLEMENTAR MEDIDAS CORRECTIVAS Y OPTIMIZAR LA GESTIÓN DEL PROYECTO.",
            "FACILITA LA TOMA DE DECISIONES, LA COMUNICACIÓN DE LOS RESULTADOS Y LA MEJORA CONTINUA DEL PROCESO."
            ]}
            alt="Monitoreo de campañas, reporting digital, análisis de datos, seguimiento de métricas, visualización de informes, medición de resultados, dashboards, rendimiento digital, KPIs, optimización de estrategias, Digimedia"
            title="Monitoreo y reporting, gestión digital, agencia de marketing digimedia "
        />
        <Contactanos
            text="Consolida tu presencia web, diseña con nosotros tu página web"
            iconLeft="/servicios/desarrollo/icon-left.svg"
            iconRight="/servicios/desarrollo/icon-right.svg"
        /> 
     </div>
     
    );
}
