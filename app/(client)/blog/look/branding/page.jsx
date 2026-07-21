import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body4 from "../components/Body4";

export default function Page() {
  return (
    <div>
      <Header
        url_image="/blog/brading_fondo.webp"
        tituloPrincipal="Branding y Diseño"
        tituloSecundario="Transforma tu visión en una identidad única y memorable"
        descripcion="El servicio de branding y diseño se enfoca en crear identidades visuales que conecten profundamente con tu audiencia. Desde la creación de logotipos hasta la definición de una paleta de colores, cada detalle refleja los valores y la personalidad de tu marca."
      />

      <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,_#060126_0%,_#0A0140_50%,_#5A37A6_100%)] text-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <Body4 />

          <Footer
            url_image1="/blog/branding_1.webp"
            url_image2="/blog/brading_fondo.webp"
            url_image3="/blog/branding_2.webp"
            descripcion="Un buen branding y diseño no solo consiste en crear una imagen visual atractiva, sino en construir una identidad que hable por sí misma. Con un diseño coherente y bien pensado, tu marca puede conectar emocionalmente con tu público objetivo."
          />
        </div>
      </div>
    </div>
  );
}
