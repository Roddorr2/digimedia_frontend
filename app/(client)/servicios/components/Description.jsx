export default function Description({ title, text }) {
  return (
    <section className="bg-[#B326FF] text-white w-full relative left-1/2 -translate-x-1/2">
      <div className="max-w-6xl m-auto p-10 px-5 md:py-16 md:px-10">
        <h2 className="font-bold text-xl mb-2 font-title">{title}</h2>
        <p className="font-bold text-justify uppercase">{text}</p>
      </div>
    </section>
  );
}
