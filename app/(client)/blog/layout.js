export const metadata = { 
  title: "Blog de Marketing Digital - DigiMedia",
  description:
    "Descubre el blog de DigiMedia con artículos sobre marketing digital, SEO, redes sociales y branding. Estrategias y consejos clave para hacer crecer tu negocio.",
  keywords:[
    "blog de marketing digital", 
    "tendencias de marketing", 
    "estrategias digitales", 
    "SEO y branding", 
    "consejos de marketing online", 
    "blog de negocios digitales", 
    "marketing en redes sociales",
  ],
    openGraph: {
        title: "Blog de Marketing Digital - DigiMedia",
        description:
        "Descubre el blog de DigiMedia con artículos sobre marketing digital, SEO, redes sociales y branding. Estrategias y consejos clave para hacer crecer tu negocio.",
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
          "@type": "Article",
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
          "image": "https://digimedia-marketing.com/headerFooter/logoblanco.webp",
          "sameAs": "https://digimedia-marketing.com/"
        }
        `}
      </script>

      {children}
    </>
  );
}
