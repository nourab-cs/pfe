// App.js

import { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import qBank from "./data";
import Questions from "./Questions";
import Score from "./Score";

const Quiz = () => {
  const [questions, setQuestions] = useState(qBank);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  // set time for each question
  const [timer, setTimer] = useState(5);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLastq, setIsLastq] = useState(false);

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
    if (currentQuestion + 2 === questions.length) {
      setIsLastq(true);
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setTimer(10);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="card container mt-2 mx-auto max-w-xl flex justify-center items-center">
      {!quizStarted ? (
        <div>
          <div className="card-body">
            <h2 className="text-2xl font-bold">Start Test</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={startQuiz}
            >
              Start Test
            </button>
          </div>
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
      ) : (
        <Score
          score={score}
          setScore={setScore}
          setCurrentQuestion={setCurrentQuestion}
          setQuizStarted={setQuizStarted}
          setIsLastq={setIsLastq}
          setTimer={setTimer}
        />
      )}
    </div>
  );
};

export default Quiz;
