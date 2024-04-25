import React, { useEffect, useState } from "react";
import { getAll } from "../../services/offre.service";
import Pagination from "../layouts/Pagination";

import { Link } from "react-router-dom"; // Import de Link depuis react-router-dom

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
    <div className="bg-white py-24 sm:py-32">
     <div className="mx-auto max-w-7xl px-6 lg:px-8">

      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
         <p className="mt-2 text-lg leading-8 text-gray-600">
           Learn how to grow your business with our expert advice.
         </p>
       </div>
      <div className="mx-auto mt-10 grid max-w-2xl  grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">

        {offers.map((offer, index) => { 
          {console.log(offer)}
          
          return < div key={index} className="pt-10 ">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{offer.titre}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{offer.domaine}</p>
              <Link to={`/description/${offer._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </Link>
            </div>
          </div>
        })}
             </div>
 
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



// import React, { useEffect, useState } from "react";
// import { getAll } from "../../services/offre.service";
// import Pagination from "../layouts/Pagination";

// function AllOffres() {
//   const [offers, setOffers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     getAll()
//       .then((res) => {
//         setTotalPages(Math.ceil(res.data.length / itemsPerPage));
//         setOffers(res.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
//       })
//       .catch((err) => console.log(err));
//   }, [currentPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="bg-white py-24 sm:py-32">
//     <div className="mx-auto max-w-7xl px-6 lg:px-8">
//       <div className="mx-auto max-w-2xl lg:mx-0">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
//         <p className="mt-2 text-lg leading-8 text-gray-600">
//           Learn how to grow your business with our expert advice.
//         </p>
//       </div>

//       <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//         {offers.map((offer, index) => (
//            <article key={index.id} className="flex max-w-xl flex-col items-start justify-between">
//           <div key={index} className="pt-10">
//           <div className="flex items-center gap-x-4 text-xs">       
//                <time dateTime={offer.datetime} className="text-gray-500">
//                   {offer.date}
//                 </time>
//                 <div className="group relative">
//                 <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//                   <a >
//                     <span className="absolute inset-0" />
//                     {offer.subject}
//                   </a>
//                 </h3>
//                 <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{offer.description}</p>
             
//               <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
//                 Read more
//                 <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//                 </svg>
//               </a>
//               </div>
//             </div>
//           </div>
//           </article>

//         ))}
//          </div>
//       </div>
//       <Pagination 
//         currentPage={currentPage} 
//         totalPages={totalPages} 
//         onPageChange={handlePageChange} 
//       />
//     </div>  
//   );
// }

// export default AllOffres;
