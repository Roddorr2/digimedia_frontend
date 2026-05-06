import Image from 'next/image';

const WhatsAppButton = () => {
  const phoneNumber = '51983027828';
  const message =
    'Hola, me gustaría obtener más información sobre sus servicios.';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 md:bottom-10 md:right-10 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-50"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/image-home/WhatsApp.svg.webp"
        title='Botón de WhatsApp'
        alt="Icono de WhatsApp color blanco con fondo oscuro"
        width={60}
        height={60}
        priority={false}
        sizes="(max-width: 768px) 50px, 60px"
      />
    </a>
  );
};

export default WhatsAppButton;
