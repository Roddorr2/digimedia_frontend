export const Hero = ({ backgroundImage, title }) => {
  return (
    <>
      <section
        className="
          relative 
          h-[300px]            
          md:h-[400px]         
          lg:h-[458px]         
          flex items-end justify-center
        "
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="
            bg-[#B326FF] 
            rounded-t-[2rem]
            md:rounded-t-[4rem]
            px-6 py-6           
            md:px-16 md:py-8    
            lg:px-32 lg:py-10   
          "
        >
          <h1
            className="
              text-white 
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

        <div
          className="
            absolute 
            bottom-4 right-4    
            md:bottom-5 md:right-10
            lg:right-20
            w-12 h-12           
            md:w-16 md:h-16
            lg:w-[82px] lg:h-[82px]
          "
        />
      </section>

      <div className="h-1" />
    </>
  );
};
