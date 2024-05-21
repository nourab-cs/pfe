// TestsList.js
import React, { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import QuizForm from "../Quiz/CreateQuiz";
import Pagination from "../layouts/Pagination";
import { getAll } from '../../services/quiz.services';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { Link, Button } from "@nextui-org/react";
import toast from 'react-hot-toast';
import UpdateQuizModal from "../Quiz/UpdateQuizModal";

function TestsList() {
  const [quizzes, setQuizzes] = useState([]);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

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
        setQuizzes(res.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    axiosClient.delete(`/quiz/delete/${id}`)
      .then(() => {
        toast.success("Quiz supprimé avec succès");
        setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression du quiz", err);
        toast.error("Erreur lors de la suppression du quiz");
      });
  };

  const handleEdit = (quiz) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setShow(!show);
        }}
        ghost={!show}
      >
        {show ? "Cancel" : "Add new Quiz"}
      </Button>
      {show ? (
        <QuizForm />
      ) : (
        <Table aria-label="Example table with dynamic content">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {quizzes.reverse().map((quiz) => (
              <TableRow key={quiz._id}>
                <TableCell>{quiz.name}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={() => handleEdit(quiz)}
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => handleDelete(quiz._id)}
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
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && (
        <UpdateQuizModal
          setOpenModal={setIsModalOpen}
          quiz={selectedQuiz}
        />
      )}
    </div>
  );
}

export default TestsList;
