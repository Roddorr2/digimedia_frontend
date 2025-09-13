export const metadata = {
  title: "Diseño y Desarrollo Web Profesional con Digimedia para potenciar tu empresa",
  description:
    "Descubre nuestros servicios de marketing digital: desde el desarrollo de una web profesional hasta la gestión de redes sociales que convierten.",
  openGraph: {
    title: "Diseño y Desarrollo Web Profesional con Digimedia para potenciar tu empresa",
    description:
      "Descubre nuestros servicios de marketing digital: desde el desarrollo de una web profesional hasta la gestión de redes sociales que convierten.",
    url: "https://digimedia-marketing.com/servicios/desing-desarrollo/",
    siteName: "Digimedia Marketing",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/desing-desarrollo/",
  },
};

export default function desingLayout({ children }) {
  return (
    <>
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Digimedia",
          "url": "https://digimedia-marketing.com/servicios/desing-desarrollo/",
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