// import React from 'react';
import React, { useState } from 'react';
import './App.css';
import QuizApp from './QuizApp';
import WelcomePage from './WelcomePage';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
      setQuizStarted(true);
  };

  return (
      <div className="app-container">
          {quizStarted ? (
              <QuizApp />
          ) : (
              <WelcomePage onStart={handleStartQuiz} />
          )}
      </div>
  );
}

export default App;