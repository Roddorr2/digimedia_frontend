import Image from 'next/image';

export default function Testimonios() {
  return (
    // FONDO FULL WIDTH
    <section className="w-full bg-[#b226ff] overflow-hidden">
      {/* CONTENIDO CENTRADO */}
      <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row md:items-stretch md:gap-10">
        {/* Imagen */}
        <div className="w-full md:w-[55%] order-1 md:order-2 flex">
          <div
            className="
              relative w-full overflow-hidden
              h-[280px] sm:h-[340px]
              md:h-full md:min-h-[420px]
              py-px
              rounded-b-[60px]
              md:rounded-none md:rounded-l-[60px]
            "
          >
            <Image
              src="/optimized_images/image-home/opiniones.avif"
              alt="Personas conversando"
              fill
              className="object-cover object-center -scale-x-100"
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
        </div>

        {/* Texto */}
        {/* <div className=" text-white w-full md:w-[45%] py-16 lg:py-24 px-6 flex flex-col justify-center items-start text-left order-2 md:order-1 min-w-0"> */}
        <div className="text-white w-full md:w-[55%] py-12 md:py-16 lg:py-24 px-6 flex flex-col justify-center items-center text-center md:items-start md:text-left order-2 md:order-1 min-w-0">
          <h2 className="text-lg md:text-2xl font-normal mb-2 opacity-90">
            ¿Primera vez con nosotros?
          </h2>

          <div className="flex flex-col font-black uppercase tracking-tighter">
            <span className="text-4xl md:text-[44px] lg:text-5xl leading-[1.05]">
              ¡TE OFRECEMOS
            </span>
            <span className="text-4xl md:text-[44px] lg:text-5xl leading-[1.05]">
              UNA ASESORÍA
            </span>

            <div className="flex items-baseline justify-center md:justify-start mt-1">
              <span className="text-[#ff9f00] text-4xl md:text-5xl lg:text-7xl leading-none">
                GRATIS!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
