import { NextResponse } from "next/server";
import https from "https";
import http from "http";

const WEBHOOK_URL = process.env.MAYA_WEBHOOK_URL ?? "";

// Agente para HTTPS con certificados autofirmados (traefik.me)
const insecureAgent = new https.Agent({ rejectUnauthorized: false });

function n8nPost(url, bodyStr) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const isHttps = u.protocol === "https:";
    const lib = isHttps ? https : http;

    const req = lib.request(
      {
        hostname: u.hostname,
        port: u.port || (isHttps ? 443 : 80),
        path: u.pathname + u.search,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(bodyStr),
        },
        ...(isHttps ? { agent: insecureAgent } : {}),
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => { raw += chunk; });
        res.on("end", () => resolve({ status: res.statusCode, raw }));
      }
    );
    req.on("error", reject);
    req.write(bodyStr);
    req.end();
  });
}

export async function POST(request) {
  console.log("[Maya proxy] WEBHOOK_URL configurado:", !!WEBHOOK_URL);

  if (!WEBHOOK_URL) {
    return NextResponse.json({
      mensaje: "El chatbot no está configurado aún. Escríbenos directamente.",
      contacto: "https://wa.me/51983027828",
    });
  }

  try {
    const body = await request.json();
    const bodyStr = JSON.stringify(body);

    console.log("[Maya proxy] enviando a n8n, mensaje:", body.message?.slice(0, 50));

    const { status, raw } = await n8nPost(WEBHOOK_URL, bodyStr);

    console.log("[Maya proxy] respuesta n8n status:", status, "| raw:", raw.slice(0, 200));

    if (status < 200 || status >= 300) {
      return NextResponse.json({
        mensaje: "Maya no está disponible ahora. Escríbenos directamente.",
        contacto: "https://wa.me/51983027828",
      });
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("[Maya proxy] respuesta no es JSON válido:", raw.slice(0, 300));
      return NextResponse.json({
        mensaje: "Hubo un problema con la respuesta. Escríbenos directamente.",
        contacto: "https://wa.me/51983027828",
      });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("[Maya proxy] error de conexión:", err.message, err.cause?.message ?? "");
    return NextResponse.json({
      mensaje: "No pude conectarme con Maya ahora. Escríbenos directamente.",
      contacto: "https://wa.me/51983027828",
    });
  }
}
