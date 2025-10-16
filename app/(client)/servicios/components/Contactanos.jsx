import Image from "next/image";

export default function Contactanos({ text, iconLeft, iconRight }) {
  return (
    <section className="bg-[#523194] text-white font-bold text-2xl uppercase text-center p-12 relative w-full left-1/2 -translate-x-1/2 ">
      <p className="mb-4 z-10 relative max-w-[600px] mx-auto">{text}</p>
      <button
        id="modal-button"
        className="bg-[#ff037f] p-4 inline-block rounded-2xl z-10 relative hover:bg-[#d0026e] hover:scale-105 transition-all"
      >
        CONTÁCTANOS AHORA
      </button>

      <Image
        className="absolute h-[160px] hidden md:block bottom-4 left-0"
        src={iconLeft}
        alt=""
        width={144}
        height={36}
      />
      <Image
        className="absolute h-[160px] hidden md:block bottom-4 right-0"
        src={iconRight}
        alt=""
        width={144}
        height={36}
      />
    </section>
  );
}
