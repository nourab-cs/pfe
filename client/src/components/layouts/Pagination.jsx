import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const getPageNumberClass = (pageNumber) => {
    return pageNumber === currentPage ? "bg-red-500 text-white" : "text-gray-500";
  };
  return (
    <div className="flex justify-between mt-4">
      <button onClick={handlePrevPage} disabled={currentPage === 1} className="text-red-600 disabled:text-gray-400">Previous</button>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-2 py-1 mx-1 rounded-full focus:outline-none focus:ring bg-transparent ${getPageNumberClass(index + 1)}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={handleNextPage} disabled={currentPage === totalPages} className="text-red-600 disabled:text-gray-400">Next</button>
    </div>
  );
}

export default Pagination;
