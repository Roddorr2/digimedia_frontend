import Header from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head";

export const metadata = {
  title: "DIGIMEDIA: Agencia de marketing Digital | Estrategias de marketing y gestión de redes",
  description:
    "Descubre nuestros servicios de marketing digital: desde el desarrollo de una web profesional hasta la gestión de redes sociales que convierten.",
};

export default function RootLayout({ children }) {
  return (
    
    <>
      <Head>
        {/* ✅ Preconexión a Google Fonts */}
        <link rel="preload" href="/image-home/inicio.webp" as="image" />

        {/* ✅ Fuente Montserrat con display=swap */}
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
