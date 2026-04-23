import React from "react";
import { Card } from "./TabButton";

export function PopupsPreview() {
  return (
    <div className="">
      <Card>
        <div className="w-full flex justify-center">
          <Card>
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Switch Mobile / Desktop */}
              <div className="flex items-center gap-2 bg-gray-900 p-1 rounded-lg">
                <button className="px-4 py-1 text-sm rounded-md bg-black text-white">
                  Mobile
                </button>
                <button className="px-4 py-1 text-sm rounded-md text-gray-300 hover:text-white">
                  Desktop
                </button>
              </div>

              {/* Preview frame */}
              <div className="w-full flex justify-center">
                <div className="w-[320px] h-[560px] md:w-[420px] md:h-[640px] border-2 border-gray-500 rounded-2xl flex items-center justify-center bg-black relative">
                  {/* Label placeholder */}
                  <span className="text-gray-400 text-sm">Preview - Vista</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
