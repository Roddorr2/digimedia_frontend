import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body3 from "../components/Body3";

export default function Page() {
  return (
    <div>
      <Header
        url_image="/blog/blog-13.webp"
        tituloPrincipal="Gestión de redes sociales"
        tituloSecundario="Experimenta el contenido con las redes sociales"
        descripcion="Explora las tendencias emergentes en las redes sociales, con las nuevas aplicaciones y contenidos"
      />

      <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,_#060126_0%,_#0A0140_50%,_#5A37A6_100%)] text-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <Body3 />

          <Footer
            url_image1="/blog/blog-14.webp"
            url_image2="/blog/blog-15.webp"
            url_image3="/blog/blog-16.webp"
            descripcion="Al comprender las tendencias, el comportamiento del consumidor y las mejores prácticas de cada plataforma, podemos ayudarte a posicionar tu marca de manera efectiva. Invertir en una gestión profesional de redes sociales es esencial para mantener una presencia digital activa, relevante y rentable."
          />
        </div>
      </div>
    </div>
  );
}
