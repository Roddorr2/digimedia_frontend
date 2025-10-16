import Image from "next/image";

export default function Footer({
  url_image1,
  url_image2,
  url_image3,
  descripcion,
}) {
  return (
    <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500"></div>

        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-400/20 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/20 rounded-tr-lg"></div>

        <div className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 relative">
            CONCLUSIONES
            <span className="block h-0.5 w-16 bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30 mx-auto mt-2"></span>
          </h3>

          <p className="text-gray-100 text-base leading-relaxed max-w-3xl mx-auto mb-6 text-center">
            {descripcion}
          </p>

          {
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {[url_image1, url_image2, url_image3].map((image, index) => {
                return (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>

                    <Image
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      className="w-48 h-36 object-cover rounded-lg border border-white/10 group-hover:border-sky-400/50 transition-all duration-300 shadow-md relative z-10"
                      width={200}
                      height={150}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg z-20 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          }

          <div className="flex justify-center mt-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
