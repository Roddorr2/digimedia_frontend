import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body1 from "../components/Body1";

export default function Page() {
  return (
    <div>
      <Header url_image="/blog/Blog4_header.webp" />

      <div className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,_#060126_0%,_#0A0140_50%,_#5A37A6_100%)] text-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <Body1 />

          <Footer
            url_image1="/blog/blog-5.webp"
            url_image2="/blog/blog-8.webp"
            url_image3="/blog/blog-2.webp"
            descripcion="El letrero de neón LED es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local. Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local."
          />
        </div>
      </div>
    </div>
  );
}
