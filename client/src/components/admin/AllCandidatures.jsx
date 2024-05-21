import React, { useState, useEffect } from "react";
import { getall } from "../../services/candidature.service";
import Pagination from "../layouts/Pagination";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeIcon } from "./Icons";
import { axiosClient } from "../../services/axiosClient";
import Modal from "../layouts/Modal-next";
import { Link } from "@nextui-org/react";
import {useOffre} from "../../stores/offreStore"

function AllCandidatures() {
  const [candidates, setCandidates] = useState([]);
  const [Offre] = useOffre((state) => [state.Offre]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openModal, setOpen] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [id, setId] = useState("");
  const [refetch, re] = useState(true);

  const itemsPerPage = 6;

  const setCandidature = async (id, Status, date) => {
    try {
      const result = axiosClient.post(
        "/postuler/set-candidature",
        {
          id,
          Status,
          date,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getall()
      .then((res) => {
        console.log(res.data);
        setTotalPages(Math.ceil(res.data.Candidatures.length / itemsPerPage));
        setCandidates(
          res.data.Candidatures.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
      })
      .catch((err) => console.log(err));
  }, [refetch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
        <div className="ml-auto"></div>
      </div>
      <div className="overflow-x-auto">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Offre Correspondante</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {candidates?.map((candidate, index) => {
              const OffreName = Offre.find((e)=>e._id == candidate.offre_id)
              console.log(OffreName);
              return (
                <TableRow key={index}>
                  <TableCell>{candidate.nom}</TableCell>
                  <TableCell>{OffreName?.titre}</TableCell>

                  <TableCell>
                    {!candidate.is_accepted ? (
                      <>
                        {" "}
                        <button
                          onClick={() => {
                            setId(candidate._id);
                            setOpen(true);
                          }}
                        >
                          accept
                        </button>
                        <Button
                          onClick={() => {
                            setCandidature(candidate._id, "no");
                            re(!refetch);
                          }}
                        >
                          rject
                        </Button>
                      </>
                    ) : (
                      candidate.is_accepted
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      href={`/candidature/${candidate._id}`}
                      as={Link}
                      color="primary"
                      variant="solid"
                    >
                      Voir détails
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Modal
        re={re}
        refetch={refetch}
        id={id}
        setCandidature={setCandidature}
        setDate={setDate}
        open={openModal}
        set={setOpen}
        date={date}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AllCandidatures;
