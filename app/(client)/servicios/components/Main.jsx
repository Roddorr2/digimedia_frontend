import Image from "next/image";

export default function Main({ title, subtitle, text, image, className = "" }) {
  return (
    <main
      className={`flex flex-col-reverse items-center justify-between max-w-7xl m-auto md:flex-row px-5 py-8 md:px-24 md:py-24 gap-0 md:gap-12 ${className}`}
    >
      <div className="text-center md:text-left md:max-w-xl w-full mt-0 md:mt-0">
        <h1 className="text-[#523194] font-semibold text-3xl my-4 font-title md:text-5xl">{title}</h1>
        <h2 className="text-[#ff037f] font-semibold text-1xl my-2 uppercase md:text-xl">{subtitle}</h2>
        <p className="text-justify font-bold uppercase text-2xs">{text}</p>
      </div>
      <Image className="mb-4 md:mb-0" src={image || "/placeholder.svg"} alt={`imagen de ${title}`} width={500} height={500} />
    </main>
  )
}
