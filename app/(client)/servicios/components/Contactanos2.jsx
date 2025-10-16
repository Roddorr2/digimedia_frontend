export default function Contactanos2({ text, iconLeft, iconRight }) {
  return (
    <section className="bg-[#7b22b3] text-white font-bold text-3xl text-center p-12 relative">
      <p className="mb-8 z-10 relative">{text}</p>
      <button
        id="modal-button"
        className="bg-[#ff037f] p-4 inline-block rounded-2xl z-10 relative hover:bg-[#d0026e] hover:scale-105 transition-all"
      >
        Contáctanos ahora
      </button>

      <Image
        className="absolute h-[160px] hidden md:block bottom-4 right-0"
        src={iconRight}
        alt=""
        width={144}
        height={36}
      />
      <Image
        className="absolute h-[160px] hidden md:block bottom-4 left-0"
        src={iconLeft}
        alt=""
        width={144}
        height={36}
      />
    </section>
  );
}
