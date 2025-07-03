import Link from 'next/link';
import Head from 'next/head';
import './Home.css';
import Image from 'next/image';

export default function Banner() {
  return (
    <>
     <Head>
        <link rel="preload" href="/image-home/inicio.webp" as="image" />
     </Head>
    
    <main className="relative bg-cover bg-[30%] h-[calc(100vh-67px)]">
     <Image
      src="/image-home/inicio.webp"
      alt="Inicio"
      fill
      priority
      className="object-cover absolute object-[30%]"
     />
      <div className="flex flex-col items-center justify-center h-full mx-4 md:justify-end md:items-start md:mx-0">
        <div className="bg-[rgba(123,34,179,0.5)] text-center py-4 px-10 rounded-xl md:[clip-path:polygon(0_0,100%_0,80%_100%,0_100%)] md:px-24 md:text-left">
          <h1 className="text-white font-bold text-4xl md:text-6xl max-w-xl">
            ¿No sabes por dónde empezar?
          </h1>
          <p className="text-[#FCEE21] text-2xl max-w-96 m-auto md:m-0">
            Impulsa tu marca al siguiente nivel con nosotros
          </p>
        </div>
        <Link
          className="relative inline-flex items-center justify-center text-white font-bold px-8 py-4 rounded-full overflow-hidden shadow-md bg-gradient-to-r from-[#7B22B3] to-[#9C27B0] hover:from-[#682199] hover:to-[#8A2BE2] transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none group mx-auto md:mx-0 mt-5 mb-8 translate-x-[5rem]" // Mover el botón 5rem a la derecha
          href="/contactanos"
        >

          <span className="relative z-10">¡CONTÁCTANOS!</span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FCEE21]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FCEE21]/10 via-[#FCEE21]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></span>

          {/* Icono de flecha */}
          <svg
            className="absolute right-4 w-5 h-5 fill-white transition-transform duration-300 group-hover:translate-x-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </Link>
      </div>
    </main>
    </>
  );
}
