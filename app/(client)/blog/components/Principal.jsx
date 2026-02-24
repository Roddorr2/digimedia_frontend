import Image from "next/image";

export default function Principal() {
  return (
    <section className="relative w-full bg-[#efefef]">
      <div className="relative w-full h-[230px] sm:h-[290px] md:h-[600px] overflow-hidden">
        <Image
          src="/blog/fondo.webp"
          alt="Fondo del blog Digimedia"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 md:-bottom-10 z-10 w-[90%] max-w-[520px] bg-[#b525fe] rounded-t-[38px] rounded-b-[10px] py-4 md:py-5 text-center shadow-md">
        <h1 className="text-white text-4xl md:text-5xl leading-none tracking-wide">
          BLOG
        </h1>
      </div>
    </section>
  );
}
