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

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Digimedia",
  "image": "https://digimedia-marketing.com/headerFooter/logoblanco.webp",
  "@id": "",
  "url": "https://digimedia-marketing.com/",
  "telephone": "983 027 828",
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
  "sameAs": [
    "https://www.facebook.com/DigiMedia.Marketing1",
    "https://www.instagram.com/digimediamkt/",
    "https://www.youtube.com/@DigimediaMarketing/featured",
    "https://www.linkedin.com/company/digimediamkt/"
  ]
};

export default function contactoLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {children}
    </>
  );
}