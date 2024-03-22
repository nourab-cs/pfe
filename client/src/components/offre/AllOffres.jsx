import React, { useEffect, useState } from "react";
import { getAll } from "../../services/offre.service";
import Pagination from "../layouts/Pagination";

function AllOffres() {
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    getAll()
      .then((res) => {
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        setOffers(res.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="md:container md:mx-auto">
      <div className="flex justify-around flex-wrap pt-10">
        {offers.map((offer, index) => (
          <div key={index} className="pt-10">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{offer.subject}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{offer.description}</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>  
  );
}

export default AllOffres;
