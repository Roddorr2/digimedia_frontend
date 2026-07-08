const InfoCard = () => (
  <div className="relative z-20 w-full flex justify-center px-4 sm:px-6 -mt-14 sm:-mt-20 md:-mt-24 lg:-mt-28 mb-10 md:mb-12 lg:mb-10">
    <div
      className="relative overflow-hidden w-full max-w-[1224px] rounded-[24px] sm:rounded-[32px] md:rounded-[41px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-6 pt-8 pb-7 sm:px-10 sm:pt-10 sm:pb-8 md:px-16 md:pt-12 md:pb-9 lg:pt-12 lg:pb-8 text-center"
      style={{ background: "linear-gradient(90deg, #01011A 0%, #120048 100%)" }}
    >
      {/* Línea decorativa degradada superior */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(65,12,137,0) 0%, #5F00DF 50%, rgba(65,12,137,0) 100%)",
        }}
      />

      <h2
        className="font-[family-name:var(--font-hanken-grotesk)] font-semibold text-[#FFB800] mb-3 md:mb-4"
        style={{ fontSize: "clamp(1.375rem, 1.6vw + 1rem, 2.1875rem)" }}
      >
        SOLUCIONAMOS TUS DUDAS
      </h2>
      <p
        className="font-[family-name:var(--font-montserrat)] font-normal text-[#CCC3D4] mx-auto"
        style={{
          fontSize: "clamp(1rem, 0.8vw + 0.75rem, 1.5rem)",
          lineHeight: 1.3,
          maxWidth: "650px",
        }}
      >
        Responderemos tus dudas a la brevedad, envíanos un mensaje con tus consultas o dudas.
      </p>
    </div>
  </div>
);

export default InfoCard;
