import React, { useState, useEffect } from 'react';
import questions from './QuizData';

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
    const [submittedResponses, setSubmittedResponses] = useState([]);
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes (180 seconds)

    useEffect(() => {
        const storedQuizState = JSON.parse(localStorage.getItem('quizState'));
        if (storedQuizState) {
            setCurrentQuestion(storedQuizState.currentQuestion);
            setScore(storedQuizState.score);
            setShowResult(storedQuizState.showResult);
            setSelectedOptions(storedQuizState.selectedOptions);
            setSubmittedResponses(storedQuizState.submittedResponses);
            setTimeLeft(storedQuizState.timeLeft);
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0 && !showResult) {
                setTimeLeft(timeLeft - 1);
            } else {
                clearInterval(timer);
                if (!showResult) {
                    setShowResult(true);
                    localStorage.removeItem('quizState');
                }
            }
        }, 1000);

        const quizState = {
            currentQuestion,
            score,
            showResult,
            selectedOptions,
            submittedResponses,
            timeLeft
        };
        localStorage.setItem('quizState', JSON.stringify(quizState));

        return () => clearInterval(timer);
    }, [currentQuestion, score, showResult, selectedOptions, submittedResponses, timeLeft]);

    const handleAnswerClick = (optionId, isCorrect) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[currentQuestion] = { optionId, isCorrect };
        setSelectedOptions(updatedSelectedOptions);
        if (isCorrect) {
            setScore(score + 1);
        }
    };

    const handlePrevButtonClick = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const handleNextButtonClick = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const handleSubmitButtonClick = () => {
        const submittedResponses = selectedOptions.map((selectedOption, index) => {
            const question = questions[index];
            return {
                text: question.text,
                selectedOption: selectedOption?.optionId,
                isCorrect: selectedOption?.isCorrect,
            };
        });
        setShowResult(true);
        setSubmittedResponses(submittedResponses);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedOptions(Array(questions.length).fill(null));
        setTimeLeft(180); // Reset timer to 3 minutes
    };

    const exitQuiz = () => {
        alert("You have exited the quiz.");
        setShowResult(true); // Show result when exiting quiz
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="quiz-container">
            {showResult ? (
                <div>
                    <h2>Quiz Result</h2>
                    <p>Your Score: {score}/{questions.length}</p>
                    <button onClick={resetQuiz} className="button">Restart Quiz</button>
                    <button onClick={exitQuiz} className="button exit-button">Exit Quiz</button>
                    <div>
                        <h2>Submitted Responses</h2>
                        <ul>
                            {submittedResponses.map((response, index) => (
                                <li key={index}>
                                    <p>{response.text}</p>
                                    <p>Selected Option: {response.selectedOption}</p>
                                    {response.isCorrect ? (
                                        <p>Correct</p>
                                    ) : (
                                        <p>Incorrect</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="question-container">
                        <h2 className="question">Question {currentQuestion + 1}</h2>
                        <p>{questions[currentQuestion].text}</p>
                    </div>
                    <ul className="options">
                        {questions[currentQuestion].options.map(option => (
                            <li
                                key={option.id}
                                onClick={() => handleAnswerClick(option.id, option.isCorrect)}
                                className={`option ${selectedOptions[currentQuestion]?.optionId === option.id ? 'selected' : ''}`}
                            >
                                {option.text}
                            </li>
                        ))}
                    </ul>
                    <div className="buttons-container">
                        {currentQuestion !== 0 && (
                            <button onClick={handlePrevButtonClick} className="button prev-button">Previous</button>
                        )}
                        {currentQuestion !== questions.length - 1 && (
                            <button onClick={handleNextButtonClick} className="button next-button">Next</button>
                        )}
                        {currentQuestion === questions.length - 1 && (
                            <button onClick={handleSubmitButtonClick} className="button submit-button">Submit</button>
                        )}
                    </div>
                    <button onClick={exitQuiz} className="button exit-button">Exit Quiz</button>
                    <div className="timer-container">
                        <p>Time Left: {formatTime(timeLeft)}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;

