export const metadata = {
  title:
    "Preguntas Frecuentes | Diseño Web, Redes Sociales y Branding",
  description:
    "Resolvemos tus dudas más comunes sobre diseño web, redes sociales y branding. Accede a respuestas rápidas y claras para mejorar tu presencia digital.",
  keywords: [
    "Preguntas Frecuentes",
    "Marketing digital",
    "Diseño web",
    "Redes sociales",
    "Branding",
    "Gestión digital",
    "Estrategia digital",
    "Identidad de marca",
    "Transformación digital",
    "Copywriting"
  ],
    openGraph: {
    title:
      "Preguntas Frecuentes | Diseño Web, Redes Sociales y Branding",
    description:
      "Resolvemos tus dudas más comunes sobre diseño web, redes sociales y branding. Accede a respuestas rápidas y claras para mejorar tu presencia digital.",
    url: "https://digimedia-marketing.com/preguntas/",
    siteName: "Digimedia Marketing",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/preguntas/",
  },
};

export default function preguntaLayout({ children }) {
  return (
    <>
      {/* Insertar Schema Markup para SEO */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQ Page",
          "name": "Digimedia",
          "url": "https://digimedia-marketing.com/preguntas",
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
