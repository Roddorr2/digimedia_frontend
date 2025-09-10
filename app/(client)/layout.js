import Header from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head";

export const metadata = {
  title:
    "Marketing Digital DigiMedia",
  description:
    "¿No sabes por dónde empezar? Impulsa tu marca al siguiente nivel con nosotros",
  openGraph: {
    title:
      "Marketing Digital DigiMedia",
    description:
      "¿No sabes por dónde empezar? Impulsa tu marca al siguiente nivel con nosotros",
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

        {/* ✅ Fuente Telegraf si la usas desde cdnfonts */}
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
