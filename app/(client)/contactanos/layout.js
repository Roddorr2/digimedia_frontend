export const metadata = {
  title: "Listo para transformar tu negocio Contáctanos hoy",
  description:
    "Recibe una asesoria gratutita, ofrecemos diseño web, marketing digital y branding.",
  openGraph: {
    title: "Listo para transformar tu negocio Contáctanos hoy",
    description:
      "Recibe una asesoria gratutita, ofrecemos diseño web, marketing digital y branding.Recibe una asesoria gratutita, ofrecemos diseño web, marketing digital y branding.",
    url: "https://digimedia-marketing.com/blog/",
    siteName: "Digimedia Marketing",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/blog/",
  },
};

export default function contactoLayout({ children }) {
  return (
    <>
      {/* Insertar Schema Markup para SEO */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Digimedia",
          "url": "https://digimedia-marketing.com/contactanos",
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
          "image": "https://digimedia-marketing.com/headerFooter/logoblanco.webp",
          "sameAs": "https://digimedia-marketing.com/"
        }
        `}
      </script>

      {children}
    </>
  );
}
