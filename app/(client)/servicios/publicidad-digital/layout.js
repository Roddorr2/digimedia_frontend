import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "Digimedia - Diseño de Logo",
  description:
    "El diseño de logo es un elemento clave para la identidad de marca, ya que representa visualmente los valores, personalidad y propósito de una empresa. Un buen logo debe ser memorable, versátil y coherente, permitiendo diferenciarse en el mercado y conectar emocionalmente con el público objetivo.",
  openGraph: {
    title: "Digimedia - Diseño de Logo",
    description:
      "El diseño de logo es un elemento clave para la identidad de marca, ya que representa visualmente los valores, personalidad y propósito de una empresa. Un buen logo debe ser memorable, versátil y coherente, permitiendo diferenciarse en el mercado y conectar emocionalmente con el público objetivo.",
    url: "https://digimedia-marketing.com/servicios/publicidad-digital/",
    siteName: "Digimedia - Diseño de Logo",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/publicidad-digital/",
  },
};

export default function PubliDigitalLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup idServicio={4} idSubservicio={15} />
    </>
  );
}
