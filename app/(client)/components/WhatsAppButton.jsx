import Image from "next/image";

const WhatsAppButton = () => {
  const phoneNumber = '51983027828';
  const message = 'Hola, me gustaría obtener más información sobre sus servicios.';
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 mb-24 mr-16 p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300 z-50"
      aria-label="Chat on WhatsApp"
    >
      <Image 
        src="/image-home/WhatsApp.svg.webp"  
        alt="Icono de WhatsApp color blanco con fondo oscuro"
        width={60}
        height={60}
        priority={true} 
      />
    </a>
  );
};

export default WhatsAppButton;