export default function Principal() {
    return (
        <>
            <div className="relative w-[100%] h-[calc(100vh-67px)] object-cover overflow-hidden">
                <img
                    src="/blog/fondo.webp"
                    alt="Logo de digimedia"
                    className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover w-[100%] inset-0 z-0"
                />
                <img
                    src="/blog/fondo-tablet.webp"
                    alt="Logo de digimedia"
                    className="hidden sm:block lg:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover w-[100%] inset-0 z-0"
                />
                <img
                    src="/blog/fondo-mobiles.webp"
                    alt="Logo de digimedia"
                    className="block sm:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover h-full w-[100%] inset-0 z-0"
                />

                <div className="absolute flex justify-center items-center z-1 inset-0 w-[100%] h-[100%] bg-black bg-opacity-50">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-white tracking-[10px] text-[10px] sm:text-[15px] lg:text-[20px]">DIGIMEDIA</h2>
                        <h1 className="text-white tracking-widest text-[54px] sm:text-[100px] lg:text-[170px]">BLOG</h1>
                    {/*<button className="text-white text-[10px] lg:text-[20px] border-solid border-2 border-white p-4 hover:bg-black transition-all duration-500">COMIENZA YA</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}