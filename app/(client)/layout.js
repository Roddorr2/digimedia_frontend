import Header from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head";

export const metadata = {
  title: "Digimedia",
  description:
    "Líderes innovadores en marketing digital. Conectamos tu marca con las audiencias del futuro, impulsando tu presencia online hacia el éxito.",
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
