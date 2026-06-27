export const Hero = ({ backgroundImage, title, position = "center" }) => {
  return (
    <>
      <section
        className="
          relative 
          h-[300px]            
          md:h-[400px]         
          lg:h-[700px]         
          flex items-end justify-center
        "
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: position,
        }}
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />
        {/* Contenedor morado */}
       {/* Contenedor con degradado */}
<div
  className="
    bg-gradient-to-b
    from-[#100043]
    to-[#410C89]

    rounded-t-[2rem]
    md:rounded-t-[4rem]

    px-6
    md:px-16
    lg:px-32

    min-h-[120px]       
    md:min-h-[150px]    
    lg:min-h-[180px]    

    w-full
    max-w-[80%]
    md:max-w-[80%]
    lg:max-w-[40%]

    flex items-center justify-center
  "
>
  <h1
    className="
      text-[#FFB800] 
      text-3xl          
      md:text-5xl       
      lg:text-7xl       
      font-black 
      m-0 
      text-center
    "
  >
    {title}
  </h1>
</div>

        {/* decorativo */}
        <div
          className="
            absolute 
            bottom-4 right-4 mb-   
            md:bottom-5 md:right-10
            lg:right-20
            w-12 h-12           
            md:w-16 md:h-16
            lg:w-[82px] lg:h-[82px]
          "
        />
      </section>

    </>
  );
};
