import Header from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head";

export const metadata = {
  title: "DIGIMEDIA: Agencia de marketing Digital | Estrategias de marketing  y gestión de redes",
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

        {/* ✅ Fuente Telegraf si la usas desde cdnfonts */}
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
