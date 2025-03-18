import { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import Square from "./Square";
import { calculateWinner, getAIMove } from "@/utils/helpers";
import { Levels } from "@/utils/types";

const GameBoard = () => {
  const {
    level,
    isAITurn,
    setIsAITurn,
    xIsNext,
    currentSquares,
    handlePlay,
    gameEndedWithoutAWinner,
    resetGame,
  } = useGame();

  const winnerInfo = calculateWinner(currentSquares);

  const handleClick = (i: number) => {
    if (calculateWinner(currentSquares) || currentSquares[i] || isAITurn)
      return;

    const nextSquares = [...currentSquares];
    if (level === Levels.SINGLE) {
      nextSquares[i] = xIsNext ? "X" : "O";
      handlePlay(nextSquares);
    } else {
      nextSquares[i] = "X";
      handlePlay(nextSquares);
      setIsAITurn(true);
      if (calculateWinner(nextSquares) || currentSquares[i] || isAITurn) return;

      const timeoutId = setTimeout(() => {
        const cell = getAIMove(nextSquares, level);
        if (cell) nextSquares[cell] = "O";
        handlePlay(nextSquares);
        setIsAITurn(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    if (winnerInfo?.winner) {
      winnerInfo?.cells.forEach((square) => {
        const element = document.getElementById(String(square));
        if (element) {
          element.classList.add("border", "border-green-500");
        }
      });
    } else {
      const squares = document.getElementsByClassName("square");
      [...squares].forEach((square) => {
        square.classList.remove("border", "border-green-500");
      });
    }
  }, [winnerInfo]);

  let status;
  if (winnerInfo?.winner) {
    status = `Winner: ${winnerInfo.winner}`;
  } else if (!winnerInfo?.winner && gameEndedWithoutAWinner) {
    status = "No Winner!";
  } else {
    status =
      level !== Levels.SINGLE
        ? `Next Player: ${isAITurn ? "O" : "X"}`
        : `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game-board">
      <div className="font-semibold h-[100px] flex items-center justify-start">
        {status}{" "}
        {(winnerInfo?.winner || gameEndedWithoutAWinner) && (
          <button
            onClick={resetGame}
            className="bg-gray-400 py-1 px-2 rounded-lg ml-4 text-gray-900  font-semibold"
          >
            Start all over
          </button>
        )}
      </div>
      <div className="bg-gray-700 p-4 rounded-lg">
        {[1, 2, 3].map((row, rowIndex) => (
          <div className="grid grid-cols-3 gap-2 p-4 shadow-lg" key={rowIndex}>
            {[0, 1, 2].map((col, colIndex) => {
              const value = row + rowIndex * 2 + col - 1;
              return (
                <Square
                  key={colIndex}
                  id={String(value)}
                  value={currentSquares[value]}
                  squareClicked={() => handleClick(value)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
