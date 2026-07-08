import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "Digimedia - Manual de Marca",
  description:
    "El manual de marca es una guía fundamental que establece las normas y lineamientos para el uso correcto de los elementos visuales y comunicacionales de una empresa. Incluye aspectos como el logotipo, colores corporativos, tipografías, tono de comunicación y aplicaciones gráficas, con el objetivo de asegurar coherencia, reconocimiento y una identidad sólida en todos los puntos de contacto con el público.",
  openGraph: {
    title: "Digimedia - Manual de Marca",
    description:
      "El manual de marca es una guía fundamental que establece las normas y lineamientos para el uso correcto de los elementos visuales y comunicacionales de una empresa. Incluye aspectos como el logotipo, colores corporativos, tipografías, tono de comunicación y aplicaciones gráficas, con el objetivo de asegurar coherencia, reconocimiento y una identidad sólida en todos los puntos de contacto con el público.",
    url: "https://digimedia-marketing.com/servicios/monitoreo-y-reporting/",
    siteName: "Digimedia - Manual de Marca",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical:
      "https://digimedia-marketing.com/servicios/monitoreo-y-reporting/",
  },
};

export default function MonitoreoReportingLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup subservicioSlug="monitoreo-y-reporting" />
    </>
  );
}
