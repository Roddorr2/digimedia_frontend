import Image from "next/image";

export default function Testimonios() {
  return (
    // FONDO DEGRADADO: Aplicamos el linear-gradient con tu paleta de colores oscuros
    <section 
      className="w-full py-16 md:py-24 px-6 md:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #000118 0%, #100043 50%, #130049 100%)"
      }}
    >
      
      {/* CONTENIDO CENTRADO Y ALINEADO */}
      <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* TEXTO (A la izquierda en PC, arriba en móvil) */}
        <div className="text-white w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 md:order-1">
          <h2 className="text-lg md:text-2xl font-light mb-3 opacity-90 text-gray-200">
            ¿Primera vez con nosotros?
          </h2>

          <div className="flex flex-col font-black uppercase tracking-tighter">
            <span className="text-4xl md:text-[44px] lg:text-[54px] leading-[1.1]">
              ¡TE OFRECEMOS
            </span>
            <span className="text-4xl md:text-[44px] lg:text-[54px] leading-[1.1]">
              UNA ASESORÍA
            </span>

            {/* "GRATIS!" en color amarillo #ffb800 */}
            <div className="flex items-baseline justify-center md:justify-start mt-2">
              <span className="text-[#ffb800] text-5xl md:text-6xl lg:text-[72px] leading-none">
                GRATIS!
              </span>
            </div>
          </div>
        </div>

        {/* IMAGEN (A la derecha en PC, abajo en móvil) */}
        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end">
          <div
            className="
              relative w-full max-w-[550px]
              aspect-video md:aspect-[4/3]
              overflow-hidden
              rounded-[2rem] shadow-2xl border border-[#130049]/50
            "
          >
            {/* Overlay sutil oscuro sobre la imagen para mantener la estética oscura */}
            <div className="absolute inset-0 bg-[#100043]/20 mix-blend-multiply z-10 pointer-events-none"></div>
            
            <Image
              src="/optimized_images/image-home/opinionesNew.webp"
              alt="Personas conversando"
              fill
              className="object-cover object-center -scale-x-100"
              priority
              quality={80}
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}