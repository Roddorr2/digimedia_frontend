import Image from "next/image";

export default function Main({
  title,
  subtitle,
  text,
  image,
  alt,
  titleAttr,
  className = "",
}) {
  return (
    <main className="py-16 md:py-24" style={{ background: "linear-gradient(0deg, #200E59 0%, #170C40 50%, #200769 100%)" }}>
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
<h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {title}
            </h1>
            <h2 className="text-[#FF9F00] font-semibold text-xl my-2 uppercase md:text-2xl" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              {subtitle}
            </h2>
            <p className="text-white text-base md:text-lg mb-8" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{text}</p>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src={image || "/placeholder.svg"}
                title={titleAttr || ""}
                alt={alt || `Imagen del servicio ${title}`}
                width={480}
                height={480}
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
