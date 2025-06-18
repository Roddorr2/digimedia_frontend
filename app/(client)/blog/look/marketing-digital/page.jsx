import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Body5 from '../components/Body5'

export default function Page() {
    
    return (
        <div>
            <Header url_image={"/blog/blog-3.webp"} tituloPrincipal = {"MARKETING Y GESTIÓN DIGITAL"}
              tituloSecundario ={"¡Impulsa tu marca al éxito digital!"} 
              descripcion = {"El marketing y la gestión digital son tus aliados para potenciar el éxito de tu marca en el mundo digital"}
            />

            <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
            <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>
            
              <Body5 />

              <Footer 
              url_image1={"/blog/fondo-tablet.webp"} 
              url_image2={"/blog/blog-11.webp"} 
              url_image3={"/blog/blog-7.webp"} 
              descripcion={"Una estrategia de marketing digital exitosa es aquella que integra múltiples canales de manera efectiva. Ya sea SEO, publicidad en redes sociales, email marketing o PPC, nuestro servicio de marketing y gestión digital garantiza que todos los esfuerzos estén alineados"}/>
            
            </div>
          </div>
    )
}
