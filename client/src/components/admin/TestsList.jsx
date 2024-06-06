// TestsList.js
import React, { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import QuizForm from "../Quiz/CreateQuiz";
import Pagination from "../layouts/Pagination";
import { getAll } from "../../services/quiz.services";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { Link, Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import UpdateQuizModal from "../Quiz/UpdateQuizModal";
import {PlusIcon, EditIcon, DeleteIcon } from "../layouts/icons";
import { useShow } from "../../stores/userStore";
import DeleteModal from "../layouts/DeleteModal";

function TestsList() {
  
  const [confirmDelete,setconfirmDelete]=useState(false)
  
  const [show,setShow]=useState(false)
  const [quizzes, setQuizzes] = useState([]);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  useEffect(() => {
    axiosClient
      .get("/quiz/all")
      .then((res) => {
        setQuizzes(res?.data);
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getAll()
      .then((res) => {
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        setQuizzes(
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

  const handleDelete = (id) => {
    console.log(id);
    axiosClient
      .delete(`/quiz/delete/${id}`)
      .then(() => {
        toast.success("le test  est supprimé avec succès");
        setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression du quiz", err);
        toast.error("Erreur lors de la suppression du quiz");
      });
  };
  

  const handleEdit = (quiz) => {
    setSelectedQuiz(quiz);
    onOpen();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div>
         <h1 className="text-3xl mt-2">Tous les tests</h1>
          <p className="text-gray-600 mt-2">
            Une liste de tous les tests disponibles sur notre plateforme.
          </p>
        </div>
        <div  className={show ? "hidden" : "ml-auto"}>
        <Button
            color="primary"
            endContent={<PlusIcon />}
            href="/admin/create-test"
            as={Link}

          >
            Ajouter un nouveau test 
          </Button>
        </div>
      </div>
      {show ? (
        <QuizForm />
      ) : (
        <div className="overflow-x-auto">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Nom</TableColumn>

              <TableColumn>Date de création</TableColumn>

              <TableColumn>Questions</TableColumn>

              <TableColumn>Offres</TableColumn>

              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {quizzes.reverse().map((quiz) => (
                <TableRow key={quiz._id}>
                  <TableCell>{quiz.name}</TableCell>
                  <TableCell>
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{quiz.questions.length}</TableCell>
                  <TableCell>{quiz.offres_id.length}</TableCell>

                  <TableCell>
                   
                    <div className="flex items-center gap-2">
                      <Tooltip content="Modifier">
                        <span
                          className="text-lg text-default-400 cursor-pointer active:opacity-50"
                          onClick={() => handleEdit(quiz)}
                        >
                          <EditIcon />
                        </span>
                      </Tooltip>
                      {/* <Tooltip color="danger" content="Supprimer">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => {
                          if (quiz.offres_id.length === 0) handleDelete(quiz._id);
                        }}
                        >
                        <DeleteIcon />
                      </span>
                    </Tooltip> */}
                      <Tooltip
                        color={quiz.offres_id.length > 0 ? "default" : "primary"}
                        content={
                          quiz.offres_id.length > 0
                            ? "Ce quiz est associé à une offre et ne peut pas être supprimé"
                            : "Supprimer"
                        }
                      >
                        <span
                          className={`text-lg cursor-pointer active:opacity-50 ${
                            quiz.offres_id.length > 0
                              ? "text-default cursor-not-allowed"
                              : "text-primary"
                          }`}
                          onClick={() => {
                           setconfirmDelete(true)
                     
                          }}
                        >
                        {confirmDelete &&  
                        <DeleteModal
                         quiz={quiz}
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
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <UpdateQuizModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}

        quiz={selectedQuiz}
      />
    </div>
  );
}

export default TestsList;
