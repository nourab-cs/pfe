import React, { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import QuizForm from "./CreateQuiz";
import Pagination from "../layouts/Pagination";
import { getAll } from "../../services/quiz.services";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Checkbox,
} from "@nextui-org/react";

function QuizList() {
  const [quizes, setQuizes] = useState([]);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/quiz/all")
      .then((res) => {
        setQuizes(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getAll()
      .then((res) => {
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        setQuizes(
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

  const handleCheckboxChange = (quizId) => {
    setSelectedQuizzes((prevSelected) =>
      prevSelected.includes(quizId)
        ? prevSelected.filter((id) => id !== quizId)
        : [...prevSelected, quizId]
    );
  };

  const handleAddQuizzesToOffre = async () => {
    const offreId = location.pathname.split("/")[3]; // Assuming offre_id is in the URL
    try {
      const response = await axiosClient.put(
        `/offre/add-quiz/${offreId}`,
        { quiz_ids: selectedQuizzes }
      );
      console.log('Quizzes added to offer:', response.data);
    } catch (error) {
      console.error('Error adding quizzes to offer:', error);
    }
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
        <>
          <Table aria-label="Example table with dynamic content">
            <TableHeader>
              <TableColumn>Select</TableColumn>
              <TableColumn>Name</TableColumn>
            </TableHeader>
            <TableBody>
              {quizes.map((quiz, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      isSelected={selectedQuizzes.includes(quiz._id)}
                      onChange={() => handleCheckboxChange(quiz._id)}
                    />
                  </TableCell>
                  <TableCell>{quiz.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={handleAddQuizzesToOffre}
            disabled={selectedQuizzes.length === 0}
          >
            Add Selected Quizzes to Offer
          </Button>
        </>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default QuizList;
