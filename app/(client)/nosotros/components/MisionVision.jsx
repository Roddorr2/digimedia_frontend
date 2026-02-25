export const MisionVision = () => (
  <section className="py-20 bg-white">
    <div className="flex max-w-6xl mx-auto gap-10 items-stretch">
      <div className="flex-1 min-w-0">
        <img
          src="/Img-nosotros/mision_vision.png"
          alt="Nuestros servicios"
          className="w-full h-full object-cover rounded-tl-[2.5rem]"
        />
      </div>
      <div className="flex-[1.5] bg-[#FFA000] p-16 rounded-br-[2.5rem] flex flex-col gap-10">
        <div>
          <h3 className="text-white text-2xl font-black mb-4 tracking-wide">
            MISIÓN
          </h3>
          <p className="font-montserrat text-white text-xl leading-relaxed">
            Ser aliado de los emprendimientos en su posicionamiento digital;
            mediante la generación de contenido estratégico que garantice el
            cumplimiento de los objetivos planteados.
          </p>
        </div>
        <div>
          <h3 className="text-white text-2xl font-black mb-4 tracking-wide">
            VISIÓN
          </h3>
          <p className="font-montserrat text-white text-xl leading-relaxed">
            Liderar la transformación digital de las PYME en el Perú;
            estableciendo vínculos sólidos entre nuestros clientes y su
            respectiva audiencia.
          </p>
        </div>
      </div>
    </div>
  </section>
);
