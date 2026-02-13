import Image from 'next/image';

export default function Banner() {
  return (
    <>
      <main className="relative h-[calc(100vh-67px)] w-full overflow-hidden">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/image-home/pexels-artempodrez-5716026.jpeg"
          />
        </div>

        {/* Imagen para Desktop */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/image-home/pexels-artempodrez-5716026.jpeg"
            alt="Inicio"
            priority
            fetchPriority="high"
            fill
            sizes="100vw"
            className="object-cover object-[70%] md:object-[30%]"
          />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-end justify-end pb-20 md:justify-end md:items-start md:mx-0 md:pb-0">
          <div className="bg-[#B326FF] text-white py-6 px-8 rounded-[30px] rounded-tr-[80px] md:rounded-t-none md:rounded-tr-[50px] md:px-24 w-[65%] mr-4 md:w-auto md:mr-0 md:max-w-none text-center md:text-left">
            <h1 className="text-white font-bold text-2xl md:text-4xl font-['Montserrat'] leading-tight">
              Creemos en las buenas ideas...
            </h1>
            <div className="w-full h-[2px] bg-white my-3 md:hidden"></div>
            <p className="text-white text-lg md:text-2xl mt-2">
              y sobre todo en sacar adelante tu negocio
            </p>
          </div>
          <a
            href="/contactanos"
            className="relative inline-flex items-center justify-center text-white 
            font-bold px-12 py-3 rounded-2xl shadow-md bg-[#FFA000] hover:bg-[#FB8C00] 
            transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none
            mt-5 mb-8 self-center md:self-auto md:translate-x-[5rem] md:mx-0"
          >
            <span className="relative z-10">¡Contáctanos!</span>
          </a>
        </div>
      </main>
    </>
  );
}