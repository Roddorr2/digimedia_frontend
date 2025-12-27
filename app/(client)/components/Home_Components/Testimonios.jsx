import Image from "next/image";

export default function Testimonios() {
  return (
    <section className="flex flex-col md:flex-row w-full bg-[#b226ff] overflow-hidden">
      <div className="w-full md:w-[50%] bg-[#b226ff] order-1 md:order-2">
        <div className="relative w-full h-[280px] md:h-[400px] overflow-hidden 
          rounded-b-[60px]  md:rounded-l-[60px] bg-white">
          <Image
            src="/image-home/opiniones.jpg"
            alt="Personas conversando"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="text-white w-full md:w-[50%] p-10 md:p-16 md:pl-24 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 md:order-1">
        <h2 className="text-lg md:text-3xl text-center font-normal mb-2 opacity-90">
          ¿Primera vez con nosotros?
        </h2>
        <div className="flex flex-col font-black uppercase tracking-tighter">
          <span className="text-4xl md:text-6xl ">¡TE OFRECEMOS</span>
          <span className="text-4xl md:text-6xl ">UNA ASESORÍA</span>
          <div className="flex items-baseline justify-center md:justify-start mt-1">
            <span className="text-[#ff9f00] text-6xl md:text-8xl leading-none">
              GRATIS!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}