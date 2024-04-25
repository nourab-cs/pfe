import React, { useEffect, useState } from 'react';
import { getAll } from '../../services/offre.service';
import Pagination from '../layouts/Pagination';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AllOffres = () => {
  
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
    <div className="container mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-3xl mt-2">Toutes les offres</h1>
        <p className="text-gray-600 mt-2">
          Une liste de toutes les offres d'emploi disponibles sur notre plateforme.
        </p>
      </div>
      <div className="ml-auto">
        <Link
          to="/create-offre"
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Ajouter une offre
        </Link>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse table-auto mt-6">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left font-medium text-black">Titre</th>
            <th className="px-6 py-3 text-left font-medium text-black">Domaine</th>
            <th className="px-6 py-3 text-left font-medium text-black">Date Limite</th>
            <th className="px-6 py-3 text-left font-medium text-black"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {offers.map((offer, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-wrap">{offer.titre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{offer.domaine}</td>
              <td className="px-6 py-4 whitespace-nowrap">{offer.dateLimite}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <Link
                  to={`/description/${offer._id}`}
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Voir détails
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
  </div>
  
  );
};

export default AllOffres;
