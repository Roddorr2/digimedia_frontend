import Link from "next/link"

export default function Servicios({ servicios }) {
  return (
    <section className="p-4 max-w-6xl m-auto md:py-16">
      {/* Título principal */}
      <h3 className="font-bold text-3xl md:text-4xl text-center mb-12 mt-10 md:mt-2 text-[#523194] font-title relative uppercase">
        Nuestros Subservicios
        <span className="absolute bottom-0 left-1/2 w-[20rem] md:w-[27rem] h-1 md:h-1.5 bg-[#FF037F] transform -translate-x-1/2 rounded-full"></span>
      </h3>

      {/* Contenedor de los servicios */}
      <div className="flex flex-wrap justify-center gap-8">
        {servicios?.map((servicio, index) => (
          <Servicio key={index} title={servicio.title} text={servicio.text} icon={servicio.icon} ruta={servicio.ruta} />
        ))}
      </div>
    </section>
  )
}

function Servicio({ title, text, icon, ruta }) {
  const rutaValida = ruta ? `${ruta}` : "/"
  return (
    <div className="relative bg-gradient-to-br from-[#523194] to-[#7B22B3] text-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center justify-between gap-4 basis-64 flex-1 shrink-0 min-[832px]:max-[1118px]:basis-96 group overflow-hidden h-[420px]">
      <Link href={rutaValida} className="flex flex-col items-center justify-between h-full w-full">
        {/* Efecto de brillo */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FF037F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

        {/* Ícono con animación de rebote */}
        <figure className="flex justify-center align-middle py-3">
          <img
            className="max-w-36 w-24 h-24 object-contain animate-bounce-slow"
            src={icon || "/placeholder.svg"}
            alt={title}
          />
        </figure>

        {/* Título con altura fija y truncamiento */}
        <div className="w-full flex-shrink-0 flex flex-col items-center">
          <h4 className="font-bold text-2xl text-center font-title relative z-10 line-clamp-2 h-[60px] flex items-center justify-center">
            {title}
          </h4>
          <span className="block w-60 h-1 bg-[#FF037F] mt-1 rounded-full"></span>
        </div>

        {/* Descripción con altura fija y scroll si es necesario */}
        <div className="flex-grow overflow-auto w-full my-4 max-h-[160px] scrollbar-thin scrollbar-thumb-[#FF037F] scrollbar-track-transparent">
          <p className="text-xs text-center leading-relaxed relative z-10 uppercase">{text}</p>
        </div>
      </Link>
    </div>
  )
}
