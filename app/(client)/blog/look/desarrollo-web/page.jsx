import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Body2 from '../components/Body2'
import WhatsAppButton from "../../../components/WhatsAppButton";
import MayaChatbot from "../../../components/Chatbot";

export default function Page() {
  return (
    <div>
      <Header
        url_image="/blog/fondo_looking_diseñoweb.webp"
        tituloPrincipal="Diseño y Desarrollo Web"
        tituloSecundario="INSPÍRATE CON LAS TENDENCIAS DE DISEÑO WEB"
        descripcion="Explora las tendencias emergentes en diseño web, desde las interfaces minimalistas hasta la integración de IA"
      />

      <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,_#000118_0%,_#410C89_50%,_#000118_100%)] text-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <Body2 />

                <Body2 />

                <Footer 
                url_image1={"/blog/footer_plantilla2.webp"} 
                url_image2={"/blog/footer2_plantilla2.webp"} 
                url_image3={"/blog/footer3_plantilla2.webp"} 
                descripcion= {" El diseño y desarrollo web es un campo que está en constante evolución. A medida que surgen nuevas tecnologías y tendencias, es esencial mantenerse actualizado para crear experiencias de usuario que sean tanto funcionales como estéticamente atractivas "}
                />
            </div>
            
            {/* Botones flotantes WhatsApp y Chatbot */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
              <WhatsAppButton />
              <MayaChatbot />
            </div>
        </div>
         </div>
    )
}
