import Image from "next/image";
import Contactanos from "../components/Contactanos";
import { UxUiSection } from "../components/uxui-section";
import { MonitorIcon, Smartphone, PenTool, Layers } from "lucide-react";

export default function UXUI() {
  const featuresuxui = [
    {
      icon: (
        <Image
          src="/servicios/dominio_hosting/dominio.webp"
          alt="Icono de busqueda en la web y una lupa"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: "DOMINIO",
      description:
        "ES COMO LA DIRECCIÓN DE TU CASA EN INTERNET. ES EL NOMBRE ÚNICO Y FÁCIL DE RECORDAR QUE LA GENTE ESCRIBE EN SU NAVEGADOR PARA ENCONTRAR TU SITIO WEB (POR EJEMPLO, [WWW.TUNOMBRE.COM](http://WWW.TUNOMBRE.COM)).",
    },
    {
      icon: (
        <Image
          src="/servicios/dominio_hosting/hosting.webp"
          alt="Icono de un servidor en la nube"
          className="w-full h-full stroke-1"
          width={100}
          height={100}
        />
      ),
      title: "HOSTING",
      description:
        "ES EL TERRENO DONDE CONSTRUYES TU CASA Y DONDE GUARDAS TODAS TUS COSAS (LOS ARCHIVOS DE TU SITIO WEB: TEXTOS, IMÁGENES, VIDEOS, ETC.). ES UN ESPACIO EN UN SERVIDOR (UNA COMPUTADORA POTENTE CONECTADA A INTERNET) QUE ALQUILAS PARA QUE TU SITIO WEB ESTÉ ACCESIBLE LAS 24 HORAS DEL DÍA.",
    },
  ];

  return (
    <div>
      <UxUiSection
        features={featuresuxui}
        mainDescription="EL DOMINIO ES TU DIRECCIÓN ÚNICA Y TU IDENTIDAD EN INTERNET, FACILITANDO QUE LOS USUARIOS TE ENCUENTREN Y FORTALECIENDO TU MARCA. EL HOSTING ES LA INFRAESTRUCTURA ESENCIAL QUE PERMITE QUE TU SITIO WEB EXISTA, ESTÉ DISPONIBLE Y FUNCIONE CORRECTAMENTE EN LA WEB. AMBOS SON PILARES FUNDAMENTALES PARA CUALQUIER PRESENCIA ONLINE EXITOSA."
        backgroundImage="/servicios/dominio_hosting/dominio_hosting_principal.webp"
        heroTitle="DOMINIO Y HOSTING"
        alt="Dominio web, hosting profesional, hosting optimizado, alojamiento web, servidor seguro, mantenimiento web, seguridad web"
        title="Diseño y desarrollo web, Dominio y Hosting, Digimedia.webp"
        heroBulletPoints={[
          "TE DAN UNA PRESENCIA ONLINE COMPLETA Y PROFESIONAL, GENERAN CONFIANZA, TE DAN CONTROL, AUMENTAN TU VISIBILIDAD Y SON LA BASE PARA CRECER EN INTERNET.",
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
