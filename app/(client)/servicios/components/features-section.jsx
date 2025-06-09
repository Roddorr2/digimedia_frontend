export function FeaturesSection({ features }) {
  // Determine grid columns based on number of features
  const getGridCols = () => {
    if (features.length === 1) return "grid-cols-1 md:w-1/2 mx-auto"
    if (features.length <= 2) return "grid-cols-1 md:grid-cols-2"
    if (features.length <= 3) return "grid-cols-1 md:grid-cols-3"
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className={`grid ${getGridCols()} gap-12`}>
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              <div className="text-purple-700 mb-6 w-24 h-24">{feature.icon}</div>
              <div className="w-16 h-1 bg-[#ff037f] mb-4"></div>
              <h3 className="text-purple-700 uppercase text-sm font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-700 text-sm uppercase">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
