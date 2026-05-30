"use client";

import { useState } from "react";
import { UploadIcon } from "../TabButton";


export function ImageUploadZone({ label, hint, preview, onFile, onDrop, onRemove }) {
  const [fileKey, setFileKey] = useState(0);

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileKey((k) => k + 1);
    onRemove();
  };

  return (
    <div>
      <p className="mb-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      {hint && (
        <p className="mb-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          {hint}
        </p>
      )}
      <div className="relative">
        <label
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-4 cursor-pointer hover:border-violet-400 transition min-h-[110px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="max-h-24 max-w-full object-contain rounded-xl"
            />
          ) : (
            <>
              <UploadIcon />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Arrastra o haz clic
              </span>
            </>
          )}
          <input
            key={fileKey}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow-md transition"
            title="Eliminar imagen"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
