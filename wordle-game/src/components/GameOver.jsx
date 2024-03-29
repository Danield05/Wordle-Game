import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  
  const {currentAttempt,gameOver,correctWord} = useContext(AppContext)

  return (
    <div className="gameOver">
    <h3>{gameOver.guessedWord ? "You Guessed Correctly" : "Oops, Try Next time"}</h3>
    {gameOver.guessedWord && (
      <>
        <h3>Correct word: {correctWord.toUpperCase()}</h3>
        <h3>You guessed in {currentAttempt.attempt} {currentAttempt.attempt > 2 ? 'attempts' : 'attempt'}</h3>
      </>
    )}
  </div>
  
  );
}

export default GameOver;