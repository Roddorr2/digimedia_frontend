import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "DigiMedia - Manual de Marca",
  description:
    "Un manual de marca es un documento que establece las reglas y directrices para usar correctamente la identidad visual y verbal de una marca. Sirve para mantener la coherencia en todas las comunicaciones, tanto internas como externas, y asegurar que la marca se vea, se sienta y se comunique de la misma forma, sin importar quién la use o dónde se aplique.",
  openGraph: {
    title: "DigiMedia - Manual de Marca",
    description:
      "Un manual de marca es un documento que establece las reglas y directrices para usar correctamente la identidad visual y verbal de una marca. Sirve para mantener la coherencia en todas las comunicaciones, tanto internas como externas, y asegurar que la marca se vea, se sienta y se comunique de la misma forma, sin importar quién la use o dónde se aplique.",
    url: "https://digimedia-marketing.com/servicios/manual-marca/",
    siteName: "DigiMedia - Manual de Marca",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/manual-marca/",
  },
};

export default function ManualMarcaLayout({ children }) {
  return (
    <>
      {children}
      <ServicePopup idServicio={3} idSubservicio={12} />
    </>
  );
}
