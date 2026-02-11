"use client";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Card, CardTitle } from "./TabButton";

export function TestSendTab({ services, isConnected, connectedNumber }) {
  const [service, setService] = useState("");
  const [testPhone, setTestPhone] = useState("");
  const [message, setMessage] = useState("Hola 👋 Esta es una prueba de campaña con payload común.");
  const [loading, setLoading] = useState(false);

  const [mockResponse, setMockResponse] = useState(null);

  const serviceIdAsNumber = useMemo(() => {
    // Convierte p1/p2/p3/p4 => 1/2/3/4 (para que calce con tu DB id_servicio)
    if (!service) return null;
    const n = Number(String(service).replace("p", ""));
    return Number.isFinite(n) ? n : null;
  }, [service]);

  const canSend = Boolean(isConnected && service && testPhone && message.trim().length > 0 && !loading);

  const payloadPreview = useMemo(() => {
    return {
      id_servicio: serviceIdAsNumber,
      phone: testPhone,
      message,
      // esto simula “payload común”, sin imagen ni subservicio
      meta: {
        mode: "mock",
        chunk_size: 50,
        rate_limit: "12 msg/min",
        connected_as: connectedNumber || null,
      },
    };
  }, [serviceIdAsNumber, testPhone, message, connectedNumber]);

  const handleMockSend = async () => {
    if (!isConnected) {
      Swal.fire("Sin conexión", "Conecta WhatsApp antes de probar.", "warning");
      return;
    }
    if (!service || !testPhone || !message.trim()) return;

    setLoading(true);
    setMockResponse(null);

    // Mock recipients (simula que el backend arma lista y manda chunk)
    const mockRecipients = [testPhone, "+51999999999"];

    // Simula “procesar chunk completo” y responder estructurado
    setTimeout(() => {
      const results = {};
      mockRecipients.forEach((_, idx) => {
        results[String(idx + 1)] = { success: true };
      });

      const response = {
        successful: mockRecipients.length,
        failed: 0,
        results,
      };

      setMockResponse(response);
      setLoading(false);

      Swal.fire({
        title: "Prueba enviada (mock)",
        text: `Simulado: ${response.successful} ok, ${response.failed} fallos.`,
        icon: "success",
        confirmButtonColor: "rgba(140,82,255,1)",
      });
    }, 900);
  };

  return (
    <section className="space-y-6">
      <Card>
        <CardTitle>Prueba</CardTitle>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Envío de prueba (mock)</p>
              <p className="text-xs text-slate-500">
                No llama al backend. Simula payload + respuesta estructurada.
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isConnected ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
              {isConnected
                ? `Listo para probar${connectedNumber ? ` (${connectedNumber})` : ""}`
                : "Conecta WhatsApp para probar"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Servicio
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[rgba(140,82,255,1)] focus:ring-4 focus:ring-[rgba(140,82,255,0.18)]"
              >
                <option value="">--- Selecciona una opción ---</option>
                {services.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-slate-500">
                Esto simula el `id_servicio` de tu tabla.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Número destino
              </label>
              <input
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                placeholder="+51 9xxxxxxxx"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[rgba(140,82,255,1)] focus:ring-4 focus:ring-[rgba(140,82,255,0.18)]"
              />
              <p className="mt-2 text-xs text-slate-500">
                Mock manda a este número + un número dummy.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-slate-900">
              Mensaje (payload común)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[rgba(140,82,255,1)] focus:ring-4 focus:ring-[rgba(140,82,255,0.18)]"
            />
            <p className="mt-2 text-xs text-slate-500">
              Aquí simulas el texto común para el chunk.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={handleMockSend}
              disabled={!canSend}
              className={[
                "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white",
                canSend
                  ? "bg-[rgba(140,82,255,1)] hover:bg-[rgba(140,82,255,0.9)] active:bg-[rgba(140,82,255,0.8)]"
                  : "bg-slate-300 cursor-not-allowed",
              ].join(" ")}
            >
              {loading ? "Enviando (mock)..." : "Enviar Prueba"}
            </button>

            <button
              type="button"
              onClick={() => {
                setService("");
                setTestPhone("");
                setMessage("Hola Esta es una prueba de campaña con payload común.");
                setMockResponse(null);
              }}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-900"
            >
              Reset
            </button>
          </div>

          {/* Payload / Response */}
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Payload (mock)</p>
              <pre className="mt-3 overflow-auto rounded-xl bg-white p-3 text-xs text-slate-700 border border-slate-200">
{JSON.stringify(payloadPreview, null, 2)}
              </pre>
              <p className="mt-2 text-xs text-slate-500">
                EJEMPLO PAYLOAD.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Respuesta (mock)</p>
              <pre className="mt-3 overflow-auto rounded-xl bg-white p-3 text-xs text-slate-700 border border-slate-200">
{mockResponse ? JSON.stringify(mockResponse, null, 2) : "// Aún no hay respuesta"}
              </pre>
              <p className="mt-2 text-xs text-slate-500">
                Estructura tipo: successful/failed/results.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
