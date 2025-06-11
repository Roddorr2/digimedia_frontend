
import Contactanos from '../components/Contactanos';
import './globals.css';
import { UxUiSection } from "../components/uxui-section"
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react"

export default function UXUI() {

    const featuresuxui = [
    {
      icon: <MonitorIcon className="w-full h-full stroke-1" />,
      title: "DOMINIO",
      description:
        "ES COMO LA DIRECCIÓN DE TU CASA EN INTERNET. ES EL NOMBRE ÚNICO Y FÁCIL DE RECORDAR QUE LA GENTE ESCRIBE EN SU NAVEGADOR PARA ENCONTRAR TU SITIO WEB (POR EJEMPLO, [WWW.TUNOMBRE.COM](http://WWW.TUNOMBRE.COM)).",
    },
    {
      icon: <Smartphone className="w-full h-full stroke-1" />,
      title: "HOSTING",
      description:
        "ES EL TERRENO DONDE CONSTRUYES TU CASA Y DONDE GUARDAS TODAS TUS COSAS (LOS ARCHIVOS DE TU SITIO WEB: TEXTOS, IMÁGENES, VIDEOS, ETC.). ES UN ESPACIO EN UN SERVIDOR (UNA COMPUTADORA POTENTE CONECTADA A INTERNET) QUE ALQUILAS PARA QUE TU SITIO WEB ESTÉ ACCESIBLE LAS 24 HORAS DEL DÍA.",
    },
  ]
  
  return (

   <div>
      <UxUiSection 
      features={featuresuxui} 
      mainDescription='EL DOMINIO ES TU DIRECCIÓN ÚNICA Y TU IDENTIDAD EN INTERNET, FACILITANDO QUE LOS USUARIOS TE ENCUENTREN Y FORTALECIENDO TU MARCA. EL HOSTING ES LA INFRAESTRUCTURA ESENCIAL QUE PERMITE QUE TU SITIO WEB EXISTA, ESTÉ DISPONIBLE Y FUNCIONE CORRECTAMENTE EN LA WEB. AMBOS SON PILARES FUNDAMENTALES PARA CUALQUIER PRESENCIA ONLINE EXITOSA.'
      backgroundImage='/servicios/DiseñoUI/dominio_hosting.jpg'
      heroTitle="DOMINIO Y HOSTING"
      heroBulletPoints={[
        "TE DAN UNA PRESENCIA ONLINE COMPLETA Y PROFESIONAL, GENERAN CONFIANZA, TE DAN CONTROL, AUMENTAN TU VISIBILIDAD Y SON LA BASE PARA CRECER EN INTERNET."
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


