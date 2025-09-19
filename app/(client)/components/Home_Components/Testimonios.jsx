export default function Testimonios() {
  return (
    <section className="flex flex-col md:flex-row">
      <div className="bg-[#90388B] text-white w-full py-6 px-12 md:w-1/2 flex flex-col justify-center">
        <h2 className="text-2xl">TESTIMONIOS</h2>
        <p className="text-5xl font-semibold mt-4">
          NUESTROS CLIENTES
          <span className="text-[#FCEE21] block font-extrabold text-7xl">
            OPINAN
          </span>
        </p>
      </div>
      <div className="w-full md:w-1/2">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/image-home/opinions_mobile.avif"
          />
          <img
            src="/image-home/opinions.webp"
            alt="imagen de un grupo de personas conversando en una mesa en un dia soleado"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  );
}
