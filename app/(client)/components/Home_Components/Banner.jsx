import Image from "next/image";
export default function Banner() {
  return (
    <>
      <main className="relative h-[calc(100vh-67px)] w-full overflow-hidden">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/image-home/inicio_mobile.avif"
          />
          <Image
            src="/image-home/pexels-artempodrez-5716026.jpg"
            alt="Inicio"
            priority 
            fetchPriority="high"
            fill
            sizes="100vw"
            className="object-cover object-[30%]"
            style={{ objectPosition: "30% center" }}
          />
        </picture>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center mx-4 md:justify-end md:items-start md:mx-0">
          <div
            className="bg-[#B326FF] text-white py-5 px-10 rounded-tr-[50px] md:px-24"
          
          >
            <h1 className="text-white font-bold text-4xl md:text-4xl font-['Montserrat'] ">
              Creemos en las buenas ideas...
            </h1>
            <p className="text-white text-2xl m-auto md:m-0">
              y sobre todo en sacar adelante tu negocio
            </p>
          </div>
          <a
            href="/contactanos"
            className="relative inline-flex items-center justify-center text-white 
            font-bold px-14 py-3 rounded-2xl shadow-md bg-[#FFA000] hover:bg-[#FB8C00] 
            transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none
            mx-auto md:mx-0 mt-5 mb-8 translate-x-[5rem]"
          >
            <span className="relative z-10">¡Contáctanos!</span>
          </a>
        </div>
      </main>
    </>
  );
}
