export const metadata = {
  title: "Branding Profesional y Diseño de Marca que Conecta | DigiMedia",
  description:
    "Impulsa tu marca con estrategias de branding y diseño excepcionales. Te ayudamos a destacar en un mercado competitivo con soluciones personalizadas.",
  openGraph: {
    title: "Branding Profesional y Diseño de Marca que Conecta | DigiMedia",
    description:
      "Impulsa tu marca con estrategias de branding y diseño excepcionales. Te ayudamos a destacar en un mercado competitivo con soluciones personalizadas.",
    url: "https://digimedia-marketing.com/servicios/branding-desing/",
    siteName: "Digimedia Marketing",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/branding-desing/",
  },
};

export default function BrandingLayout({ children }) {
  return (
    <>
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Digimedia",
          "url": "https://digimedia-marketing.com/servicios/branding-desing/",
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
          "image": "https://digimedia-marketin",
          "sameAs": "https://digimedia-marketing.com/"
        }
        `}
      </script>

      {children}
    </>
  );
}
