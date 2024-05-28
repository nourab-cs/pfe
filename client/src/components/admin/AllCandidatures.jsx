// import React, { useState, useEffect } from "react";
// import { getall, deleteCandidature } from "../../services/candidature.service";
// import Pagination from "../layouts/Pagination";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Tooltip,
//   Button,
//   ButtonGroup,Progress
// } from "@nextui-org/react";
// import { DeleteIcon, EyeIcon } from "./Icons";
// import Modal from "../layouts/Modal-next";
// import { useOffre } from "../../stores/offreStore";
// import toast from "react-hot-toast";
// import { axiosClient } from "../../services/axiosClient";

// function AllCandidatures() {
//   const [candidates, setCandidates] = useState([]);
//   const [Offre] = useOffre((state) => [state.Offre]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [openModal, setOpen] = useState(false);
//   const [date, setDate] = useState(Date.now());
//   const [id, setId] = useState("");
//   const [refetch, re] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState("");

//   const itemsPerPage = 6;

//   const setCandidature = async (id, Status, date) => {
//     try {
//       const result = axiosClient.post(
//         "/postuler/set-candidature",
//         {
//           id,
//           Status,
//           date
//         },
//         { withCredentials: true }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getall()
//       .then((res) => {
//         console.log(res.data);
//         setTotalPages(Math.ceil(res.data.Candidatures.length / itemsPerPage));
//         setCandidates(
//           res.data.Candidatures.slice(
//             (currentPage - 1) * itemsPerPage,
//             currentPage * itemsPerPage
//           )
//         );

//       })
//       .catch((err) => console.log(err));
//   }, [refetch, currentPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDelete = (id) => {
//     deleteCandidature()
//       .then(() => {
//         toast.success("candidature supprimée avec succès");
//         setCandidates(candidates.filter((candidate) => candidate._id !== id));
//       })
//       .catch((err) => {
//         console.error(
//           "Erreur lors de la suppression de la candidature",
//           err
//         );
//         toast.error("Erreur lors de la suppression de la candidature");
//       });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h1 className="text-3xl mt-2">Toutes les candidatures</h1>
//           <p className="text-gray-600 mt-2">
//             Une liste de toutes les candidatures disponibles sur notre
//             plateforme.
//           </p>
//         </div>
//         <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
//   <option value="">Tous les statuts</option>
//   <option value="acceptée">Acceptée</option>
//   <option value="rejetée">Rejetée</option>
//   <option value="en attente">En attente</option>
// </select>
//         <div className="ml-auto"></div>
//       </div>
//       <div className="overflow-x-auto">
//         <Table aria-label="Example static collection table">
//           <TableHeader>
//             <TableColumn>Name</TableColumn>
//             <TableColumn>Offre Correspondante</TableColumn>
//             <TableColumn>Score</TableColumn>

//             <TableColumn>Status</TableColumn>
//             <TableColumn>Date d'entretien</TableColumn>
//             <TableColumn>Actions</TableColumn>
//           </TableHeader>
//           <TableBody>
//             {candidates?.map((candidate, index) => {
//               const OffreName = Offre.find((e) => e._id == candidate.offre_id);
//               console.log(OffreName);
//               return (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <div>
//                       <p>{`${candidate.nom} ${candidate.prénom}`}</p>
//                       <p className="text-gray-600">{candidate.email}</p>
//                     </div>
//                   </TableCell>
//                   <TableCell>{OffreName?.titre}</TableCell>
//                   <TableCell>
//                   <Progress
//       size="sm"
//       radius="sm"
//       classNames={{
//         base: "max-w-md",
//         track: "drop-shadow-md border border-default",
//         indicator: "bg-green-500",
//         label: "tracking-wider font-medium text-default-600",
//         value: "text-foreground/60",
//       }}
//       label="Score"
//       value={candidate?.quiz_score}
//       showValueLabel={true}
//     />

//                   </TableCell>

//                   <TableCell>
//                     {!candidate.is_accepted ? (
//                       <>
//                         {" "}
//                         <ButtonGroup>
//                           <Button
//                             color="success"
//                             variant="flat"
//                             onClick={() => {
//                               setId(candidate._id);
//                               setOpen(true);
//                             }}
//                           >
//                             accepter
//                           </Button>
//                           <Button
//                             color="danger"
//                             variant="flat"
//                             onClick={() => {
//                               setCandidature(candidate._id, "rejetée");
//                               re(!refetch);
//                             }}
//                           >
//                             rejeter
//                           </Button>
//                         </ButtonGroup>
//                       </>
//                     ) : (
//                       candidate.is_accepted
//                     )}
//                   </TableCell>

//                   <TableCell>
//                     {candidate.is_accepted === "acceptée" &&
//                     candidate.interview ? (
//                       new Date(candidate.interview).toLocaleString()
//                     ) : (
//                        "Non planifiée"
//                     )}
//                   </TableCell>

//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Tooltip content="Voir détails">
//                         <span
//                           className="text-lg text-default-400 cursor-pointer active:opacity-50"
//                           onClick={() =>
//                             (window.location.href = `/candidature/${candidate._id}`)
//                           }
//                         >
//                           <EyeIcon />
//                         </span>
//                       </Tooltip>
//                       <Tooltip color="danger" content="Supprimer">
//                         <span
//                           className="text-lg text-danger cursor-pointer active:opacity-50"
//                           onClick={() => handleDelete(candidate._id)}
//                         >
//                           <DeleteIcon />
//                         </span>
//                       </Tooltip>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </div>
//       <Modal
//         re={re}
//         refetch={refetch}
//         id={id}
//         setCandidature={setCandidature}
//         setDate={setDate}
//         open={openModal}
//         set={setOpen}
//         date={date}
//       />
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// }

// export default AllCandidatures;

import React, { useState, useEffect } from "react";
import { getall, deleteCandidature } from "../../services/candidature.service";
import Pagination from "../layouts/Pagination";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  ButtonGroup,
  Progress,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { DeleteIcon, EyeIcon } from "./Icons";
import Modal from "../layouts/Modal-next";
import { useOffre } from "../../stores/offreStore";
import toast from "react-hot-toast";
import { axiosClient } from "../../services/axiosClient";

function AllCandidatures() {
  const [candidates, setCandidates] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]); // État pour stocker toutes les candidatures
  const [Offre] = useOffre((state) => [state.Offre]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openModal, setOpen] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [id, setId] = useState("");
  const [refetch, re] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");

  const itemsPerPage = 6;

  const setCandidature = async (id, Status, date) => {
    try {
      await axiosClient.post(
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
        const candidatures = res.data.Candidatures;
        setAllCandidates(candidatures); // Stocker toutes les candidatures
        setTotalPages(Math.ceil(candidatures.length / itemsPerPage));
        filterCandidates(candidatures, selectedStatus, currentPage);
      })
      .catch((err) => console.log(err));
  }, [refetch]);

  useEffect(() => {
    filterCandidates(allCandidates, selectedStatus, currentPage);
  }, [selectedStatus, currentPage]);

  const filterCandidates = (candidatures, status, page) => {
    let filteredCandidates = candidatures;
    if (status) {
      console.log(status,"here");
      if(status == "rejetée"){
        filteredCandidates = candidatures.filter(
          (candidate) => candidate.is_accepted == "rejetée"
        );
      }
      else if (status === "pending") {
        filteredCandidates = candidatures.filter(
          (candidate) => candidate.is_accepted == ""
        );
      } else if (status == "acceptée") {
        filteredCandidates = candidatures.filter(
          (candidate) => candidate.is_accepted === "acceptée"
        );
      } else {
      }
    }
    console.log("Filtered Candidates: ", filteredCandidates);
    setCandidates(
      filteredCandidates.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );
    setTotalPages(Math.ceil(filteredCandidates.length / itemsPerPage));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    deleteCandidature()
      .then(() => {
        toast.success("Candidature supprimée avec succès");
        const updatedCandidates = allCandidates.filter(
          (candidate) => candidate._id !== id
        );
        setAllCandidates(updatedCandidates);
        filterCandidates(updatedCandidates, selectedStatus, currentPage);
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression de la candidature", err);
        toast.error("Erreur lors de la suppression de la candidature");
      });
  };

  const statusOptions = [
    { value: "", label: "Tous les statuts" },
    { value: "acceptée", label: "Acceptée" },
    { value: "rejetée", label: "Rejetée" },
    { value: "pending", label: "En attente" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl mt-2">Toutes les candidatures</h1>
          <p className="text-gray-600 mt-2">
            Une liste de toutes les candidatures disponibles sur notre
            plateforme.
          </p>
        </div>
        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          placeholder="Sélectionner un statut"
          className="max-w-xs ml-auto"
          aria-label="Sélectionner un statut" // Ajout de l'aria-label pour l'accessibilité
        >
          {statusOptions.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </Select>
        <div className="ml-auto"></div>
      </div>
      <div className="overflow-x-auto">
        <Table aria-label="Tableau des candidatures">
          <TableHeader>
            <TableColumn>Nom</TableColumn>
            <TableColumn>Offre Correspondante</TableColumn>
            <TableColumn>Score</TableColumn>
            <TableColumn>Statut</TableColumn>
            <TableColumn>Date d'entretien</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {candidates?.map((candidate, index) => {
              const OffreName = Offre.find((e) => e._id === candidate.offre_id);
              console.log(OffreName);
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <p>{`${candidate.nom} ${candidate.prénom}`}</p>
                      <p className="text-gray-600">{candidate.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{OffreName?.titre}</TableCell>
                  <TableCell>
                    <Progress
                      size="sm"
                      radius="sm"
                      classNames={{
                        base: "max-w-md",
                        track: "drop-shadow-md border border-default",
                        indicator: "bg-green-500",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60",
                      }}
                      label="Score"
                      value={candidate?.quiz_score}
                      showValueLabel={true}
                    />
                  </TableCell>
                  <TableCell>
                    {!candidate.is_accepted ? (
                      <>
                        <ButtonGroup>
                          <Button
                            color="success"
                            variant="flat"
                            onClick={() => {
                              setId(candidate._id);
                              setOpen(true);
                            }}
                          >
                            Accepter
                          </Button>
                          <Button
                            color="danger"
                            variant="flat"
                            onClick={() => {
                              setCandidature(candidate._id, "rejetée");
                              re(!refetch);
                            }}
                          >
                            Rejeter
                          </Button>
                        </ButtonGroup>
                      </>
                    ) : (
                      candidate.is_accepted
                    )}
                  </TableCell>
                  <TableCell>
                    {candidate.is_accepted === "acceptée" && candidate.interview
                      ? new Date(candidate.interview).toLocaleString()
                      : "Non planifiée"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip content="Voir détails">
                        <span
                          className="text-lg text-default-400 cursor-pointer active:opacity-50"
                          onClick={() =>
                            (window.location.href = `/candidature/${candidate._id}`)
                          }
                        >
                          <EyeIcon />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Supprimer">
                        <span
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                          onClick={() => handleDelete(candidate._id)}
                        >
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </div>
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
