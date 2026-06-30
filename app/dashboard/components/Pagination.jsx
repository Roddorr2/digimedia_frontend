"use client"
import ReactPaginate from "react-paginate"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({ count, itemsPerPage = 5 }) {
  const pageCount = Math.max(1, Math.ceil(count / itemsPerPage))
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number.parseInt(searchParams.get("page") || "1", 10)

  const onPageChange = ({ selected }) => {
    const newPage = selected + 1
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage)
    router.push(`?${params.toString()}`)  }

  return (
    <div className="flex justify-center mt-6 mb-4">
      <ReactPaginate
        previousLabel={<ChevronLeft className="h-4 w-4" />}
        nextLabel={<ChevronRight className="h-4 w-4" />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName="flex items-center gap-1"
        pageClassName="flex items-center justify-center h-8 w-8 rounded-md text-sm transition-colors hover:bg-gray-100"
        pageLinkClassName="flex items-center justify-center w-full h-full"
        activeClassName="bg-[#8c52ff] text-white"
        activeLinkClassName="font-medium hover:text-gray-800"
        previousClassName="flex items-center justify-center h-8 w-8 rounded-md transition-colors hover:bg-gray-100"
        nextClassName="flex items-center justify-center h-8 w-8 rounded-md transition-colors hover:bg-gray-100"
        breakClassName="flex items-center justify-center h-8 px-2 text-gray-500"
        disabledClassName="text-gray-300 hover:bg-transparent cursor-not-allowed"
        forcePage={pageCount > 1 ? Math.max(0, Math.min(currentPage - 1, pageCount - 1)) : undefined}
      />
    </div>
  )
}