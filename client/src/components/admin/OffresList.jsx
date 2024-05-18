import React, { useEffect, useState } from "react";
import { getAll } from "../../services/offre.service";
import Pagination from "../layouts/Pagination";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Link, Button } from "@nextui-org/react";
import { axiosClient } from "../../services/axiosClient";
const AllOffres = () => {
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    getAll()
      .then((res) => {
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        setOffers(
          res.data.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
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
            Une liste de toutes les offres d'emploi disponibles sur notre
            plateforme.
          </p>
        </div>
        <div className="ml-auto">
          <Button
            href="/create-offre"
            as={Link}
            color="primary"
            variant="solid"
          >
            Ajouter une offre
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Titre</TableColumn>
            <TableColumn>Domaine</TableColumn>
            <TableColumn>Date limite</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {offers.reverse().map((offer, index) => (
              <TableRow key={index}>
                <TableCell>{offer.titre}</TableCell>
                <TableCell>{offer.domaine}</TableCell>
                <TableCell>{offer.dateLimite}</TableCell>
                <TableCell>
                  <Button
                    href={`/description/${offer._id}`}
                    as={Link}
                    color="primary"
                    variant="solid"
                  >
                    Voir détails
                  </Button>
                  <Button
                    href={`/admin/candidates_per_offre/${offer._id}`}
                    as={Link}
                    color="primary"
                    variant="solid"
                  >
                    Button Link
                  </Button>
                  <Button
                    onClick={()=>{
                      axiosClient.delete(`/offre/delete/${offer._id}`)
                    }}
                    as={Link}
                    color="primary"
                    variant="solid"
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllOffres;
