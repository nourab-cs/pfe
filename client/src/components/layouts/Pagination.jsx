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
    return pageNumber === currentPage ? " text-black" : "text-black-500";
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="text-red-600 disabled:text-gray-600 focus:outline-none hover:text-red-700 transition-colors duration-200 mr-4"
      >
        Previous
      </button>

      <div className="flex">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-2 mx-1 rounded-full focus:shadow-2xl  focus:outline-none focus:bg-black  focus:text-white hover:bg-gray-300   ${getPageNumberClass(index + 1)}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="text-red-600 disabled:text-gray-600 focus:outline-none hover:text-red-700 transition-colors duration-200 ml-4"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

// import React from "react";
// import {Pagination, Button} from "@nextui-org/react";

// export default function App() {
//   const [currentPage, setCurrentPage] = React.useState(1);

//   return (
//     <div className="flex flex-col gap-5">
//       <p className="text-small text-default-500">Selected Page: {currentPage}</p>
//       <Pagination
//         total={6}
//         color="secondary"
//         page={currentPage}
//         onChange={setCurrentPage}
//       />
//       <div className="flex gap-2">
//         <Button
//           size="sm"
//           variant="flat"
//           color="secondary"
//           onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
//         >
//           Previous
//         </Button>
//         <Button
//           size="sm"
//           variant="flat"
//           color="secondary"
//           onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }
