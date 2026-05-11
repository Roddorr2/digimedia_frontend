import Link from 'next/link';

export default function Banner() {
  return (
    <>
      <main className="relative h-[calc(100dvh-67px)] w-full overflow-hidden">
        {/* Imagen optimizada con picture para evitar doble carga */}
        <picture className="absolute inset-0 w-full h-full">
          <source
            type="image/avif"
            media="(max-width: 767px)"
            srcSet="/optimized_images/image-home/reunion-de-marketing_movil.avif"
          />
          <source
            media="(max-width: 767px)"
            srcSet="/optimized_images/image-home/reunion-de-marketing_movil.webp"
          />
          <source
            type="image/avif"
            srcSet="/optimized_images/image-home/web_nuevo.avif"
          />
          <img
            src="/optimized_images/image-home/web_nuevo.webp"
            alt="Inicio"
            className="w-full h-full object-cover object-[70%] md:object-[30%]"
            fetchPriority="high"

            loading="eager"
            decoding="async"
          />
        </picture>

        <div className="absolute inset-0 z-10 flex flex-col items-end justify-end pb-20 md:justify-end md:items-start md:mx-0 md:pb-0">
          <div className="bg-[#B326FF] text-white py-6 px-8 rounded-[30px] rounded-tr-[80px] md:rounded-t-none md:rounded-tr-[50px] md:px-24 w-[65%] mr-4 md:w-auto md:mr-0 md:max-w-none text-center md:text-left">
            <h1 className="text-white font-bold text-2xl md:text-4xl font-sans leading-tight">
              Creemos en las buenas ideas...
            </h1>
            <p className="text-white text-lg md:text-2xl mt-2">
              y sobre todo en sacar adelante tu negocio
            </p>
          </div>
          <Link
            href="/contactanos"
            className="relative inline-flex items-center justify-center text-white 
            font-bold px-12 py-3 rounded-2xl shadow-md bg-[#FFA000] hover:bg-[#FB8C00] 
            transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none
            mt-5 mb-8 md:translate-x-[5rem] md:mx-0"
          >
            <span className="relative z-10">¡Contáctanos!</span>
          </Link>
        </div>
      </main>
    </>
  );
}
