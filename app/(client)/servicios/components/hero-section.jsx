import Image from 'next/image';

export function HeroSection({
  category = 'Diseño y desarrollo web',
  title = 'DISEÑO UX Y UI',
  description,
  bulletPoints = [],
  imageUrl,
  imageAlt = '',
}) {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-4">
          {/* Card izquierda (imagen) */}
          <div className="relative h-[450px] md:h-auto overflow-hidden rounded-tl-[60px]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover -scale-x-100"
            />
          </div>

          {/* Card derecha */}
          <div className="bg-[#B326FF] text-white p-8 md:p-28 flex flex-col justify-center rounded-br-[60px]">
            <span className="text-lg mb-4 opacity-90">‹ {category}</span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              {title}
            </h1>

            <p className="text-base md:text-lg mb-6 opacity-95">
              {description}
            </p>

            <ul className="space-y-3">
              {bulletPoints.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
