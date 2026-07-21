import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body5 from "../components/Body5";

export default function Page() {
  return (
    <div>
      <Header
        url_image="/blog/blog-3.webp"
        tituloPrincipal="MARKETING Y GESTIÓN DIGITAL"
        tituloSecundario="¡Impulsa tu marca al éxito digital!"
        descripcion="El marketing y la gestión digital son tus aliados para potenciar el éxito de tu marca en el mundo digital"
      />

      <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,_#060126_0%,_#0A0140_50%,_#5A37A6_100%)] text-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <Body5 />

          <Footer
            url_image1="/blog/fondo-tablet.webp"
            url_image2="/blog/blog-11.webp"
            url_image3="/blog/blog-7.webp"
            descripcion="Una estrategia de marketing digital exitosa es aquella que integra múltiples canales de manera efectiva. Ya sea SEO, publicidad en redes sociales, email marketing o PPC, nuestro servicio de marketing y gestión digital garantiza que todos los esfuerzos estén alineados."
          />
        </div>
      </div>
    </div>
  );
}
