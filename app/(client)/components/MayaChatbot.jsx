"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { sendToMaya } from "@/api/mayaWebhook"; // o donde lo guardes

const MAYA_IMG = "/img_chatbot/chatbot_Mesa_de_trabajo_1.webp";

function getSessionId() {
  try {
    let id = sessionStorage.getItem("maya_sid");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("maya_sid", id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

const WELCOME = {
  role: "bot",
  mensaje:
    "¡Hola! Soy Maya, asistente de DigiMedia 👋 Estoy aquí para ayudarte a impulsar tu negocio. ¿En qué puedo ayudarte hoy?",
};

const BUBBLE_MSGS = [
  "¿Necesitas ayuda? 👋",
  "¿Tienes alguna duda?",
  "¡Estoy aquí para ayudarte!",
  "Conoce nuestros servicios",
];

function MayaFallback({ size }) {
  return (
    <div
      className="rounded-full flex-shrink-0 flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #7B2FBE 0%, #4A00E0 100%)",
      }}
    >
      <span
        className="text-white font-bold select-none"
        style={{ fontSize: size * 0.45, lineHeight: 1 }}
      >
        M
      </span>
    </div>
  );
}

function BotAvatar({ size = 28 }) {
  const [err, setErr] = useState(false);
  if (err) return <MayaFallback size={size} />;
  return (
    <div
      className="rounded-full overflow-hidden flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src={MAYA_IMG}
        alt="Maya"
        width={size}
        height={size}
        className="object-cover w-full h-full"
        onError={() => setErr(true)}
      />
    </div>
  );
}

function FloatingButtonFace() {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <span
        className="flex items-center justify-center w-full h-full rounded-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #7B2FBE 0%, #4A00E0 100%)",
          boxShadow: "0 4px 18px rgba(0,0,0,0.22)",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </span>
    );
  }
  return (
    <Image
      src={MAYA_IMG}
      alt="Abrir chat con Maya"
      width={70}
      height={70}
      className="object-contain w-full h-full"
      style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.28))" }}
      onError={() => setErr(true)}
    />
  );
}

export default function MayaChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(getSessionId);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [btnHovered, setBtnHovered] = useState(false);
  const hasWelcomed = useRef(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const showHoverTooltip = btnHovered && !open;
  const showAutoBubble = showBubble && !btnHovered && !open;
  const hoverTimer = useRef(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setBtnHovered(true);
    }, 180);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setBtnHovered(false);
  };

  // Animación de bienvenida la primera vez que se abre
  useEffect(() => {
    if (open && !hasWelcomed.current) {
      hasWelcomed.current = true;
      setLoading(true);
      const t = setTimeout(() => {
        setLoading(false);
        setMessages([WELCOME]);
      }, 1400);
      return () => clearTimeout(t);
    }
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setShowBubble(false);
      return;
    }
    let idx = 0;
    const timers = [];
    const cycle = (delay) => {
      const t1 = setTimeout(() => {
        setBubbleIdx(idx);
        setShowBubble(true);
        const t2 = setTimeout(() => {
          setShowBubble(false);
          idx = (idx + 1) % BUBBLE_MSGS.length;
          cycle(22000);
        }, 4500);
        timers.push(t2);
      }, delay);
      timers.push(t1);
    };
    cycle(8000);
    return () => timers.forEach(clearTimeout);
  }, [open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", mensaje: text }]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendToMaya({
        message: text,
        sessionId,
      });

      setMessages((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          mensaje: "Ocurrió un error al conectarme. Escríbenos directamente",
          contacto: "https://wa.me/51983027828",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* ── Ventana de chat ── */}
      {open && (
        <div
          className="fixed z-50 right-8 md:right-10 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            bottom: "calc(7rem + 3.5rem + 0.75rem)",
            width: "min(360px, calc(100vw - 2rem))",
            maxHeight: "520px",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #7B2FBE 0%, #4A00E0 100%)",
            }}
          >
            <div className="">
              <BotAvatar size={40} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">
                Maya
              </p>
              <p className="text-white/70 text-xs">Asistente de DigiMedia</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className="w-2 h-2 bg-green-400 rounded-full"
                title="En línea"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="Cerrar chat"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mensajes */}
          <div
            className="overflow-y-auto px-3 py-4 space-y-3 bg-gray-50"
            style={{ minHeight: "200px", maxHeight: "360px" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } items-end gap-2`}
              >
                {msg.role === "bot" && <BotAvatar size={28} />}
                <div
                  className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                    msg.role === "user"
                      ? "rounded-br-sm text-white"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                  }`}
                  style={
                    msg.role === "user"
                      ? {
                          background:
                            "linear-gradient(135deg, #7B2FBE, #4A00E0)",
                        }
                      : {}
                  }
                >
                  <p className="leading-snug whitespace-pre-line">
                    {msg.mensaje}
                  </p>

                  {msg.servicios?.length > 0 && (
                    <ul className="mt-2 space-y-1 border-t border-purple-100 pt-2">
                      {msg.servicios.map((s, si) => (
                        <li key={si} className="text-xs">
                          <span className="font-semibold text-purple-700">
                            • {s.nombre}:
                          </span>{" "}
                          <span className="text-gray-600">{s.descripcion}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {msg.contacto && i === messages.length - 1 && (
                    <a
                      href={
                        msg.contacto.match(/https?:\/\/[^\s]+/)?.[0] ??
                        "https://wa.me/51983027828"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium underline"
                      style={{
                        color:
                          msg.role === "bot"
                            ? "#7B2FBE"
                            : "rgba(255,255,255,0.9)",
                      }}
                    >
                      💬 Hablar con un asesor
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Indicador de escritura */}
            {loading && (
              <div className="flex justify-start items-end gap-2">
                <BotAvatar size={28} />
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <span
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 bg-white border-t border-gray-100 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu mensaje..."
              disabled={loading}
              className="flex-1 text-sm bg-gray-50 rounded-xl px-3 py-2 outline-none text-gray-800 placeholder-gray-400 border border-gray-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:opacity-90 disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #7B2FBE, #4A00E0)",
              }}
              aria-label="Enviar mensaje"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Botón flotante Maya + burbuja ── */}
      <div
        className="fixed z-50 right-8 md:right-10 flex flex-col items-end"
        style={{ bottom: "7rem" }}
      >
        {/* Burbuja de mensaje o tooltip hover */}
        <div
          className={`
      relative mb-3 pointer-events-none
      transform-gpu
      transition-all duration-700
      ease-[cubic-bezier(.16,1,.3,1)]
      ${
        !open && (showHoverTooltip || showAutoBubble)
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95"
      }
    `}
        >
          <div className="bg-white rounded-2xl shadow-md px-4 py-2 text-sm text-gray-700 font-medium whitespace-nowrap">
            {showHoverTooltip
              ? "¿Necesitas ayuda?"
              : showAutoBubble
                ? BUBBLE_MSGS[bubbleIdx]
                : ""}

            <span
              className="absolute bottom-[-5px] right-4 w-2.5 h-2.5 bg-white rotate-45"
              style={{ boxShadow: "2px 2px 3px rgba(0,0,0,0.06)" }}
            />
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`w-[70px] h-[70px] flex-shrink-0 transition-all duration-300 animate-heartbeat ${
            open ? "rounded-full overflow-hidden" : ""
          }`}
          style={{
            background: open
              ? "linear-gradient(135deg, #7B2FBE 0%, #4A00E0 100%)"
              : "transparent",
            boxShadow: open ? "0 4px 18px rgba(0, 0, 0, 0.22)" : "none",
          }}
          aria-label={open ? "Cerrar chat Maya" : "Abrir chat con Maya"}
        >
          {open ? (
            <span className="flex items-center justify-center w-full h-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          ) : (
            <FloatingButtonFace />
          )}
        </button>
      </div>
    </>
  );
}
