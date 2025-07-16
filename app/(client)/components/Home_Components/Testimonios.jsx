import Image from "next/image";

export default function Testimonios() {
  return (
    <section className="flex flex-col md:flex-row">
      <div className="bg-[#90388B] text-white w-full py-6 px-12 md:w-1/2 flex flex-col justify-center">
        <h3 className="text-2xl">TESTIMONIOS</h3>
        <p className="text-5xl font-semibold mt-4">
          NUESTROS CLIENTES
          <span className="text-[#FCEE21] block font-extrabold text-7xl">
            OPINAN
          </span>
        </p>
      </div>
      <div className="w-full md:w-1/2">
                <Image
  src="/image-home/opinions.webp"
    alt="imagen de un grupo de personas conversando en una mesa en un dia soleado "
  width={600}
  height={300}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="w-full h-full object-cover"
  loading="lazy"
/>
      </div>
    </section>
  );
}