import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "DigiMedia - Naming Logo y Slogan",
  description:
    "El naming, el logo y el eslogan son elementos fundamentales de la identidad de una marca. Cada uno cumple un rol específico, pero juntos construyen la percepción y el reconocimiento de una empresa, producto o servicio en la mente del público.",
  openGraph: {
    title: "DigiMedia - Naming Logo y Slogan",
    description:
      "El naming, el logo y el eslogan son elementos fundamentales de la identidad de una marca. Cada uno cumple un rol específico, pero juntos construyen la percepción y el reconocimiento de una empresa, producto o servicio en la mente del público.",
    url: "https://digimedia-marketing.com/servicios/naming-logo-slogan/",
    siteName: "DigiMedia - Naming Logo y Slogan",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/naming-logo-slogan/",
  },
};

export default function NamingLogoSloganLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup subservicioSlug="naming-logo-slogan" />
    </>
  );
}