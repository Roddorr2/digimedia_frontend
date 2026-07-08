import Image from "next/image";

// Imagen provisional del Hero — Marketing entregará la imagen definitiva
// ("reunión de trabajo") más adelante. Reemplazar solo esta constante.
const HERO_IMAGE = "/contactanos/banner.webp";

const ContactHero = () => (
  <section className="relative w-full h-[320px] sm:h-[380px] md:h-[460px] lg:h-[559px] overflow-hidden">
    <Image
      src={HERO_IMAGE}
      alt="Equipo de DigiMedia trabajando en una reunión"
      fill
      priority
      className="object-cover"
      sizes="100vw"
    />
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,1,24,0.55) 0%, rgba(65,12,137,0.6) 55%, rgba(0,1,24,0.85) 100%)",
      }}
    />
    <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
      <h1
        className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white"
        style={{ fontSize: "clamp(2.125rem, 4vw + 1.5rem, 4.375rem)", lineHeight: 1.1 }}
      >
        CONTÁCTANOS AHORA
      </h1>
    </div>
  </section>
);

export default ContactHero;
