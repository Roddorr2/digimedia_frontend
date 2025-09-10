export const metadata = {
  title: "DigiMedia - SEO",
  description:
    "El seo (search engine optimization) es el conjunto de técnicas y estrategias que se implementan en un sitio web con el objetivo de mejorar su visibilidad y posicionamiento en los resultados orgánicos (no pagados) de los motores de búsqueda como google, bing y otros.",
  openGraph: {
    title: "DigiMedia - SEO",
    description:
      "El seo (search engine optimization) es el conjunto de técnicas y estrategias que se implementan en un sitio web con el objetivo de mejorar su visibilidad y posicionamiento en los resultados orgánicos (no pagados) de los motores de búsqueda como google, bing y otros.",
    url: "https://digimedia-marketing.com/servicios/seo/",
    siteName: "DigiMedia - SEO",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/seo/",
  },
};

export default function SEOLayout({ children }) {
  return <>{children}</>;
}
