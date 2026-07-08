import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "DigiMedia - Produccion Pautas",
  description:
    "Es el desarrollo de todos los elementos necesarios para ejecutar una campaña publicitaria en redes sociales. Implica tanto la parte creativa como la técnica para que los anuncios funcionen correctamente en las plataformas elegidas.",
  openGraph: {
    title: "DigiMedia - Produccion Pautas",
    description:
      "Es el desarrollo de todos los elementos necesarios para ejecutar una campaña publicitaria en redes sociales. Implica tanto la parte creativa como la técnica para que los anuncios funcionen correctamente en las plataformas elegidas.",
    url: "https://digimedia-marketing.com/servicios/produccion-pautas/",
    siteName: "DigiMedia - Produccion Pautas",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/produccion-pautas/",
  },
};

export default function ProducPautasLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup subservicioSlug="produccion-pautas" />
    </>
  );
}