export const metadata = {
  title: "DigiMedia - Marketing de Gestion",
  description:
    "Potencia tu negocio con nuestras soluciones de marketing y gestión digital. Conviértete en un líder en el entorno online y alcanza el éxito deseado.",
  openGraph: {
    title: "DigiMedia - Marketing de Gestion",
    description:
      "Potencia tu negocio con nuestras soluciones de marketing y gestión digital. Conviértete en un líder en el entorno online y alcanza el éxito deseado.",
    url: "https://digimedia-marketing.com/servicios/marketing-gestion/",
    siteName: "DigiMedia - Marketing de Gestion",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/marketing-gestion/",
  },
};

export default function MarketingLayout({ children }) {
  return (
    <>
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Digimedia",
          "url": "https://digimedia-marketing.com/servicios/marketing-gestion/",
          "telephone": "+51 983 027 828",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jr. Paruro 1401",
            "addressLocality": "Lima",
            "postalCode": "15001",
            "addressCountry": "PE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -12.0447395,
            "longitude": -77.0217899
          },
          "image": "https://digimedia-marketing.com/logo.png",
          "sameAs": "https://digimedia-marketing.com/"
        }
        `}
      </script>

      {children}
    </>
  );
}