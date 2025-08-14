
import Contactanos from '../components/Contactanos';
import { UxUiSection } from "../components/uxui-section"

export default function UXUI() {

    const featuresuxui = [
  
    {
        icon: <img src="/servicios/naming-logo-slogan/naming.webp" alt="Icono de una tarjeta y firma con lápiz" className="w-full h-full object-contain" />,
        title: "NAMING",
        description:
        "EL NAMING ES EL PROCESO DE CREAR Y SELECCIONAR EL NOMBRE DE UNA MARCA, PRODUCTO, SERVICIO O PROYECTO.",
    },

    {
        icon: <img src="/servicios/naming-logo-slogan/logo.webp" alt="Icono de un logotipo" className="w-full h-full object-contain" />,
        title: "LOGO",
        description:
        "EL LOGO ES UN SÍMBOLO GRÁFICO COMPUESTO POR PALABRAS, IMÁGENES, COLORES O UNA COMBINACIÓN DE ELLOS, QUE SE UTILIZA PARA IDENTIFICAR UNA MARCA O UN PRODUCTO.",
    },

    {
        icon: <img src="/servicios/naming-logo-slogan/slogan.webp" alt="Icono de un cartel" className="w-full h-full object-contain" />,
        title: "SLOGAN",
        description:
        "EL ESLOGAN (O SLOGAN EN INGLÉS) ES UNA FRASE CORTA Y PEGADIZA QUE SE UTILIZA PARA IDENTIFICAR UN PRODUCTO, SERVICIO O EMPRESA, BUSCANDO RESALTAR SUS BENEFICIOS, SU ESENCIA O UN MENSAJE CLAVE.",
    },
    
    
  ]
  
  return (

   <div>
      <UxUiSection 
      features={featuresuxui} 
      mainDescription='EL NAMING, EL LOGO Y EL ESLOGAN SON ELEMENTOS FUNDAMENTALES DE LA IDENTIDAD DE UNA MARCA. CADA UNO CUMPLE UN ROL ESPECÍFICO, PERO JUNTOS CONSTRUYEN LA PERCEPCIÓN Y EL RECONOCIMIENTO DE UNA EMPRESA, PRODUCTO O SERVICIO EN LA MENTE DEL PÚBLICO.'
      backgroundImage='/servicios/DisenoUI/branding4.webp'
      heroTitle="NAMING, LOGO Y SLOGAN"
      heroBulletPoints={[]}
      alt="Naming, logo, slogan, piezas gráficas, redes sociales, aplicaciones digitales, señalética, merchandising, lenguaje visual, tono y voz de marca"
      title= "Branding y diseño, Manual de marca, Digimedia.webp"
      />
      <Contactanos
        text="Consolida tu presencia web, diseña con nosotros tu página web"
        iconLeft="/servicios/desarrollo/icon-left.svg"
        iconRight="/servicios/desarrollo/icon-right.svg"
      /> 
   </div>
   
  );
}


