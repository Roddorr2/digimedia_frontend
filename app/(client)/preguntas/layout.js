export const metadata = { 
  title: "Preguntas Frecuentes | Diseño Web, Redes Sociales y Branding – DigiMedia",
  description:
    "Resuelve todas tus dudas sobre diseño web, gestión de redes sociales y branding. Te damos la información clave para que tomes la mejor decisión.",
    openGraph: {
        title: "Preguntas Frecuentes | Diseño Web, Redes Sociales y Branding – DigiMedia",
        description:
        "Resuelve todas tus dudas sobre diseño web, gestión de redes sociales y branding. Te damos la información clave para que tomes la mejor decisión.",
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

export default function preguntaLayout({ children }) {
  return (
    <>
      {/* Insertar Schema Markup para SEO */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
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
          "image": "https://digimedia-marketin",
          "sameAs": "https://digimedia-marketing.com/"
        }
        `}
      </script>

      {children}
    </>
  );
}
