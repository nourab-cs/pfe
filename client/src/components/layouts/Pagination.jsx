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

  return (
    <div className="flex justify-between mt-4">
      <button onClick={handlePrevPage} disabled={currentPage === 1} className="text-blue-600 disabled:text-gray-400">Previous</button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages} className="text-blue-600 disabled:text-gray-400">Next</button>
    </div>
  );
}

export default Pagination;
