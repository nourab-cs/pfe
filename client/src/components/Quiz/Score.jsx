// Score.js


const Score = ({ score, setScore, 
			setCurrentQuestion, setQuizStarted, 
			setIsLastq, setTimer}) => {
	return (
        <div className="bg-white rounded shadow-md p-4">
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <h4 className="text-lg mb-4">Your score: {score}</h4>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => { setCurrentQuestion(0); 
                        setScore(0); setQuizStarted(true); 
                        setIsLastq(false); setTimer(10);}}>
                Restart Quiz
            </button>
        </div>
    </div>
    
	)
}

export default Score;
