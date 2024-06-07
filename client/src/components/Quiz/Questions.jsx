// Questions.js

import  { useState } from 'react';

const Questions = ({ questions, 
					handleNextQuestion, 
					currentQuestion, 
					handleAnswerClick, timer, isLastq }) => {
	const optionIds = ['A', 'B', 'C', 'D'];
	const [selectedOption, setSelectedOption] = useState(null);
	
	const handleOptionClick = (option) => {
		setSelectedOption(option);
		handleAnswerClick(option);
	};
	
	return (
        <div className="container mt-3 bg-gray-100 p-4">
        <div>
            <div className="p-4">
                <p className="mt-2 text-red-500">
                   Temps Restant: {timer}
                </p>
                <h4 className="text-lg font-bold mb-4">
                    { questions[currentQuestion].id}{') '}
                    { questions[currentQuestion].question}
                </h4>
                <div className="grid gap-2">
                    { 
                        questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className={`border border-gray-300 rounded p-2 transition-colors duration-200 
                                            ${selectedOption === option ? 'bg-blue-100' : 'bg-white'}`}
                                onClick={() => {handleOptionClick(option); handleNextQuestion() }}
                            >
                                {optionIds[index]}{')'} {option}
                            </button>
                        ))
                    }
                </div>
                <div className="flex justify-between mt-4">
                    <p className="text-sm">
                        Question {currentQuestion + 1} de {questions.length}
                    </p>
                 
                </div>
            </div>
        </div>
    </div>
    
	);
};

export default Questions;
