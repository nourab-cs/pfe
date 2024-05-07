import { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import QuizForm from "./CreateQuiz";

function QuizList() {
  const [quizes, setQuizes] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axiosClient
      .get("/quiz/all")
      .then((res) => {
        setQuizes(res?.data);
      })
      .then((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        Add new Quiz
      </button>
      {show ? (
        <QuizForm />
      ) : (
        <div>
          {quizes.map((e, i) => {
            return <div key={i}>{e.name}</div>;
          })}
        </div>
      )}
    </div>
  );
}

export default QuizList;
