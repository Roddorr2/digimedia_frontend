import Image from "next/image";

export default function Principal() {
  return (
    <section className="relative w-screen h-[calc(100vh-67px)] overflow-hidden">
      {/* Imagen de fondo responsive */}
      <Image
        src="/blog/fondo.webp"
        alt="Fondo del blog Digimedia"
        fill
        className="object-cover object-center" // se adapta manteniendo proporción
        priority
      />

      {/* Capa oscura y contenido centrado */}
      <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-10">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-white tracking-[10px] text-xs sm:text-sm lg:text-lg">
            DIGIMEDIA
          </h2>
          <h1 className="text-white tracking-widest text-5xl sm:text-7xl lg:text-[170px] leading-tight">
            BLOG
          </h1>
          {/* <button className="text-white text-xs lg:text-lg border-2 border-white px-6 py-3 mt-4 hover:bg-black transition-all duration-500">
            COMIENZA YA
          </button> */}
        </div>
      </div>
    </section>
  );
}
