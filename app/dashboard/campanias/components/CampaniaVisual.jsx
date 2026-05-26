// components/CampaniaVisual.jsx
"use client";

import Image from "next/image";
import { User, CheckCheck } from "lucide-react";

const CampaniaVisual = ({ paragraph, imagePreviewUrl }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[360px] bg-[#f8fafc] dark:bg-slate-800/80 rounded-[2rem] p-4 sm:p-6 flex flex-col items-center border border-slate-200 dark:border-slate-700 relative shrink-0">
        <div className="w-full max-w-[310px] xl:h-[480px] h-[540px] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-600 overflow-hidden flex flex-col bg-[#e5ddd5] relative shrink-0">
          {/* Fondo */}
          <div
            className="absolute inset-0 opacity-[0.4] z-0 bg-cover"
            style={{
              backgroundImage:
                "url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')",
            }}
          />

          {/* Header */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 z-10 shadow-sm">
            <div className="bg-slate-200 rounded-full p-1.5">
              <User size={20} className="text-slate-500" />
            </div>

            <span className="text-sm font-bold">Cliente</span>
          </div>

          {/* Chat */}
          <div className="flex-1 p-3 overflow-y-auto z-10 flex flex-col custom-scrollbar">
            <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none p-2 shadow-sm self-end max-w-[85%] relative mt-1 border border-black/5 shrink-0 overflow-hidden">
              {/* Pico burbuja */}
              <div className="absolute top-0 -right-[6px] w-0 h-0 border-t-[8px] border-t-[#dcf8c6] border-r-[8px] border-r-transparent transform -scale-x-100" />

              {/* Imagen */}
              {imagePreviewUrl && (
                <div className="mb-1.5 rounded overflow-hidden bg-black/5 flex justify-center">
                  <Image
                    src={imagePreviewUrl}
                    alt="Preview"
                    width={300}
                    height={200}
                    className="w-full max-w-full h-auto object-contain max-h-[200px]"
                  />
                </div>
              )}

              {/* Texto */}
              <p className="text-[13.5px] text-[#111b21] leading-tight whitespace-pre-wrap break-all pr-1">
                {paragraph || "Escribe un mensaje..."}
              </p>

              {/* Hora */}
              <div className="flex justify-end items-center gap-1 mt-1 -mb-0.5">
                <span className="text-[10px] text-slate-500 font-medium">
                  12:00
                </span>

                <CheckCheck size={14} className="text-sky-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaniaVisual;
