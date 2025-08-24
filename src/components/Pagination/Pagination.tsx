"use client";

import { useCallback } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const handlePageClick = useCallback(
    (event: { selected: number }) => {
      const newPage = event.selected + 1;
      onPageChange(newPage);
    },
    [onPageChange]
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={`flex flex-col sm:flex-row justify-center items-center gap-4 ${className}`}
    >
      <div className="text-sm text-black-true order-2 sm:order-1">
        Page {currentPage} of {totalPages}
      </div>

      <div className="order-1 sm:order-2">
        <ReactPaginate
          previousLabel={
            <div
              className="flex items-center gap-2 px-3 py-2 text-gray-dark
             hover:text-green-light transition-colors"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Previous</span>
            </div>
          }
          nextLabel={
            <div
              className="flex items-center gap-2 px-3 py-2 text-gray-dark
             hover:text-green-light transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={16} />
            </div>
          }
          breakLabel="..."
          pageCount={totalPages}
          marginPagesDisplayed={0}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          forcePage={currentPage - 1}
          containerClassName="flex items-center gap-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          pageClassName="relative"
          pageLinkClassName="flex items-center justify-center min-w-[40px] h-10 px-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-light transition-colors border-r border-gray-200 last:border-r-0"
          previousClassName="border-r border-gray-200"
          nextClassName="border-l border-gray-200"
          breakClassName="relative"
          breakLinkClassName="flex items-center justify-center min-w-[40px] h-10 px-3 text-sm text-gray-500 border-r border-gray-200"
          activeClassName="bg-blue-600 text-white"
          activeLinkClassName="!text-white-true !bg-green-light"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};
