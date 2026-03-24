import { HeroSection } from './hero-section';
import { FeaturesSection } from './features-section';
import { MonitorIcon, Smartphone } from 'lucide-react';

export function UxUiSection({
  // backgroundImage = "/servicios/DiseñoUI/background_ui.svg",
  // heroTitle = "DISEÑO UX Y UI",
  // mainDescription = "El diseño centrado en el usuario es fundamental para crear experiencias digitales exitosas:",
  // heroBulletPoints = [
  //   "EL DISEÑO UX SE PREOCUPA POR LA EXPERIENCIA DEL USUARIO, CENTRÁNDOSE EN LA USABILIDAD Y SE ENFOCA EN LOS DETALLES VISUALES DE LA INTERFAZ DIGITAL, DISEÑADA PARA CREAR PRODUCTOS ATRACTIVOS.",
  //   "MAYOR SATISFACCIÓN DEL USUARIO: UN DISEÑO INTUITIVO Y AGRADABLE HACE QUE LOS USUARIOS DISFRUTEN USANDO EL PRODUCTO O SERVICIO.",
  //   "AUMENTO DE LA USABILIDAD: FACILITA LA NAVEGACIÓN Y EL USO DEL PRODUCTO, REDUCIENDO LA FRUSTRACIÓN.",
  //   "MAYOR RETENCIÓN DE USUARIOS: PERMITE QUE PERSONAS CON DIVERSAS CAPACIDADES PUEDAN UTILIZAR EL PRODUCTO O SERVICIO.",
  // ],
  // features = [
  //   {
  //     icon: <MonitorIcon className="w-full h-full stroke-1" />,
  //     title: "UX",
  //     description:
  //       "EL DISEÑO UX (EXPERIENCIA DE USUARIO) SE ENFOCA EN LA EXPERIENCIA GENERAL AL USAR UN PRODUCTO DIGITAL. MIDE Y ESTUDIA CÓMO UNA EXPERIENCIA HACE SENTIR AL USUARIO Y QUÉ TAN INTUITIVA ES, COMPRENDIENDO SUS NECESIDADES PARA OPTIMIZAR LA ESTRUCTURA Y LA FUNCIONALIDAD DEL PRODUCTO.",
  //   },
  //   {
  //     icon: <Smartphone className="w-full h-full stroke-1" />,
  //     title: "UI",
  //     description:
  //       "EL DISEÑO UI (INTERFAZ DE USUARIO) SE ENCARGA DE CREAR Y DESARROLLAR UNA INTERFAZ ATRACTIVA, COHERENTE Y FÁCIL DE NAVEGAR. UTILIZA ELEMENTOS VISUALES COMO BOTONES E ICONOS PARA COMUNICAR LA MARCA Y GUIAR AL USUARIO DE MANERA EFICIENTE.",
  //   },
  // ],
  backgroundImage,
  imageClassName,
  heroTitle,
  mainDescription,
  heroBulletPoints,
  features = [],
  alt,
  imageTitle,
  category,
}) {
  return (
    <div>
      <HeroSection
        category={category}
        title={heroTitle}
        description={mainDescription}
        bulletPoints={heroBulletPoints}
        imageUrl={backgroundImage}
        imageClassName={imageClassName}
        imageAlt={alt}
        imageTitle={imageTitle}
      />

      <FeaturesSection features={features} />
    </div>
  );
}
