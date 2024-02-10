import React from 'react';
import './WelcomePage.css'; // Import CSS file for styling

function WelcomePage({ onStart }) {
    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Welcome to the Quiz!</h1>
            <div className="instructions-container">
                <p className="instructions-title">Instructions:</p>
                <ul className="instruction-list">
                    <li>Read each question carefully before answering.</li>
                    <li>Select the correct answer from the options provided.</li>
                    <li>You can navigate between questions using the "Next" and "Previous" buttons.</li>
                    <li>Once you've answered all questions, click "Submit" to see your results.</li>
                </ul>
            </div>
            <button onClick={onStart} className="start-button">Start Quiz</button>
        </div>
    );
}

export default WelcomePage;
