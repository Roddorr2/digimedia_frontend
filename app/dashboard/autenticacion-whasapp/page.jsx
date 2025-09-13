"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
// import MessageSender from "./MessageSender";
import { getCookie } from "cookies-next";
import styles from "./autenticacion-whasapp.module.css";

const Dashboard = ({ user, onLogout }) => {
  // Estados principales
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({
    hasActiveQR: false,
    isConnected: false,
    qrInfo: null,
    connectionState: {},
  });
  const [notifications, setNotifications] = useState([]);
  const [qrString, setQrString] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  // Referencias
  const countdownRef = useRef(null);
  const socketRef = useRef(null);
  const apiBaseUrl =
    import.meta.env?.VITE_API_BASE_URL || "http://localhost:5111";
  const token = localStorage.getItem("token");

  // Formatear tiempo
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const timeString = `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

    let className = "time-normal";
    if (seconds <= 10) className = "time-critical";
    else if (seconds <= 30) className = "time-warning";

    return { timeString, className };
  };

  // Agregar notificación
  const addNotification = (message, type = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`; // ID más único
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  // Manejar mensaje enviado exitosamente
  const handleMessageSent = (messageData) => {
    setSentMessages((prev) => [messageData, ...prev.slice(0, 9)]); // Mantener solo los últimos 10
    addNotification(
      `Mensaje enviado exitosamente a ${messageData.phone}`,
      "success"
    );
  };

  const handleResetAuth = async (e) => {
    try {
      setLoading(true);

      // Llamada directa al backend
      const response = await fetch(`${apiBaseUrl}/api/auth/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        addNotification("Carpeta Auth eliminada correctamente", "success");
        // Actualizar el estado después de eliminar auth
        setTimeout(() => {
          getStatus();
        }, 1000);
      } else {
        setError(data.message || "Error al eliminar la carpeta auth");
      }
    } catch (err) {
      console.log(err);
      setError(
        "Error de conexión. Verifica que el backend esté funcionando en el puerto 5111."
      );
    } finally {
      setLoading(false);
    }
  };

  // Verificar estado de auth
  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth-status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        if (data.authStatus.exists) {
          addNotification(
            `Carpeta auth_info existe (${data.authStatus.details.size} bytes)`,
            "info"
          );
        } else {
          addNotification("Carpeta auth_info no existe", "warning");
        }
      } else {
        setError(data.message || "Error al verificar estado de auth");
      }
    } catch (err) {
      console.log(err);
      setError("Error de conexión al verificar estado de auth");
    }
  };

  // Conectar WebSocket
  const connectWebSocket = useCallback(() => {
    // if (!token || socketRef.current?.connected) return;
    console.log("a");
    try {
      console.log("b");
      console.log("🔌 Conectando WebSocket...");

      const socket = io(apiBaseUrl, {
        // auth: { token: token },
        auth: {
          key: "admin123",
        },
        reconnectionAttempts: 5,
        reconnectionDelay: 2000, // Aumentado a 2 segundos
        reconnectionDelayMax: 5000,
        maxReconnectionAttempts: 3,
        timeout: 10000,
        transports: ["websocket"],
        forceNew: true, // Fuerza una nueva conexión
      });

      socket.on("connect", () => {
        console.log("c");

        console.log("✅ WebSocket conectado");
        addNotification("Conexión en tiempo real establecida", "success");
      });

      socket.on("disconnect", (reason) => {
        console.log("d");

        console.log("❌ WebSocket desconectado:", reason);

        // NO reconectes automáticamente - deja que socket.io maneje esto
        // Solo notifica al usuario
        if (reason === "io server disconnect") {
          addNotification("Servidor desconectado", "warning");
        } else if (reason === "io client disconnect") {
          addNotification("Desconectado por cliente", "info");
        } else {
          addNotification("Conexión perdida", "warning");
        }
      });

      socket.on("reconnect", (attemptNumber) => {
        console.log("e");

        console.log("🔄 Reconectado después de", attemptNumber, "intentos");
        addNotification("Reconectado exitosamente", "success");
      });

      socket.on("reconnect_error", (error) => {
        console.log("f");

        console.error("❌ Error de reconexión:", error);
        addNotification("Error al reconectar", "error");
      });

      socket.on("reconnect_failed", () => {
        console.log("g");

        console.error("❌ Falló la reconexión después de todos los intentos");
        addNotification("No se pudo reconectar. Recarga la página.", "error");
      });

      socket.on("connect_error", (err) => {
        console.log("h");

        console.error("❌ Error de conexión WebSocket:", err.message);
        addNotification(`Error de conexión: ${err.message}`, "error");
      });

      socket.on("qr-status-update", (status) => {
        console.log("i");

        console.log("📊 Actualización de estado:", status);
        handleStatusUpdate(status);
      });
      console.log("j");

      socketRef.current = socket;
    } catch (error) {
      console.log("k");

      console.error("❌ Error al conectar WebSocket:", error);
      addNotification("Error al conectar con el servidor", "error");
    }
  }, [token, apiBaseUrl]);

  // Desconectar WebSocket
  const disconnectWebSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.removeAllListeners(); // Limpia todos los listeners
      socketRef.current.disconnect();
      socketRef.current = null;
      console.log("❌ WebSocket desconectado y limpiado");
    }
  }, []);

  // Manejar actualizaciones de estado
  const handleStatusUpdate = useCallback((data) => {
    console.log("📊 Actualizando estado:", data);

    setConnectionStatus((prev) => ({
      ...prev,
      hasActiveQR: data.hasActiveQR || false,
      isConnected: data.isConnected || false,
      qrInfo: data.qrData || null,
      connectionState: data.connectionState || {},
    }));

    setTokenExpired(false);
    setError("");

    if (data.qrData?.image) {
      setQrData({
        qrCode: data.qrData.image,
        expiresAt: data.qrData.expiresAt,
        createdAt: data.qrData.createdAt,
      });

      const now = Date.now();
      const expiresAt = new Date(data.qrData.expiresAt).getTime();
      const remaining = Math.max(0, Math.floor((expiresAt - now) / 1000));

      console.log(`⏰ Tiempo restante calculado: ${remaining}s`);
      setTimeRemaining(remaining);

      if (remaining > 0) {
        startCountdown(remaining);
      } else {
        stopCountdown();
        setQrData(null);
      }
    } else {
      setQrData(null);
      stopCountdown();
      setTimeRemaining(0);
    }
  }, []);

  // Llamadas API reales
  const apiCall = useCallback(
    async (endpoint, options = {}) => {
      // if (!token) {
      //   setTokenExpired(true);
      //   setError("No hay token de autenticación");
      //   throw new Error("No token available");
      // }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${apiBaseUrl}${endpoint}`, {
          method: options.method || "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: options.body ? JSON.stringify(options.body) : undefined,
        });
        console.log(response);

        if (response.status === 401) {
          setTokenExpired(true);
          throw new Error("Token expirado");
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error en la solicitud");
        }

        return data;
      } catch (error) {
        console.error(`❌ Error en API ${endpoint}:`, error);
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [token, apiBaseUrl]
  );

  // Solicitar nuevo QR
  const requestNewQR = useCallback(async () => {
    try {
      //   const result = await apiCall("/api/qr-request", { method: "POST" });
      const user = getCookie("user");
      const username = getCookie("user")
        ? JSON.parse(getCookie("user")).email
        : null;

      console.log(username);
      console.log(getCookie("user"));
      const result = await apiCall("/api/qr-request-admin", {
        method: "POST",
        body: { username }, // 👈 se envía aquí
      });

      if (result.success && result.currentStatus) {
        // Actualizar el estado inmediatamente con la respuesta del servidor
        handleStatusUpdate(result.currentStatus);
        addNotification("Nuevo QR solicitado correctamente", "success");

        // Si el QR está procesándose, hacer polling cada 2 segundos hasta que se genere
        if (result.status === "processing") {
          const pollInterval = setInterval(async () => {
            try {
              const status = await apiCall("/api/qr-status");
              if (status.hasActiveQR && status.qrData) {
                handleStatusUpdate(status);
                clearInterval(pollInterval);
                addNotification("QR generado exitosamente", "success");
              }
            } catch (error) {
              console.error("Error polling QR status:", error);
              clearInterval(pollInterval);
            }
          }, 2000);

          // Limpiar el intervalo después de 30 segundos para evitar polling infinito
          setTimeout(() => {
            clearInterval(pollInterval);
          }, 30000);
        }
      } else {
        addNotification(
          "QR solicitado, pero no se pudo obtener el estado actual",
          "warning"
        );
      }
    } catch (error) {
      addNotification(`Error al solicitar QR: ${error.message}`, "error");
    }
  }, [apiCall, handleStatusUpdate]);

  // Expirar QR manualmente
  const expireQR = useCallback(async () => {
    try {
      await apiCall("/api/qr-expire", { method: "POST" });
      addNotification("QR expirado manualmente", "success");
    } catch (error) {
      addNotification(`Error al expirar QR: ${error.message}`, "error");
    }
  }, [apiCall]);

  // Obtener estado actual
  const getStatus = useCallback(async () => {
    try {
      const status = await apiCall("/api/qr-status");
      handleStatusUpdate(status);
      addNotification("Estado actualizado", "info");
    } catch (error) {
      addNotification(`Error al obtener estado: ${error.message}`, "error");
    }
  }, [apiCall, handleStatusUpdate]);

  // Iniciar contador
  const startCountdown = (initialTime) => {
    stopCountdown();

    if (initialTime <= 0) return;

    setTimeRemaining(initialTime);

    countdownRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          stopCountdown();
          setQrData(null);
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };

  // Detener contador
  const stopCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  // Efecto para conexión inicial
  useEffect(() => {
    let mounted = true;

    const initializeConnection = async () => {
      if (!mounted) return;

      connectWebSocket();

      // Pequeño delay antes de obtener el estado inicial
      setTimeout(() => {
        if (mounted) {
          getStatus();
        }
      }, 1000);
    };

    initializeConnection();

    return () => {
      mounted = false;
      disconnectWebSocket();
      stopCountdown();
    };
  }, []);

  // Efecto para manejar cambios en el QR
  useEffect(() => {
    if (qrData?.qrCode) {
      // Extraer el string del QR de la URL de datos
      const match = qrData.qrCode.match(/data:image\/[^;]+;base64,[^"]+/);
      if (match) {
        setQrString(match[0]);
      }
    }
  }, [qrData]);

  // Renderizar notificaciones
  const renderNotifications = () => (
    <div className="notifications-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.type}`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );

  // Renderizar contenido principal
  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles["loading-container"]}>
          <div className={styles["spinner"]}></div>
          <p>Cargando...</p>
        </div>
      );
    }

    if (tokenExpired) {
      return (
        <div className={`${styles["status-card"]} ${styles["error"]}`}>
          <h3>Sesión Expirada</h3>
          <p>Su sesión ha expirado. Por favor, inicie sesión nuevamente.</p>
          <button onClick={onLogout} className={styles["btn-primary"]}>
            Volver a Iniciar Sesión
          </button>
        </div>
      );
    }

    if (connectionStatus.isConnected) {
      return (
        <div className={`${styles["status-card"]} ${styles["connected"]}`}>
          <h3>✅ WhatsApp Conectado</h3>
          <p>
            La conexión con WhatsApp está activa y funcionando correctamente.
          </p>
          <div className={styles["connection-details"]}>
            <p>
              <strong>Estado:</strong> Conectado
            </p>
            <p>
              <strong>Última actualización:</strong>{" "}
              {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex  gap-5 justify-center">
            <button onClick={getStatus} className={styles["btn-secondary"]}>
              Actualizar Estado
            </button>
            <button
              onClick={handleResetAuth}
              className={styles["btn-secondary"]}
            >
              Eliminar Auth_info
            </button>
            <button
              onClick={checkAuthStatus}
              className={styles["btn-secondary"]}
            >
              Verificar Auth
            </button>
          </div>
        </div>
      );
    }

    if (qrData) {
      const { timeString, className } = formatTime(timeRemaining);

      return (
        <div className={styles["qr-container"]}>
          <div className={styles["qr-display"]}>
            {qrString ? (
              <img src={qrString} />
            ) : (
              <div className={styles["qr-placeholder"]}>
                <p>Cargando código QR...</p>
              </div>
            )}

            <div className={`${styles["qr-timer"]} ${styles[className]}`}>
              {timeString}
            </div>
          </div>

          <div className={styles["qr-controls"]}>
            <div className={styles["qr-info"]}>
              <p>
                <strong>Expira:</strong>{" "}
                {new Date(qrData.expiresAt).toLocaleTimeString()}
              </p>
              <p>
                <strong>Generado:</strong>{" "}
                {new Date(qrData.createdAt).toLocaleTimeString()}
              </p>
            </div>

            <div className={styles["qr-actions"]}>
              <button onClick={expireQR} className={styles["btn-danger"]}>
                Expirar QR
              </button>
              <button onClick={getStatus} className={styles["btn-secondary"]}>
                Actualizar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`${styles["status-card"]} ${styles["disconnected"]}`}>
        <h3>❌ WhatsApp Desconectado</h3>
        <p>No hay una conexión activa con WhatsApp.</p>
        <button
          onClick={requestNewQR}
          className={styles["btn-primary"]}
          disabled={loading}
        >
          Generar Nuevo QR
        </button>
      </div>
    );
  };

  return (
    <div className={`mx-auto ${styles["dashboard-container"]}`}>
      {renderNotifications()}
      {/* {`text-lg font-semibold text-gray-800 mb-3 ${styles["line-clamp-2"]}` */}
      <main className={styles["dashboard-main"]}>
        <div className={`overflow-auto ${styles["dashboard-grid"]}`}>
          {/* Sección QR y Estado */}
          <div className={styles["dashboard-column"]}>
            <section className={styles["qr-section"]}>
              <h2>Autenticación WhatsApp</h2>
              <div className={styles["qr-instructions"]}>
                <ol>
                  <li>Abre WhatsApp en tu teléfono</li>
                  <li>Ve a Configuración → Dispositivos vinculados</li>
                  <li>Toca "Vincular un dispositivo"</li>
                  <li>Escanea el código QR mostrado</li>
                </ol>
              </div>
              <button
                onClick={handleResetAuth}
                className={`mx-auto flex justify-center ${styles["btn-secondary"]}`}
              >
                Eliminar QR ALMACENADO
              </button>

              <div className={styles["qr-content"]}>{renderContent()}</div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
