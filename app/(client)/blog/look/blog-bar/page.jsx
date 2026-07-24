import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body1 from "../components/Body1";
import WhatsAppButton from "../../../components/WhatsAppButton";
import MayaChatbot from "../../../components/Chatbot";

export default function Page() {
  return (
    <div>
      <Header url_image="/blog/Blog4_header.webp" />

      <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,_#000118_0%,_#410C89_50%,_#000118_100%)] text-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <Body1 />

          <Body1 />

          <Footer
            url_image1="/blog/blog-5.webp"
            url_image2="/blog/blog-8.webp"
            url_image3="/blog/blog-2.webp"
            descripcion="El letrero de neón LED es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local. Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local."
          />
        </div>

        {/* Botones flotantes WhatsApp y Chatbot */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <WhatsAppButton />
          <MayaChatbot />
        </div>
      </div>
    </div>
  );
}