export default function Description({ title, text }) {
  return (
    <section className="bg-[#9D22FB] py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-white font-bold text-xl md:text-1xl lg:text-2xl mb-6">
          {title}
        </h2>
        <p className="text-white text-base md:text-lg leading-relaxed">
          {text}
        </p>
      </div>
    </section>
  );
}
