export const Information = ({ subtitle, description }) => (
  <section className="bg-[#B326FF] py-12 md:py-16 lg:py-20 text-center relative">
    <div className="absolute -left-28 sm:-left-20 md:left-0 top-1/2 -translate-y-1/2">
      <svg
        viewBox="0 0 200 120"
        className="w-40 md:w-52 lg:w-64 h-auto text-white"
        stroke="currentColor"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <line x1="0" y1="20" x2="160" y2="20" />
        <circle cx="160" cy="20" r="6" fill="white" />

        <line x1="0" y1="50" x2="190" y2="50" />
        <circle cx="190" cy="50" r="6" fill="white" />

        <path d="M0 80 H60 L80 100 H170" />
        <circle cx="170" cy="100" r="6" fill="white" />

        <line x1="0" y1="110" x2="100" y2="110" />
      </svg>
    </div>

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

    <div className="absolute -right-28 sm:-right-20 md:right-0 top-1/2 -translate-y-1/2">
      <svg
        viewBox="0 0 220 140"
        className="w-40 md:w-52 lg:w-64 h-auto text-white"
        stroke="currentColor"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="70" y1="30" x2="220" y2="30" />
        <circle cx="70" cy="30" r="6" fill="white" />

        <path d="M220 65 H150 L130 45 H70" />
        <circle cx="70" cy="45" r="6" fill="white" />

        <line x1="30" y1="105" x2="220" y2="105" />
        <circle cx="30" cy="105" r="6" fill="white" />
      </svg>
    </div>
  </section>
);
