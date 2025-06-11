export function HeroSection
({ title,
  mainDescription = "Descripción principal del servicio",
   bulletPoints,
    backgroundImageUrl = "/placeholder.svg?height=600&width=1200" }) {

   return (
    <section className="relative w-full overflow-hidden bg-purple-950 text-[#523194] uppercase font-bold">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/20 to-transparent z-10" />
        <img src={backgroundImageUrl || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#523194] uppercase border-b-4 border-[#ff037f] pb-2 inline-block">
            {title}
          </h2>

          <div className="space-y-4 mt-8">
            {/* Main description */}
            <p className="text-base md:text-lg font-medium">{mainDescription}</p>

            {/* Indented bullet points */}
            <div className="pl-6 space-y-4">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-[#523194] mr-2 text-xl">•</span>
                  <p className="text-sm md:text-base">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
