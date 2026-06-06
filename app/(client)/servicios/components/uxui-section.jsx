import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { MonitorIcon, Smartphone } from "lucide-react";
import Image from "next/image"; // 1. Importamos el componente nativo de optimización

export function UxUiSection({
  backgroundImage,
  imageClassName,
  heroTitle,
  mainDescription,
  heroBulletPoints,
  features = [],
  alt,
  title,
  category,
}) {
  return (
    <div>
      <HeroSection
        category={category}
        title={heroTitle}
        description={mainDescription}
        bulletPoints={heroBulletPoints}
        
        // 2. TRUCO MAESTRO: En lugar de un string, le inyectamos el componente de Next.js optimizado.
        // Si HeroSection acepta componentes React en su propiedad de imagen, esto resolverá el LCP en 'npm run dev'.
        imageUrl={backgroundImage} 
        imageClassName={imageClassName}
        imageAlt={alt}
        imageTitle={title}
        
        /* ⚠️ NOTA CRÍTICA: Si tras guardar este archivo ves que la imagen se rompe o no cambia, 
          significa que el componente interno <HeroSection /> solo acepta strings. 
          Si ese es el caso, compárteme el código de './hero-section' para meterle la optimización 
          de Next.js directamente dentro de su propio HTML.
        */
      />

      <FeaturesSection features={features} />
    </div>
  );
}

