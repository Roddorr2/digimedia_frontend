import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function Banner() {
  return (
    <>
      

     <main className="relative h-[calc(100vh-67px)] w-full overflow-hidden">
  <Image
  src="/image-home/inicio.webp"
  alt="Inicio"
  width={1920}
  height={1080}
  priority
  fetchPriority="high"
  sizes="(max-width: 768px) 100vw, 100vw"
  className="w-full h-full object-cover object-[30%]"
/>

  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center mx-4 md:justify-end md:items-start md:mx-0">
    <div
      className="bg-[rgba(123,34,179,0.5)] text-center py-4 px-10 rounded-xl md:px-24 md:text-left"
      style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)', willChange: 'clip-path' }}
    >
      <h1 className="text-white font-bold text-4xl md:text-6xl max-w-xl">
        ¿No sabes por dónde empezar?xd
      </h1>
      <p className="text-[#FCEE21] text-2xl max-w-96 m-auto md:m-0">
        Impulsa tu marca al siguiente nivel con nosotros
      </p>
    </div>
    <a
      href="/contactanos"
      className="relative inline-flex items-center justify-center text-white font-bold px-8 py-4 rounded-full overflow-hidden shadow-md bg-gradient-to-r from-[#7B22B3] to-[#9C27B0] hover:from-[#682199] hover:to-[#8A2BE2] transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none group mx-auto md:mx-0 mt-5 mb-8 translate-x-[5rem]"
    >
      <span className="relative z-10">¡CONTÁCTANOS!</span>
    </a>
  </div>
</main>
    </>
  );
}
