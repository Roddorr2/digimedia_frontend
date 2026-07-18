import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "DigiMedia - Diseño Ux Y Ui",
  description:
    "El diseño ux se preocupa por la experiencia global del usuario, mientras que el diseño ui se enfoca en los detalles visuales de la interfaz. Ambos trabajan juntos para crear productos digitales exitosos.",
  openGraph: {
    title: "DigiMedia - Diseño Ux Y Ui",
    description:
      "El diseño ux se preocupa por la experiencia global del usuario, mientras que el diseño ui se enfoca en los detalles visuales de la interfaz. Ambos trabajan juntos para crear productos digitales exitosos.",
    url: "https://digimedia-marketing.com/servicios/ui/",
    siteName: "DigiMedia - Diseño Ux Y Ui",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/ui/",
  },
};

export default function DisenoUxUiLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup subservicioSlug="ui" />
    </>
  );
}