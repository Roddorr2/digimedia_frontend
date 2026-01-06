export function FeaturesSection({ features }) {
  return (
    <section className="bg-white py-20 pt-0">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => {
            const bgColor = index === 0 ? 'bg-[#F89319]' : 'bg-[#B326FF]';

            return (
              <div
                key={index}
                className={`${bgColor} rounded-3xl shadow-lg px-10 py-10 flex flex-col items-center text-center`}
              >
                <div className="mb-6 w-24 h-24 flex items-center justify-center">
                  {feature.icon}
                </div>

                <h3 className="text-white font-bold uppercase text-sm tracking-widest mb-4">
                  {feature.title}
                </h3>

                <p className="text-white text-sm leading-relaxed max-w-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
