import React from "react";

const Pagnation = React.memo(function Pagnation({
  paginationRange,
  currentPage,
  handlePageChange,
  isLoading,
}: {
  paginationRange: (number | string)[];
  currentPage: number;
  handlePageChange: (page: number) => void;
  isLoading: boolean;
}) {
  return (
    <>
      {paginationRange.map((page: number | string, index: number) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-1 text-sm text-gray-500"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            className={`px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
              currentPage === page
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : ""
            }`}
            onClick={() => handlePageChange(Number(page))}
            disabled={isLoading}
          >
            {page}
          </button>
        );
      })}
    </>
  );
});

Pagnation.displayName = "Pagnation";

export default Pagnation;
