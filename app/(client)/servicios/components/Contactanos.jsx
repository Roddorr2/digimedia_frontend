import Image from 'next/image';

export default function Contactanos({ text, iconLeft, iconRight }) {
  return (
    <>
      <section className="bg-[#b525fe] text-white font-bold text-2xl uppercase text-center p-12 relative w-full left-1/2 -translate-x-1/2 ">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-white font-black text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight">
            {text}
          </h2>

          <button
            id="modal-button"
            className="bg-[#FF9F00] text-white px-10 py-4 rounded-2xl font-bold text-lg uppercase hover:opacity-90 transition-opacity shadow-2xl transform hover:scale-105 transition-transform"
          >
            Contáctanos Ahora
          </button>
        </div>

        <Image
          className="
    absolute bottom-0 
    left-[-380px] md:left-0
    pointer-events-none
  "
          src={iconLeft}
          alt="ilustración decorativa de líneas de conexión en el lado izquierdo"
          title="Elemento gráfico de conexión izquierda | Digimedia"
          width={450}
          height={160}
        />

        <Image
          className="
    absolute bottom-0 
    right-[-380px] md:right-0 
    pointer-events-none
  "
          src={iconRight}
          alt="ilustración decorativa de líneas de conexión en el lado izquierdo"
          title="Elemento gráfico de conexión derecha | Digimedia"
          width={450}
          height={160}
        />
      </section>
      <div className="w-full h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </>
  );
}
