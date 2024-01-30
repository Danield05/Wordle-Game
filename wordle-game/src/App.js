import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import GameOver from './components/GameOver';
import Keyboard from './components/Keyboard';
import { boardwordle, generateWords } from './Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardwordle);
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [currentAttempt, setCurrAttempt] = useState({ attempt: 0, letterPoss: 0 });
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false });

  const [disabledLetters, setDisabledLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [currentRandomWord, setCurrentRandomWord] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { wordSet, todaysWord } = await generateWords();
        setWordSet(wordSet);
        setCorrectWord(todaysWord);
        setCurrentRandomWord(todaysWord);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchData();
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPoss > 4) return;

    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPoss] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currentAttempt.attempt,
      letterPoss: currentAttempt.letterPoss + 1,
    });
  };

  const onEnter = () => {
    if (currentAttempt.letterPoss !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currentAttempt.attempt][i];
    }

    setCurrAttempt({
      attempt: currentAttempt.attempt + 1,
      letterPoss: 0,
    });

    if (!wordSet.has(currWord.toUpperCase())) {
      alert("Word not in the list");
    }

    if (currWord.toUpperCase() === correctWord.toUpperCase()) {
      setSuccessMessage(`Congratulations, You won!`);
      setGameOver({ gameOver: true, guessedWord: true });
    }

    if (currentAttempt.attempt === 5) {
      setSuccessMessage(`You didn't guess correctly!`);
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currentAttempt.letterPoss === 0) return;

    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPoss - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({
      ...currentAttempt,
      letterPoss: currentAttempt.letterPoss - 1,
    });
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>

      {currentRandomWord && (
        <div className="random-word">{`${currentRandomWord}`}</div>
      )}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <AppContext.Provider
        value={{
          board,
          setBoard,
          correctWord,
          wordSet,
          setCorrectWord,
          currentAttempt,
          setCurrAttempt,
          gameOver,
          setGameOver,
          disabledLetters,
          setDisabledLetters,
          almostLetters,
          setAlmostLetters,
          correctLetters,
          setCorrectLetters,
          onSelectLetter,
          onEnter,
          onDelete,
        }}
      >
        
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
        
      </AppContext.Provider>
        <div className='rules'>
          <p><strong>Instrucciones:</strong> Solo tienes 6 intentos para comprobar la palabra, las casillas marcadas en 🟩 significan que tienen la letra </p>
          <p> en la posicion correcta, y las letras marcadas en 🟨 son aquellas que pertenecen a la palabra</p>
          <p>pero que no estan en el orden correcto.</p>
        </div>
      {gameOver.gameOver && (
        <button className='newGame' onClick={handlePlayAgain}>Play Again</button>
      )}

      <br />
      <br />
    </div>
  );
}

export default App;
