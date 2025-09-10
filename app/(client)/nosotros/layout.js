export const metadata = { 
  title: "Quiénes Somos | Digimedia Agencia de Marketing Digital",
  description:
    "Digimedia Marketing ayuda a marcas y emprendedores a través de SEO, redes sociales, diseño web y estrategias digitales con resultados medibles y auténticos.",
    openGraph: {
        title: "Quiénes Somos | Digimedia Agencia de Marketing Digital",
        description:
        "Digimedia Marketing ayuda a marcas y emprendedores a través de SEO, redes sociales, diseño web y estrategias digitales con resultados medibles y auténticos.",
        url: "https://digimedia-marketing.com/nosotros/",
        siteName: "Digimedia Marketing",
        images: [], 
        locale: "es_PE",
        type: "website",
    },
    alternates: {
        canonical: "https://digimedia-marketing.com/nosotros/",
    },
};

export default function nostrosLayout({ children }) {
    return (
    <>
      {/* Insertar Schema Markup para SEO */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Digimedia",
          "url": "https://digimedia-marketing.com/nosotros/",
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