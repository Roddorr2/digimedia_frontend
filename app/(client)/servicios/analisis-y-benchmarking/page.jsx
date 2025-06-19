"use client";
import Contactanos from '../components/Contactanos';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"

export default function ProduccionPautas() {
    const features = [
        {
        icon: <img src="/servicios/analisis_benchmarking/icons/analisis.webp" alt="Icono de una hoja y una lupa de color morado y fondo oscuro" className="w-full h-full object-contain" />,
        title: "ANALISIS",
        description:
            "AYUDA A COMPRENDER LA SITUACIÓN INTERNA Y EXTERNA DE LA EMPRESA PARA TOMAR DECISIONES ESTRATÉGICAS.",
        },
        {
        icon: <img src="/servicios/analisis_benchmarking/icons/benchmarking.webp" alt="Icono de una computadora con gráfico color morado y fondo oscuro" className="w-full h-full object-contain" />,
        title: "BENCHMARKING",
        description:
            "IDENTIFICA ÁREAS DE MEJORA, ESTABLECE OBJETIVOS REALISTAS Y DESARROLLA PLANES DE ACCIÓN PARA OPTIMIZAR LA EFICIENCIA, REDUCIR COSTOS Y MEJORAR LA SATISFACCIÓN DEL CLIENTE.",
        },
    ]
    
    return (
        <div>
            <UxUiSection 
            features={features} 
            mainDescription='AL COMBINAR AMBOS ENFOQUES, LAS EMPRESAS PUEDEN LOGRAR UNA MEJORA CONTINUA Y UNA VENTAJA COMPETITIVA SOSTENIBLE.'
            backgroundImage='/servicios/analisis_benchmarking/analisis_benchmarking_principal.webp'
            heroTitle="ANALISIS Y BENCHMARKING"
            heroBulletPoints={[
            "IDENTIFICACIÓN DE ÁREAS DE MEJORA Y ESTABLECIMIENTO DE OBJETIVOS REALISTAS.",
            "IDENTIFICACIÓN DE PROCESOS INEFICIENTES Y OPORTUNIDADES DE OPTIMIZACIÓN.",
            "APRENDIZAJE DE LAS MEJORES PRÁCTICAS PARA MEJORAR LA CALIDAD DE PRODUCTOS Y SERVICIOS.",
            "ADOPCIÓN DE ESTRATEGIAS Y PRÁCTICAS QUE PERMITEN DIFERENCIARSE DE LA COMPETENCIA.",
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
