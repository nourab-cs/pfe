import { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import QuizForm from "./CreateQuiz";
import Pagination from "../layouts/Pagination";
import { getAll } from '../../services/quiz.services';
import { useLocation } from "react-router-dom";

  

function QuizList() {
  const [quizes, setQuizes] = useState([]);
  const [show, setShow] = useState(false);
const location = useLocation()
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 2;
  const [searchTerm, setSearchTerm] = useState('');

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
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "Cancel" : "Add new Quiz"}
      </button>
      {show ? (
        <QuizForm />
      ) : (
        <div>
          {quizes.map((e, i) => {
            return <div onClick={()=>{
              console.log(e);
               axiosClient.put(`/offre/add-quiz/${e._id}?id=${location.pathname.split("/")[3]}`)
            }} key={i}>{e.name}</div>;
          })}
        </div>
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
