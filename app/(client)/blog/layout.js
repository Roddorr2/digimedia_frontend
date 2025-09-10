export const metadata = { 
  title: "Blog de DigiMedia Marketing Digital: Tendencias, Estrategias y Consejos",
  description:
    "Descubre el blog de DigiMedia con artículos sobre marketing digital, SEO, branding y estrategias clave para hacer crecer tu negocio.",
    openGraph: {
        title: "Blog de DigiMedia Marketing Digital: Tendencias, Estrategias y Consejos",
        description:
        "Descubre el blog de DigiMedia con artículos sobre marketing digital, SEO, branding y estrategias clave para hacer crecer tu negocio.",
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

export default function blogLayout({ children }) {
    return (
    <>
      {/* Insertar Schema Markup para SEO */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Digimedia",
          "url": "https://digimedia-marketing.com/blog/",
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