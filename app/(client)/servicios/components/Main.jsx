import Image from 'next/image';

export default function Main({ title, subtitle, text, image, className = '' }) {
  return (
    <main className="bg-white py-16 md:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="text-[#b525fe] font-black text-4xl md:text-5xl lg:text-6xl mb-6">
              {title}
            </h1>
            <h2 className="text-[#FF9F00] font-bold text-xl my-2 uppercase md:text-2xl">
              {subtitle}
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-8">{text}</p>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src={image || '/placeholder.svg'}
                alt={`imagen de ${title}`}
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
