import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "Gestión de Redes Sociales - DigiMedia Marketing",
  description:
    "Aumenta tu presencia en redes sociales con Digimedia. Estrategias personalizadas para conectar con tu audiencia y crecer online. ¡Potencia tu marca hoy!",
  keywords: [
    "gestión de redes sociales",
    "marketing en redes sociales",
    "agencia de redes sociales",
    "estrategias en redes sociales",
    "Community management",
    "aumentar presencia online",
    "crecer en redes sociales"
  ],
  openGraph: {
    title: "Gestión de Redes Sociales - DigiMedia Marketing",
    description:
      "Aumenta tu presencia en redes sociales con Digimedia. Estrategias personalizadas para conectar con tu audiencia y crecer online. ¡Potencia tu marca hoy!",
    url: "https://digimedia-marketing.com/servicios/gestion-redes/",
    siteName: "Digimedia Marketing",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/servicios/gestion-redes/",
  },
};
export default function gestionLayout({ children }) {
  return (
    <>
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Digimedia",
          "url": "https://digimedia-marketing.com/servicios/gestion-redes/",
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
          "sameAs": "https://digimedia-marketing.com/",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "PEN",
            "price": "2500.00",
            "availability": "https://schema.org/InStock",
            "url": "https://digimedia-marketing.com/servicios/gestion-redes/"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "reviewCount": "28"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Carlos"
              },
              "datePublished": "2024-07-15",
              "reviewBody": "El servicio de gestión de redes sociales es excelente, realmente ayudó a aumentar la visibilidad de mi negocio.",
              "name": "Muy recomendado",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              }
            }
          ]
        }
        `}
      </script>

      {children}
      <ServicePopup idServicio={2} />
    </>
  );
}
