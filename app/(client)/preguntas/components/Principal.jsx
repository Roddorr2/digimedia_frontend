import Image from "next/image";

export default function Principal() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/5 to-emerald-700/90 z-10"></div>

      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/30 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute top-40 right-40 w-40 h-40 rounded-full bg-teal-300/30 blur-2xl"></div>
      </div>

      <Image
        src="/faq/fondo.webp"
        alt="Fondo de preguntas frecuentes"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        layout="fill"
        objectFit="cover"
      />
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40">
        <div className="text-center">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Preguntas Frecuentes
          </h1>
          <p className="text-teal-50 text-lg sm:text-xl max-w-2xl mx-auto">
            Encuentra respuestas a las dudas más comunes sobre nuestros
            servicios de marketing digital y desarrollo web.
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar una pregunta..."
              className="w-full py-4 px-6 pr-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              title="search"
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
