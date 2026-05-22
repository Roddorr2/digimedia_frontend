import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "DigiMedia - Analisis Benchmarking",
  description:
    "Al combinar ambos enfoques, las empresas pueden lograr una mejora continua y una ventaja competitiva sostenible.",
  openGraph: {
    title: "DigiMedia - Analisis Benchmarking",
    description:
      "Al combinar ambos enfoques, las empresas pueden lograr una mejora continua y una ventaja competitiva sostenible.",
    url: "https://digimedia-marketing.com/servicios/analisis-y-benchmarking/",
    siteName: "DigiMedia - Analisis Benchmarking",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical:
      "https://digimedia-marketing.com/servicios/analisis-y-benchmarking/",
  },
};

export default function AnalisisBenchLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup idServicio={3} idSubservicio={9} />
    </>
  );
}
