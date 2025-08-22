import Link from "next/link";
import styles from "./servicios.module.css"

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
          <Servicio
            key={index}
            title={servicio.title}
            text={servicio.text}
            icon={servicio.icon}
            ruta={servicio.ruta}
          />
        ))}
      </div>
    </section>
  );
}

function Servicio({ title, text, icon, ruta }) {
  const rutaValida = ruta ? `${ruta}` : "/";
  return (
    <div className="relative bg-gradient-to-br from-[#523194] to-[#7B22B3] text-white rounded-3xl py-8 px-2 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 basis-64 flex-1 shrink-0 min-[832px]:max-[1118px]:basis-96 group overflow-hidden h-[450px]">
      <Link
        href={rutaValida}
        className="grid grid-cols-1 grid-rows-[120px_100px_1px_100%] items-center h-full w-full"
      >
        {/* Efecto de brillo */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FF037F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

        {/* Ícono con animación de rebote */}
        <figure className="flex h-full justify-center align-middle py-3">
          <img
            className={`max-w-36 w-24 h-24 object-contain ${styles["animate-bounce-slow"]}`}
            src={icon || "/placeholder.svg"}
            alt={title}
          />
        </figure>

        {/* Título con altura fija y truncamiento */}
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h4 className="font-bold text-lg text-center font-title relative z-10 flex items-center justify-center">
            {title}
          </h4>
        </div>
        <span className="block text-center w-full h-1 bg-[#FF037F] mt-1 rounded-full justify-center"></span>

        {/* Descripción con altura fija y scroll si es necesario */}
        <div className="h-full p-4 flex-grow  w-full">
          <p className="text-xs text-center leading-relaxed relative z-10 uppercase p-4">
            {text}
          </p>
        </div>
      </Link>
    </div>
  );
}
