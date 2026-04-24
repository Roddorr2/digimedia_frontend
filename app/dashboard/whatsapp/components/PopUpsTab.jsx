import React from "react";
import { apiRequest } from "@/api/fetchApiWhatsApp";
import { PopupsEditor } from "./PopupsEditor";
import { PopupsPreview } from "./PopupsPreview";
import { PopupsImagenEdit } from "./PopupsImagenEdit";

export function PopupsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Columna izquierda */}
      <div className="flex flex-col gap-6">
        <PopupsEditor />
        <PopupsImagenEdit />
      </div>
      <div className="h-full">
        <PopupsPreview />
      </div>
    </div>
  );
}
