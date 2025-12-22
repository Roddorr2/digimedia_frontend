import Header from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head";

export const metadata = {
  title:
    "Marketing Digital DigiMedia en Lima - DigiMedia",
  description:
    "Impulsa tu marca al siguiente nivel con DigiMedia. Somos expertos en marketing digital, posicionamiento web y estrategias que generan resultados reales en Lima.",
  keywords: [
    "marketing digital",
    "estrategias digitales",
    "posicionamiento web",
    "marketing online",
    "agencia digital Lima",
    "crecimiento de marca",
    "gestión digital"
  ],
robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [
    {
      name: "DigiMedia-Marketing",
      url: "https://digimedia-marketing.com",
    },
  ],
  publisher: "DigiMedia-Marketing",
  openGraph: {
    title:
      "Marketing Digital DigiMedia",
    description:
      "Impulsa tu marca al siguiente nivel con DigiMedia. Somos expertos en marketing digital, posicionamiento web y estrategias que generan resultados reales en Lima.",
    url: "https://digimedia-marketing.com/",
    siteName: "Digimedia Marketing",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://digimedia-marketing.com/", 
  },
};

export default function RootLayout({ children }) {
  return (
    
    <>
      <Head>
        {/* ✅ Preconexión a Google Fonts */}
        <link rel="preload" href="/image-home/inicio.webp" as="image" />

        {/* ✅ Fuente Montserrat con display=swap */}
        <meta name="author" content="DigiMedia-Marketing" />
        <meta name="publisher" content="DigiMedia-Marketing" />
        <meta name="robots" content="index, follow" />
        {/* Agrega aquí tus fuentes si las necesitas */}
        
        {/* ✅ Fuente Telegraf si la usas desde cdnfonts */}
        
        {/* Agregar Schema Markup (JSON-LD) */}
      </Head>

      <Header />
              <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Digimedia",
              "url": "https://digimedia-marketing.com",
              "logo": "https://digimedia-marketing.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+51 983 027 828",
                "contactType": "Customer Service",
                "areaServed": "PE",
                "availableLanguage": "Spanish"
              },
              "sameAs": [
                "https://www.facebook.com/digimedia",
                "https://www.twitter.com/digimedia",
                "https://www.instagram.com/digimedia"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jr. Paruro 1401",
                "addressLocality": "Lima",
                "postalCode": "15001",
                "addressCountry": "PE"
              }
            }
          `}
        </script>
      {children}
      <Footer />
    </>
  );
}
