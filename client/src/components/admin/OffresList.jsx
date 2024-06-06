// import React, { useEffect, useState } from "react";
// import { getAll } from "../../services/offre.service";
// import Pagination from "../layouts/Pagination";
// import toast from "react-hot-toast";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@nextui-org/react";
// import {PlusIcon} from "../layouts/icons";
// import { Link, Button } from "@nextui-org/react";
// import { axiosClient } from "../../services/axiosClient";
// import UpdateOffreModal  from "../offre/UpdateOffreModal";
// import { useOffre } from "../../stores/offreStore";
// const AllOffres = () => {
//   const [setOffre] = useOffre((state)=>[state.setOffre])
//   const [offers, setOffers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 6;
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOffre, setSelectedOffre] = useState(null);
//   useEffect(() => {
//     getAll()
//       .then((res) => {
//         setOffre(res.data)
//         setTotalPages(Math.ceil(res.data.length / itemsPerPage));
//         setOffers(
//           res.data.slice(
//             (currentPage - 1) * itemsPerPage,
//             currentPage * itemsPerPage
//           )
//         );
//       })
//       .catch((err) => console.log(err));
//   }, [currentPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const handleDelete = (id) => {
//     axiosClient.delete(`/offre/delete/${id}`)
//         .then(() => {
//             toast.success("Stagiaire supprimé avec succès");
//             setOffers(offers.filter(offer => offer._id !== id));
//         })
//         .catch(err => {
//             console.error('Erreur lors de la suppression du stagiaire', err);
//             toast.error("Erreur lors de la suppression du stagiaire");
//         });
// };
//   const handleEdit = (offer) => {
//     setSelectedOffre(offer);
//     setIsModalOpen(true);
// };
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h1 className="text-3xl mt-2">Toutes les offres</h1>
//           <p className="text-gray-600 mt-2">
//             Une liste de toutes les offres de stages disponibles sur notre
//             plateforme.
//           </p>
//         </div>
//         <div className="ml-auto">
//           {/* <Button
//             href="/create-offre"
//             as={Link}
//             color="primary"
//             variant="solid"
//           >
//             Ajouter une offre
//           </Button> */}
//           <Button color="primary" endContent={<PlusIcon />} href="/create-offre" as={Link}>
//               Ajouter une offre
//             </Button>
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <Table aria-label="Example static collection table">
//           <TableHeader>
//             <TableColumn>Titre</TableColumn>
//             <TableColumn>Domaine</TableColumn>
//             <TableColumn>Date limite</TableColumn>
//             <TableColumn></TableColumn>
//             <TableColumn></TableColumn>

//           </TableHeader>
//           <TableBody>
//             {offers.reverse().map((offer, index) => (
//               <TableRow key={index}>
//                 <TableCell>{offer.titre}</TableCell>
//                 <TableCell>{offer.domaine}</TableCell>
//                 <TableCell>{offer.dateLimite}</TableCell>
//                 <TableCell><Button
//                     href={`/admin/candidates_per_offre/${offer._id}`}
//                     as={Link}
//                     color="primary"
//                     variant="solid"
//                   >
//                     Candidatures
//                   </Button>
//                   </TableCell>
// <TableCell>
//                   <Button
//                     href={`/description/${offer._id}`}
//                     as={Link}
//                     color="primary"
//                     variant="solid"
//                   >
//                     Voir détails
//                   </Button>
                  
//                   <Button
//                                         size="sm"
//                                         variant="text"
//                                         color="red"
//                                         className="flex items-center gap-2"
//                                         onClick={() => handleDelete(offer._id)}
//                                     >
//                                         Supprimer
//                                     </Button>
//                   <Button
//                                         size="sm"
//                                         variant="text"
//                                         className="flex items-center gap-2"
//                                         onClick={() => handleEdit(offer)}
//                                     >
//                                         Modifier
//                                     </Button>
                  
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//       {isModalOpen && (
//                 <UpdateOffreModal
//                     setOpenModal={setIsModalOpen}
//                     offer={selectedOffre}
//                 />
//             )}
//     </div>
//   );
// };

// export default AllOffres;
import React, { useEffect, useState } from "react";
import { getAll } from "../../services/offre.service";
import Pagination from "../layouts/Pagination";
import toast from "react-hot-toast";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Link,
  useDisclosure
} from "@nextui-org/react";
import { PlusIcon, EditIcon, DeleteIcon, EyeIcon } from "../layouts/icons";
import { axiosClient } from "../../services/axiosClient";
import UpdateOffreModal from "../offre/UpdateOffreModal";
import { useOffre } from "../../stores/offreStore";

const AllOffres = () => {
  const [o,setOffre] = useOffre((state) => [state.Offre,state.setOffre]);
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [i, setI] = useState(0);

  const itemsPerPage = 6;
  const [selectedOffre, setSelectedOffre] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    getAll()
      .then((res) => {
        setOffre(res.data);
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        setOffers(
          res.data.reverse().slice(
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

  const handleDelete = (id) => {
    axiosClient
      .delete(`/offre/delete/${id}`)
      .then(() => {
        toast.success("Offre supprimée avec succès");
        setOffers(offers.filter((offer) => offer._id !== id));
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression de l'offre", err);
        toast.error("Erreur lors de la suppression de l'offre");
      });
  };

  const handleEdit = (offer,index) => {
    setSelectedOffre(offer);
  setI(index)
    onOpen();
  };

  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl mt-2">Toutes les offres</h1>
          <p className="text-gray-600 mt-2">
            Une liste de toutes les offres de stages disponibles sur notre
            plateforme.
          </p>
        </div>
        <div className="ml-auto">
          <Button
            color="primary"
            endContent={<PlusIcon />}
            href="/admin/create-offre"
            as={Link}

          >
            Ajouter une offre
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn className="w-80 truncate">Titre</TableColumn>
            <TableColumn>Domaine</TableColumn>
            <TableColumn>Date limite</TableColumn>
            <TableColumn>Candidatures</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {o?.map((offer, index) => (
              <TableRow key={index}>
                <TableCell>{offer.titre}</TableCell>
                <TableCell>{offer.domaine}</TableCell>
                <TableCell>{new Date(offer.dateLimite).toLocaleDateString()}</TableCell>
                <TableCell>
                <Link isBlock showAnchorIcon 
                    href={`/admin/candidates_per_offre/${offer._id}`}
                    color="foreground"
                  >
                    voir candidatures 
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip content="Voir détails">
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => window.location.href = `/description/${offer._id}`}
                      >
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip content="Modifier">
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => handleEdit(offer ,index)}
                      >
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Supprimer">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => handleDelete(offer._id)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
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
      <UpdateOffreModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        offer={selectedOffre}
        set={setSelectedOffre}
        i={i}
      />
    </div>
  );
};

export default AllOffres;

