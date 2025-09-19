export const metadata = {
  title: "Branding Profesional y Diseño de Marca que Conecta - DigiMedia",
  description:
    "Impulsa tu marca con estrategias de branding y diseño excepcionales. Te ayudamos a destacar en un mercado competitivo con soluciones personalizadas.",
      keywords:[
    "Branding", 
    "diseño", 
    "identidad visual", 
    "estrategia de marketing digital", 
    "publicidad digital", 
    "logo", 
    "colores", 
    "tipografía",  
    "auditoría digital completa", 
    "análisis de competencia", 
    "personalidad de marca", 
    "diferenciación de marca",  
    "monitoreo constante",  
    "Lima Perú",  
    ],
    openGraph: {
    title: "Branding Profesional y Diseño de Marca que Conecta - DigiMedia",
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
          "image": "https://digimedia-marketing.com/logo.png",
          "sameAs": "https://digimedia-marketing.com/",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "PEN",
            "price": "1800.00",
            "availability": "https://schema.org/InStock",
            "url": "https://digimedia-marketing.com/servicios/branding-desing/"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "34"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "María"
              },
              "datePublished": "2024-08-10",
              "reviewBody": "El servicio de branding de DigiMedia nos ayudó a construir una identidad de marca sólida y coherente.",
              "name": "Excelente trabajo en diseño de marca",
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
    </>
  );
}
