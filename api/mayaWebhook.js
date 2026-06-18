const MAYA_WEBHOOK = process.env.NEXT_PUBLIC_MAYA_WEBHOOK_URL ?? "";

export async function sendToMaya({ message, sessionId }) {
  console.log("[Maya frontend] enviando a n8n:", message?.slice(0, 50));

  if (!MAYA_WEBHOOK) {
    return {
      role: "bot",
      mensaje: "El chatbot no está configurado aún. Escríbenos directamente.",
      contacto: "https://wa.me/51983027828",
    };
  }

  try {
    const res = await fetch(MAYA_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sessionId,
      }),
    });

    console.log("[Maya frontend] status:", res.status);

    if (!res.ok) {
      return {
        role: "bot",
        mensaje: "Maya no está disponible ahora. Escríbenos directamente.",
        contacto: "https://wa.me/51983027828",
      };
    }

    const rawText = await res.text();
    console.log("[Maya frontend] raw:", rawText?.slice(0, 200));

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      console.error("[Maya frontend] JSON inválido:", err);

      return {
        role: "bot",
        mensaje:
          "Hubo un problema con la respuesta del servidor.  Escríbenos directamente.",
        contacto: "https://wa.me/51983027828",
      };
    }

    return {
      role: "bot",
      mensaje:
        data?.mensaje ||
        data?.message ||
        data?.text ||
        "No recibí una respuesta válida.",

      servicios: data?.servicios || [],
      contacto: data?.contacto || "https://wa.me/51983027828",
    };
  } catch (err) {
    console.error("[Maya frontend] error de conexión:", err);

    return {
      role: "bot",
      mensaje: "No pude conectarme con Maya ahora. Escríbenos directamente.",
      contacto: "https://wa.me/51983027828",
    };
  }
}
