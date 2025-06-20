'use client';

const WhatsAppButton = () => {
  const phoneNumber = '51983027828';
  const message = 'Hola, me gustaría obtener más información sobre sus servicios.';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300 z-50"
      aria-label="Chat on WhatsApp"
    >
      <img 
        src="/image-home/whatsapp-icon.svg"  // Ruta actualizada
        alt="Icono de WhatsApp color blanco con fondo oscuro"
        width="40"
        height="40"
      />
    </a>
  );
};

export default WhatsAppButton;