import React, { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import QuizForm from "./CreateQuiz";
import Pagination from "../layouts/Pagination";
import { getAll } from '../../services/quiz.services';
import { useLocation } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";

function QuizList() {
  const [quizes, setQuizes] = useState([]);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState('');

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
        setQuizes(res.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {quizes.map((quiz, index) => (
              <TableRow key={index}>
                <TableCell>{quiz.name}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      console.log(quiz);
                      axiosClient.put(`/offre/add-quiz/${quiz._id}?id=${location.pathname.split("/")[3]}`)
                    }}
                    ghost
                  >
                    Add
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
    </div>
  );
}

export default QuizList;
