export const QrDisplay = ({ qrData, isConnected, loading, connectionState }) => {
  if (loading) return <div>Cargando instancia de WhatsApp...</div>;
  if (isConnected) return <div className="text-green-500">✅ WhatsApp Conectado</div>;

  // ✅ Mostrar estado de reconexión
  if (connectionState?.status === 'reconnecting') {
    return (
      <div className="p-6 border rounded-xl bg-blue-50 shadow-lg text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
        <h3 className="text-lg font-bold mb-2 text-blue-700">🔄 Reconectando...</h3>
        <p className="text-sm text-blue-600">
          {connectionState?.message || 'Intentando reconectar con credenciales existentes...'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-xl bg-white shadow-lg text-center">
      <h3 className="text-lg font-bold mb-4">Escanea el código QR</h3>
      
      {/* ✅ Mensajes contextuales según el tipo de desconexión */}
      {connectionState?.status === 'logged_out' && (
        <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
          <p className="text-sm text-yellow-700">⚠️ La sesión fue cerrada desde el teléfono.</p>
        </div>
      )}
      {connectionState?.status === 'bad_session' && (
        <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
          <p className="text-sm text-yellow-700">⚠️ La sesión anterior era inválida.</p>
        </div>
      )}
      {connectionState?.status === 'connection_replaced' && (
        <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
          <p className="text-sm text-yellow-700">⚠️ La conexión fue reemplazada desde otro dispositivo.</p>
        </div>
      )}
      
      {qrData?.image ? (
        <img src={qrData.image} alt="WhatsApp QR" className="mx-auto" />
      ) : (
        <p>Generando código...</p>
      )}
      {qrData?.timeRemaining && (
        <p className="text-sm mt-2 text-gray-500">Expira en {qrData.timeRemaining}s</p>
      )}
    </div>
  );
};