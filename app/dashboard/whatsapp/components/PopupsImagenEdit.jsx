import React from "react";
import { Card, CardTitle } from "./TabButton";

export function PopupsImagenEdit() {
  return (
    <div className="">
      <Card>
        <CardTitle>Diseño de imagen</CardTitle>
        <div className="p-4 flex flex-col gap-6 w-full max-w-xl">
          {/* Switch buttons (solo visuales) */}
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-md border bg-gray-900 text-white text-sm">
              Imagen Izq.
            </button>
            <button className="px-4 py-2 rounded-md border text-sm text-gray-700 hover:bg-gray-100">
              Imagen Der.
            </button>
          </div>

          {/* Upload + Opacity */}
          <div className="flex gap-6 items-center">
            {/* Upload image */}
            <label className="w-40 h-28 border-2 border-dashed rounded-xl flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50">
              Cargar Imagen
              <input type="file" className="hidden" />
            </label>

            {/* Opacity */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-gray-600">Opacity</label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full accent-purple-600"
              />
            </div>
          </div>

          {/* Desplegable SEO */}
          <div className="border rounded-lg p-3">
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 flex justify-between items-center">
                Conf. SEO Imágenes
                <span className="text-xs text-gray-400 group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>

              <div className="mt-4 flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Nombre Imagen Izq."
                  className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder="Nombre Imagen Der."
                  className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </details>
          </div>
        </div>
      </Card>
    </div>
  );
}
