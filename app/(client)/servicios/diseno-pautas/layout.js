import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "DigiMedia - Diseño Pautas",
  description:
    "Es el proceso de crear piezas gráficas o audiovisuales atractivas y efectivas que serán utilizadas en campañas de publicidad digital. Estas piezas están dirigidas a públicos segmentados y tienen un objetivo específico.",
  openGraph: {
    title: "DigiMedia - Diseño Pautas",
    description:
      "Es el proceso de crear piezas gráficas o audiovisuales atractivas y efectivas que serán utilizadas en campañas de publicidad digital. Estas piezas están dirigidas a públicos segmentados y tienen un objetivo específico.",
    url: "https://digimedia-marketing.com/servicios/diseno-pautas/",
    siteName: "DigiMedia - Diseño Pautas",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/diseno-pautas/",
  },
};

export default function DiseñoPautasLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup idServicio={2} idSubservicio={6} />
    </>
  );
}