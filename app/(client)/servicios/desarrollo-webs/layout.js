import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "Digimedia - Desarrollo Web",
  description:
    "El desarrollo web es el proceso de crear y mantener sitios web and aplicaciones que se ejecutan en internet. Implica una combinación de diseño, programación y gestión de bases de datos para asegurar que un sitio web sea funcional, atractivo y accesible para los usuarios.",
  openGraph: {
    title: "Digimedia - Desarrollo Web",
    description:
      "El desarrollo web es el proceso de crear y mantener sitios web y aplicaciones que se ejecutan en internet. Implica una combinación de diseño, programación y gestión de bases de datos para asegurar que un sitio web sea funcional, atractivo y accesible para los usuarios.",
    url: "https://digimedia-marketing.com/servicios/desarrollo-webs/",
    siteName: "Digimedia - Desarrollo Web",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/desarrollo-webs/",
  },
};

export default function DesarrWebsLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup subservicioSlug="desarrollo-responsive" />
    </>
  );
}
