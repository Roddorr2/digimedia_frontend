import Link from 'next/link';

export default function Contactanos({ text }) {
  return (
    <>
      <section className="bg-[#b525fe] text-white font-bold text-2xl uppercase text-center p-12 relative w-full left-1/2 -translate-x-1/2">
        {/* SVG izquierdo */}
        <div className="absolute -left-40 sm:-left-32 md:-left-20 lg:left-0 top-1/2 -translate-y-1/2">
          <svg
            viewBox="0 0 200 120"
            className="w-40 md:w-52 lg:w-64 h-auto text-white"
            stroke="currentColor"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <line x1="0" y1="20" x2="160" y2="20" />
            <circle cx="160" cy="20" r="6" fill="white" />

            <line x1="0" y1="50" x2="190" y2="50" />
            <circle cx="190" cy="50" r="6" fill="white" />

            <path d="M0 80 H60 L80 100 H170" />
            <circle cx="170" cy="100" r="6" fill="white" />

            <line x1="0" y1="110" x2="100" y2="110" />
          </svg>
        </div>

        {/* Contenido central */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-white font-black text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight">
            {text}
          </h2>
          {/* englobe la etiqueta button en link y agregue redireccionamiento para poder hacer que el boton tenga funcionalidad y no este vacio  */}
          <Link href="/contactanos" >
            <button  
              id="modal-button"
              className="bg-[#FF9F00] text-white px-10 py-4 rounded-2xl font-bold text-lg uppercase hover:opacity-90 transition-opacity shadow-2xl transform hover:scale-105 transition-transform mb-12"
            >
              Contáctanos Ahora
            </button>
          </Link>
          
        </div>

        {/* SVG derecho */}
        <div className="absolute -right-40 sm:-right-32 md:-right-20 lg:right-0 top-1/2 -translate-y-1/2 z-0">
          <svg
            viewBox="0 0 220 140"
            className="w-40 md:w-52 lg:w-64 h-auto text-white"
            stroke="currentColor"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="70" y1="30" x2="220" y2="30" />
            <circle cx="70" cy="30" r="6" fill="white" />

            <path d="M220 65 H150 L130 45 H70" />
            <circle cx="70" cy="45" r="6" fill="white" />

            <line x1="30" y1="105" x2="220" y2="105" />
            <circle cx="30" cy="105" r="6" fill="white" />
          </svg>
        </div>
      </section>
      <div className="w-full h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </>
  );
}
