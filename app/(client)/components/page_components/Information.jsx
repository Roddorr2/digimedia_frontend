export const Information = ({ subtitle, description }) => (
  <section className="bg-[#B326FF] py-12 md:py-16 lg:py-20 text-center relative">
    <div className="max-w-3xl mx-auto px-4 md:px-6">
      <h2
        className="
        text-white 
        text-xl        
        md:text-2xl    
        lg:text-3xl    
        font-black 
        mb-4 md:mb-5
      "
      >
        {subtitle}
      </h2>

      <p
        className="
        text-white 
        text-base      
        md:text-lg     
        lg:text-xl     
        opacity-90
        leading-relaxed
      "
      >
        {description}
      </p>
    </div>
  </section>
);
