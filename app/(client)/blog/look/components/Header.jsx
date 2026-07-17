import Image from "next/image";

export default function Header({
  url_image,
  tituloPrincipal = "TU BAR EN LA MIRA",
  tituloSecundario = "El Letro Perfecto para Cautivar a los Clientes",
  descripcion = "Haz que tu bar sea tu mejor amigo en la mira de tus clientes",
  backgroundOverlay = "bg-black/50",
  tituloClase = "text-3xl md:text-8xl font-extrabold mb-4 neon-textov4",
  subtituloClase = "text-xl md:text-4xl font-bold mb-4",
  descripcionClase = "text-base md:text-2xl text-gray-200 font-light",
  decoracion = true,
}) {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 overflow-hidden">
      
      {/* Imagen como background */}
      <Image
        src={url_image}
        alt={tituloSecundario}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${backgroundOverlay}`}></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl text-white md:text-center">
        <h1 className={tituloClase}>{tituloPrincipal}</h1>
        <h2 className={subtituloClase}>{tituloSecundario}</h2>
        <p className={descripcionClase}>{descripcion}</p>
        {decoracion && (
          <div className="absolute right-0 w-20 h-1 bg-white mt-6 mx-auto"></div>
        )}
      </div>
    </div>
  );
}
