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
                tituloSecundario='INSPÍRATE CON LAS TENDENCIAS DE DISEÑO WEB'
                descripcion='Explora las tendencias emergentes en diseño web, desde las interfaces minimalistas hasta la integración de IA'
            />

            <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
                <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>

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
    )
}