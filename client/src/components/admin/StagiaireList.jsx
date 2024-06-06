import { useEffect, useState } from 'react';
import { getAll } from '../../services/stagiaire.service';
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
  Link,
  useDisclosure
} from "@nextui-org/react";
import { PlusIcon, EditIcon, DeleteIcon } from "../layouts/icons";
import jsPDF from "jspdf";
import toast from 'react-hot-toast';
import { axiosClient } from "../../services/axiosClient";
import StagiaireModal from "../layouts/Modal"; 
import DeleteStagiaireModal from '../DeleteStagiaireModal';
import { FaDownload } from "react-icons/fa";


function Billing3() {
    const [stagiaires, setStagiaires] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStagiaire, setSelectedStagiaire] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [confirmDelete,setconfirmDelete]=useState(false)



    useEffect(() => {
        getAll()
            .then((res) => {
                setTotalPages(Math.ceil(res.data.length / itemsPerPage));
                setStagiaires(res.data.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                ));
            })
            .catch((err) => console.log(err));
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };  

    const generatePDF = (stagiaire) => {
        try {
            const doc = new jsPDF();
            doc.text(`Nom: ${stagiaire.nom}`, 10, 10);
            doc.text(`Email: ${stagiaire.email}`, 10, 20);
            doc.text(`Prénom: ${stagiaire.prenom}`, 10, 30);
            doc.text(`Téléphone: ${stagiaire.telephone}`, 10, 40);
            doc.text(`Université: ${stagiaire.universite}`, 10, 50);
            doc.text(`Spécialité: ${stagiaire.specialite}`, 10, 60);
            doc.text(`Date de début: ${stagiaire.dateDebut}`, 10, 70);
            doc.text(`Date de fin: ${stagiaire.dateFin}`, 10, 80);
            doc.save(`${stagiaire.specialite}_attestation.pdf`);
        } catch (error) {
            console.error('Erreur lors de la génération du PDF :', error);
        }
    };

    const handleDelete = (id) => {
        axiosClient.delete(`/stagiaire/delete/${id}`)
            .then(() => {
                toast.success("Stagiaire supprimé avec succès");
                setStagiaires(stagiaires.filter(stagiaire => stagiaire._id !== id));
            })
            .catch(err => {
                console.error('Erreur lors de la suppression du stagiaire', err);
                toast.error("Erreur lors de la suppression du stagiaire");
            });
    };

    const handleEdit = (stagiaire) => {
      setSelectedStagiaire(stagiaire);
      onOpen();
    };


    


    // Fonction pour déterminer le statut du stage
    const getStatut = (dateDebut, dateFin) => {
      const now = new Date();
      const debut = new Date(dateDebut);
      const fin = new Date(dateFin);

      if (debut > now) {
        return "À venir";
      } else if (fin < now) {
        return "Terminé";
      } else {
        return "En cours";
      }
    };

    return (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl mt-2">Informations sur les stagiaires</h1>
              <p className="text-gray-600 mt-2">
              Afficher et mettre à jour les détails des stagiaires rapidement et facilement.
              </p>
            </div>
            <div className="ml-auto">
              <Button
                color="primary"
                endContent={<PlusIcon />}
                href="/admin/create-stagiaire"
                as={Link}
                >
                Ajouter un stagiaire
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Stagiaire</TableColumn>
                <TableColumn>Téléphone</TableColumn>
                <TableColumn>Université</TableColumn>
                <TableColumn>Spécialité</TableColumn>
                <TableColumn>Date de début</TableColumn>
                <TableColumn>Date de fin</TableColumn>
                <TableColumn>Stage</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {stagiaires.reverse().map((stagiaire, index) => (
                  <TableRow key={index}>
                    <TableCell>
                    <div>
                      <p>{`${stagiaire.nom} ${stagiaire.prenom}`}</p>
                      <p className="text-gray-600">{stagiaire.email}</p>
                    </div>
                  </TableCell>
                    <TableCell>{stagiaire.telephone}</TableCell>
                    <TableCell>{stagiaire.universite}</TableCell>
                    <TableCell>{stagiaire.specialite}</TableCell>
                    <TableCell>{new Date(stagiaire.dateDebut).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(stagiaire.dateFin).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatut(stagiaire.dateDebut, stagiaire.dateFin)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tooltip content="Attestation de stage">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => generatePDF(stagiaire)}
                          >
                               <FaDownload />
    
                          </span>
                        </Tooltip>
                        <Tooltip content="Modifier">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => handleEdit(stagiaire)}
                          >
                            <EditIcon />
                          </span>
                        </Tooltip>
                        <Tooltip color="primary" content="Supprimer">
                          <span
                            className="text-lg text-primary cursor-pointer active:opacity-50"
                            onClick={() => {
                              setconfirmDelete(true)
                        
                             }}
                          >
                            {confirmDelete &&  
                        <DeleteStagiaireModal
                        stagiaire={stagiaire}
                          set={setconfirmDelete}
                           c={confirmDelete} 
                           f={handleDelete}/>}
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
          
            <StagiaireModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            stagiaire={selectedStagiaire}
          />
         
        </div>
      );
}

export default Billing3;