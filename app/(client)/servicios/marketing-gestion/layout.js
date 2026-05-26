import ServicePopup from "@/components/ServicePopup";

export const metadata = {
  title: "Marketing y Gestion Digital  - DigiMedia",
  description:
    "Potencia tu negocio con nuestras soluciones de marketing y gestión digital. Conviértete en un líder en el entorno online y alcanza el éxito deseado.",
        keywords: [
      "Marketing digital", 
      "gestión digital", 
      "estrategias digitales", 
      "posicionamiento de marca", 
      "identidad visual", 
      "naming creativo", 
      "diseño de logo", 
      "diseño de slogan", 
      "manual de uso de marca", 
      "crecimiento online", 
      "campañas digitales", 
      "optimización de estrategias", 
      "rendimiento de marca", 
      "seguimiento continuo",  
      "servicios de marketing", 
      "ventas con marketing digital", 
      "Lima", 
      "Perú"
      ],
    openGraph: {
    title: "Marketing y Gestion Digital  - DigiMedia",
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
          "sameAs": "https://digimedia-marketing.com/",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "PEN",
            "price": "2500.00",
            "availability": "https://schema.org/InStock",
            "url": "https://digimedia-marketing.com/servicios/marketing-gestion/"
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
              "reviewBody": "Excelente servicio de marketing de gestión, nos ayudó a optimizar procesos y crecer en línea.",
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
      <ServicePopup idServicio={3} />
    </>
  );
}
