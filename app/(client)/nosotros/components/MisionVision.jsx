export const MisionVision = () => (
  <section className="py-10 md:py-20 bg-white px-6 md:px-0">
    
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-0 md:gap-10 items-stretch overflow-hidden">
      
      
      <div className="flex-1 min-w-0">
        <img
          src="/Img-nosotros/mision_vision.png"
          alt="Nuestros servicios"
          
          className="w-full h-full object-cover rounded-tl-[4rem] md:rounded-bl-[2.5rem]"
        />
      </div>

      
      <div className="flex-[1.5] bg-[#FFA000] p-10 md:p-16 flex flex-col gap-10 
                      rounded-br-[5rem] md:rounded-br-[2.5rem] 
                      md:rounded-tr-[2.5rem]">
        <div>
          <h3 className="text-white text-2xl md:text-3xl font-black mb-4 tracking-wide">
            MISIÓN
          </h3>
          <p className="font-montserrat text-white text-lg md:text-xl leading-relaxed">
            Ser aliado de los emprendimientos en su posicionamiento digital;
            mediante la generación de contenido estratégico que garantice el
            cumplimiento de los objetivos planteados.
          </p>
        </div>
        
        <div>
          <h3 className="text-white text-2xl md:text-3xl font-black mb-4 tracking-wide">
            VISIÓN
          </h3>
          <p className="font-montserrat text-white text-lg md:text-xl leading-relaxed">
            Liderar la transformación digital de las PYME en el Perú;
            estableciendo vínculos sólidos entre nuestros clientes y su
            respectiva audiencia.
          </p>
        </div>
      </div>
    </div>
  </section>
);