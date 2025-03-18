import React, { useState } from "react";
import { useGame } from "../context/GameContext";

const GameInfo = () => {
  const { history, setCurrentMove, setIsAITurn } = useGame();
  const [isMovesInAsc, setMovesInAsc] = useState(true);

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setIsAITurn(false);
  }

  function formatMoves(move: number) {
    let description;
    if (move === history.length - 1) {
      description = "You are at move #" + move;
    } else if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} className="game-moves">
          {description}
        </button>
      </li>
    );
  }

  const movesInAsc = history.map((_, move) => formatMoves(move));
  const movesInDesc = function () {
    const rows = [];
    const historyLength = history.length - 1;
    for (let i = historyLength; i >= 0; i--) {
      rows.push(formatMoves(i));
    }
    return rows;
  };

  return (
    <div className="game-info mt-[100px]">
      <button
        onClick={() => setMovesInAsc(!isMovesInAsc)}
        className="bg-gray-300 py-1 px-2 rounded-lg text-gray-900  font-semibold mb-4"
      >
        Sort moves in {isMovesInAsc ? "DESC" : "ASC"}
      </button>
      <ol className="mb-2 list-decimal list-inside">
        {isMovesInAsc ? movesInAsc : movesInDesc()}
      </ol>
    </div>
  );
};

export default GameInfo;
