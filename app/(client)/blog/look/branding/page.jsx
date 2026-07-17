import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body4 from "../components/Body4";
import WhatsAppButton from "../../../components/WhatsAppButton";
import MayaChatbot from "../../../components/Chatbot";

export default function Page() {
  return (
    <div>
      <Header
        url_image={"/blog/brading_fondo.webp"}
        tituloPrincipal="Branding y Diseño"
        tituloSecundario="Transforma tu visión en una identidad única y memorable"
        descripcion="El servicio de branding y diseño se enfoca en crear identidades visuales que conecten profundamente con tu audiencia. Desde la creación de logotipos hasta la definición de una paleta de colores, cada detalle refleja los valores y la personalidad de tu marca."
      />
      <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
        <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>

        <Body4 />

        <Footer
          url_image1={"/blog/branding_1.webp"}
          url_image2={"/blog/brading_fondo.webp"}
          url_image3={"/blog/branding_2.webp"}
          descripcion={"Un buen branding y diseño no solo consiste en crear una imagen visual atractiva, sino en construir una identidad que hable por sí misma. Con un diseño coherente y bien pensado, tu marca puede conectar emocionalmente con tu público objetivo."}
        />
      </div>
      
      {/* Botones flotantes WhatsApp y Chatbot */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <WhatsAppButton />
        <MayaChatbot />
      </div>
    </div>
  );
}