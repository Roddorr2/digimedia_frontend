'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Pagination1({ filteredData, currentPage, totalPages }) {
  const router = useRouter();
  const current = Number(currentPage);

  // Función para generar los números de página visibles
  const getPageNumbers = () => {
    const maxVisible = 5; // Máximo de páginas visibles
    const pages = [];
    
    if (totalPages <= maxVisible) {
      // Si hay 5 o menos páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar 5 páginas con la página actual en el centro cuando sea posible
      let startPage = Math.max(1, current - 2);
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);
      
      // Ajustar si estamos cerca del final
      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`?page=${page}`);
    }
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 mt-6">
      <div className="flex-1 flex justify-between sm:hidden">
        {/* Versión móvil - Botones simples */}
        <button
          onClick={() => handlePageChange(current - 1)}
          disabled={current === 1}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            current === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700'
          }`}
        >
          Anterior
        </button>
        <button
          onClick={() => handlePageChange(current + 1)}
          disabled={current === totalPages}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            current === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700'
          }`}
        >
          Siguiente
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Mostrando{' '}
            <span className="font-medium">{Math.min((current - 1) * 4 + 1, filteredData.length)}</span>
            {' '}-{' '}
            <span className="font-medium">{Math.min(current * 4, filteredData.length)}</span>
            {' '}de{' '}
            <span className="font-medium">{filteredData.length}</span> resultados
          </p>
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* Botón: Primera página */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={current === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                current === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              title="Primera página"
            >
              <span className="sr-only">Primera página</span>
              <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Botón: Página anterior */}
            <button
              onClick={() => handlePageChange(current - 1)}
              disabled={current === 1}
              className={`relative inline-flex items-center px-2 py-2 ${
                current === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              title="Página anterior"
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Números de página (máximo 5 visibles) */}
            {pageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold border transition-colors ${
                  pageNum === current
                    ? 'z-10 bg-[#8c52ff] text-white border-[#8c52ff] focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c52ff]'
                    : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Botón: Página siguiente */}
            <button
              onClick={() => handlePageChange(current + 1)}
              disabled={current === totalPages}
              className={`relative inline-flex items-center px-2 py-2 ${
                current === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              title="Página siguiente"
            >
              <span className="sr-only">Siguiente</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Botón: Última página */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={current === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                current === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              title="Última página"
            >
              <span className="sr-only">Última página</span>
              <ChevronsRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}