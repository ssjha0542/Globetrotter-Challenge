import React, { useEffect, useRef, useState } from "react";
import { dataSet } from "./Data";

import "./App.css";

const options = dataSet.map((d) => d.city);
const App = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShouldShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const modalRef = useRef(null);

  const currQuestion = dataSet[questionNumber];

  function showModal() {
    const funFact = currQuestion?.fun_fact;
    const handleNextClick = () => {
      setQuestionNumber((prev) => {
        if (prev === dataSet.length - 1) return;
        console.log(prev);
        return prev + 1;
      });
      setShouldShowModal(false);
    };
    const handlePlayAgain = () => {
      setShouldShowModal(false);
    };
    return (
      <div ref={modalRef} className="modal">
        {isCorrect ? (
          <>
            <p>Correct Answer 🚀</p>
            {funFact.map((fun) => (
              <p>😐{fun}</p>
            ))}
          </>
        ) : (
          <p>😟Not the right answer</p>
        )}
        <div className="options">
          <button onClick={handleNextClick}>Next Question</button>
          {!isCorrect && <button onClick={handlePlayAgain}>Play Again</button>}
        </div>
      </div>
    );
  }
  function getClues() {
    {
      return currQuestion.clues.map((clue, index) => (
        <div>
          Clue{index + 1}: {clue}
        </div>
      ));
    }
  }

  function handleOptionClick(e) {
    if (e.target.value === dataSet[questionNumber]?.city) {
      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setIsCorrect(true);
      setShouldShowModal(true);
    } else {
      setIsCorrect(false);
      setShouldShowModal(true);
    }
  }
  function displayConfetti() {
    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
    return <div className="confetti">🎊</div>;
  }
  return (
    <div className="container">
      <h5>
        The Globetrotter Challenge – The Ultimate Travel Guessing Game! 🚀
      </h5>

      <div>
        {dataSet.map((questionObj, index) => (
          <p className="question__box" key={index}>
            {index === questionNumber && getClues()}
          </p>
        ))}
      </div>
      {shouldShowModal && showModal()}
      {dataSet.length > questionNumber ? (
        <div className="options__container">
          {options.map((opt) => (
            <>
              <button
                className="opt__btn"
                onClick={handleOptionClick}
                value={opt}
              >
                {opt}
              </button>
            </>
          ))}
        </div>
      ) : (
        <p>Game Has Ended. Total Score is {score}</p>
      )}
      <div className="score__container">Score : {score}</div>
      {showConfetti && displayConfetti()}
    </div>
  );
};

export default App;
