export const metadata = {
  title: "Listo para transformar tu negocio Contáctanos – DigiMedia",
  description:
     "Recibe una asesoría gratuita en diseño web, marketing digital y branding. Contáctanos hoy y lleva tu negocio al siguiente nivel con estrategias efectivas.",
  keywords: [
    "Contacto DigiMedia",
    "Asesoría marketing digital",
    "Diseño web",
    "Branding",
    "Transformación digital",
    "Consultoría online",
    "Estrategia digital",
    "Marketing para negocios",
    "Servicios de marketing",
    "Optimización de negocio"
  ],
  openGraph: {
    title: "Listo para transformar tu negocio Contáctanos – DigiMedia",
    description:
      "Recibe una asesoría gratuita en diseño web, marketing digital y branding. Contáctanos hoy y lleva tu negocio al siguiente nivel con estrategias efectivas.",
    url: "https://digimedia-marketing.com/contactanos/",
    siteName: "Digimedia Marketing",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/contactanos/",
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
          "@type": "LocalBusiness",
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
