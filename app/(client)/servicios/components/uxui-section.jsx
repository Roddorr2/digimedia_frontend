import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";

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
        imageUrl={backgroundImage}
        imageClassName={imageClassName}
        imageAlt={alt}
        imageTitle={title}
      />

      <FeaturesSection features={features} />
    </div>
  );
}
