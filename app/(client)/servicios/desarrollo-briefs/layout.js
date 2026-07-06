import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "Digimedia - Desarrollo de Brief de Marca" ,
  description:
    "Es la construcción de una guía que recoge toda la información esencial de un proyecto de diseño o branding. Sirve como base para definir la identidad visual, tono, mensaje y objetivos de una marca, producto o campaña.",
  openGraph: {
    title: "DigiMedia - Desarrollo de Brief de Marca",
    description:
      "Es la construcción de una guía que recoge toda la información esencial de un proyecto de diseño o branding. Sirve como base para definir la identidad visual, tono, mensaje y objetivos de una marca, producto o campaña.",
    url: "https://digimedia-marketing.com/servicios/desarrollo-briefs/",
    siteName: "DigiMedia - Desarrollo Briefs",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/desarrollo-briefs/",
  },
};

export default function DesarrBriefsLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup subservicioSlug="desarrollo-briefs" />
    </>
  );
}
