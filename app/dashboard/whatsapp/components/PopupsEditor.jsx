import React from "react";
import { Card, CardTitle } from "./TabButton";

export function PopupsEditor() {
  return (
    <div className="flex-1">
      <Card>
        <CardTitle>Diseñar Pop ups</CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 p-4">
          {/* Columna 1 - Desplegable 4 servicios */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Desplegable 4 servicios
              </label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Servicio 1</option>
                <option>Servicio 2</option>
                <option>Servicio 3</option>
                <option>Servicio 4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Texto Principal
              </label>
              <input
                type="text"
                name="textoPrincipal"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese texto principal"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Texto Botón
              </label>
              <input
                type="text"
                name="textoBoton"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese texto del botón"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Color Servicio
              </label>
              <input
                type="color"
                name="colorServicio"
                className="h-10 w-16 cursor-pointer"
              />
            </div>
          </div>

          {/* Columna 2 - Desplegable 4 sub-servicios */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Desplegable 4 sub-servicios
              </label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sub-servicio 1</option>
                <option>Sub-servicio 2</option>
                <option>Sub-servicio 3</option>
                <option>Sub-servicio 4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Color Texto Principal
              </label>
              <input
                type="color"
                name="colorTextoPrincipal"
                className="h-10 w-16 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Color Botón
              </label>
              <input
                type="color"
                name="colorBoton"
                className="h-10 w-16 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Tiempo de Aparición (ms)
              </label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>1s - rapido</option>
                <option>2s - ----</option>
                <option>3s - ----</option>
                <option>5s - lento</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
