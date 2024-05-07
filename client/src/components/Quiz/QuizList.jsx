import { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";

function QuizList() {
  const [quizes, setQuizes] = useState([]);
  useEffect(() => {
    axiosClient
      .get("/quiz/all")
      .then((res) => {
        console.log(res.data);
        setQuizes(res.data);
      })
      .then((e) => {
        console.log(e);
      });
  }, []);
  return <div>QuizList</div>;
}

export default QuizList;
