'use client'

import React from 'react'
import { useRouter } from "next/navigation"

export default function Pagination1({ filteredData, currentPage, totalPages }) {
  const router = useRouter()

  const page = Number(currentPage) || 1
  const canPrev = page > 1
  const canNext = page < Number(totalPages)

  const goTo = (p) => router.push(`?page=${p}`)

  return (
    <>
      {Number(totalPages) > 1 && (
        <div className="mt-6">
          <div className="flex justify-center items-center space-x-2">

            {/* Prev */}
            <button
              type="button"
              onClick={() => canPrev && goTo(page - 1)}
              disabled={!canPrev}
              className={`w-9 h-9 flex items-center justify-center rounded-md border ${
                canPrev ? "bg-white text-[#8c52ff] hover:bg-gray-50" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Página anterior"
            >
              ‹
            </button>

            {/* Pages */}
            <div className="flex space-x-1">
              {Array.from({ length: Number(totalPages) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    page === p
                      ? "bg-[#8c52ff] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={() => canNext && goTo(page + 1)}
              disabled={!canNext}
              className={`w-9 h-9 flex items-center justify-center rounded-md border ${
                canNext ? "bg-white text-[#8c52ff] hover:bg-gray-50" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Página siguiente"
            >
              ›
            </button>

          </div>

          <p className="text-sm text-gray-500 mt-2 text-center">
            Mostrando {filteredData.length} contactos en esta página
          </p>
        </div>
      )}
    </>
  )
}
