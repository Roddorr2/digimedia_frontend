import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Body1 from '../components/Body1'
import WhatsAppButton from "../../../components/WhatsAppButton";
import MayaChatbot from "../../../components/Chatbot";

export default function Page() {
    return (
        <div>
            <Header url_image = {"/blog/Blog4_header.webp"}/>

            <div className="w-full px-4 py-12 relative bg-[linear-gradient(135deg,_#060126_0%,_#0A0140_50%,_#5A37A6_100%)] text-white min-h-screen">
                <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-[#060126] via-[#0A0140] to-[#5A37A6] fixed left-0 top-0 h-full -z-10"></div>

                <Body1/>

                <Footer  
                url_image1={"/blog/blog-5.webp"} 
                url_image2={"/blog/blog-8.webp"} 
                url_image3={"/blog/blog-2.webp"}
                descripcion={"El letrero de neón LED es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local. Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local."}/>
            </div>
            
            {/* Botones flotantes WhatsApp y Chatbot */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
              <WhatsAppButton />
              <MayaChatbot />
            </div>
        </div>
    )
}