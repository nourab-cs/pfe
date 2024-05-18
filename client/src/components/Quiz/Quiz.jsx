// App.js

import { useState, useEffect } from "react";
import Questions from "./Questions";
import { axiosClient } from "../../services/axiosClient";
import { useLocation, redirect } from "react-router-dom";
import Loader from "../layouts/Loader";
import Modal from "../layouts/GlobalModal";
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  // set time for each question
  const [timer, setTimer] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLastq, setIsLastq] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(null);
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    if (localStorage?.getItem("quiz-done"))
      window.location.href = "http://localhost:5173";
    axiosClient
      .get("/offre/get-quiz?id=" + id)
      .then((res) => setQuestions(res.data.questions));
  }, []);

  useEffect(() => {
    if (isLastq) {
      setLoading(true);
      localStorage.setItem("quiz-done", true);
      setTimeout(() => {
        const final = (100 / questions.length) * score;
        const cand_id = localStorage.getItem("cand_id");
        axiosClient
          .put(
            "/postuler/score/" + cand_id,
            { score: final },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data?.message == "succeded") {
              console.log(
                "here===========================================================>"
              );

              console.log(res.data);
              //create a state to save the candidature
              console.log(
                "here===========================================================>"
              );

              setValidated(true);
            } else setValidated(false);
          })
          .catch((err) => console.log(err));
        setLoading(false);
      }, 3000);
    }
  }, [isLastq]);

  useEffect(() => {
    if (quizStarted) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
            // Reset timer for the next question
            return 10;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentQuestion, quizStarted]);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 === questions.length) {
      setIsLastq(true);
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setTimer(10);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="card container mt-2 mx-auto max-w-xl flex justify-center items-center full-screen-container">
      {!quizStarted ? (
        <div>
          {validated == null && (
            <div className="card-body">
              <h2 className="text-2xl font-bold">Start Test</h2>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={startQuiz}
              >
                Start Test
              </button>
            </div>
          )}
        </div>
      ) : currentQuestion < questions.length ? (
        <Questions
          questions={questions}
          handleNextQuestion={handleNextQuestion}
          currentQuestion={currentQuestion}
          handleAnswerClick={handleAnswerClick}
          timer={timer}
          isLastq={isLastq}
        />
      ) : loading ? (
        <Loader />
      ) : (
        // pass candidature data as props to the modal 
        <Modal result={validated} />
      )}
    </div>
  );
};

export default Quiz;
