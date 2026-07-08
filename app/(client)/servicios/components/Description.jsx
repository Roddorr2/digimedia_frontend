export default function Description({ title, text }) {
  return (
    <section className="py-16 md:py-20" style={{ background: "radial-gradient(circle at center, #000000 3%, #120048 100%)" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-semibold mb-6" style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#FFB800", fontSize: "35px" }}>
          {title}
        </h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#FFFFFF", fontSize: "24px" }}>
          {text}
        </p>
      </div>
    </section>
  );
}
