import { useEffect, useState } from 'react';
import { getAll } from '../../services/stagiaire.service';
import Pagination from "../layouts/Pagination";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link, Button } from "@nextui-org/react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import jsPDF from "jspdf";
import toast from 'react-hot-toast';
import { axiosClient } from "../../services/axiosClient";
import StagiaireModal from "../layouts/Modal"; 

function Billing3() {
    const [stagiaires, setStagiaires] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStagiaire, setSelectedStagiaire] = useState(null);

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
        setIsModalOpen(true);
    };

    return (
        <section className="w-full">
            <Card shadow={false}>
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none flex gap-2 flex-col md:flex-row items-start justify-between"
                >
                    <div className="w-full mb-2">
                        <Typography className="font-bold" color="blue-gray">
                            Informations sur les stagiaires
                        </Typography>
                        <Typography
                            className="mt-1 font-normal text-gray-600"
                            variant="small"
                        >
                            Afficher et mettre à jour les détails des stagiaires rapidement et facilement.
                        </Typography>
                    </div>
                    <div className="w-full">
                        <Button
                            href="/admin/create-stagiaire"
                            as={Link}
                            color="primary"
                            variant="solid"
                        >
                            Ajouter une offre
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="flex flex-col gap-4 p-4">
                    {stagiaires.reverse().map((stagiaire, index) => (
                        <Card
                            key={index}
                            shadow={false}
                            className="rounded-lg border border-gray-300 p-4"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="border border-gray-200 p-2.5 rounded-lg">
                                        {stagiaire.nom}
                                    </div>
                                    <div>
                                        <Typography variant="small" color="blue-gray" className="mb-1 font-bold">
                                            {stagiaire.prenom}
                                        </Typography>
                                        <Typography
                                            className="text-gray-600 text-xs font-normal"
                                        >
                                            {stagiaire.specialite}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Button
                                        size="sm"
                                        variant="text"
                                        className="flex items-center gap-2"
                                        onClick={() => generatePDF(stagiaire)}
                                    >
                                        Générer PDF
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="text"
                                        className="flex items-center gap-2"
                                        onClick={() => handleEdit(stagiaire)}
                                    >
                                        <PencilIcon className="h-4 w-4 text-blue-500" />
                                        Modifier
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="text"
                                        color="red"
                                        className="flex items-center gap-2"
                                        onClick={() => handleDelete(stagiaire._id)}
                                    >
                                        <TrashIcon className="h-4 w-4 text-red-500" />
                                        Supprimer
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </CardBody>
            </Card>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            {isModalOpen && (
                <StagiaireModal
                    setOpenModal={setIsModalOpen}
                    stagiaire={selectedStagiaire}
                />
            )}
        </section>
    );
}

export default Billing3;
