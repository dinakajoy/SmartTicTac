import { Levels } from "./types";

export const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        cells: line,
        winner: squares[a],
      };
    }
  }
  return null;
};

export function getRandomMove(squares: (string | null)[]) {
  const emptyCells = squares
    .map((value, index) => (value === null ? index : null))
    .filter((index): index is number => index !== null);

  // Randomly pick one cell
  const randomCell =
    emptyCells.length > 0
      ? emptyCells[Math.floor(Math.random() * emptyCells.length)]
      : null;

  return randomCell;
}

export function getBestMove(
  squares: (string | null)[],
  ai: string,
  player: string
) {
  // Winning move
  const squareLength = squares.length;

  for (let i = 0; i < squareLength; i++) {
    if (squares[i] === null) {
      squares[i] = ai;
      const getWinner = calculateWinner(squares);
      if (getWinner && getWinner.winner === ai) return i;
      squares[i] = null;
    }
  }

  // Blocking move
  for (let i = 0; i < squareLength; i++) {
    if (squares[i] === null) {
      squares[i] = player;
      const getWinner = calculateWinner(squares);
      if (getWinner && getWinner.winner === player) return i;
      squares[i] = null;
    }
  }

  // Take center
  if (squares[4] === null) return 4;

  // Take corners
  const corners = [0, 2, 6, 8].filter((i) => squares[i] === null);
  if (corners.length > 0)
    return corners[Math.floor(Math.random() * corners.length)];

  // Take any available spot
  return squares.findIndex((cell) => cell === null);
}

function minimax(
  squares: (string | null)[],
  ai: string,
  player: string,
  depth: number,
  isMaximizing: boolean
) {
  const getWinner = calculateWinner(squares);
  if (getWinner && getWinner.winner === ai) return 10 - depth;
  if (getWinner && getWinner.winner === player) return depth - 10;
  if (!squares.includes(null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = ai;
        const score = minimax(squares, ai, player, depth + 1, false);
        squares[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = player;
        const score = minimax(squares, ai, player, depth + 1, true);
        squares[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

export function getMinimaxMove(
  squares: (string | null)[],
  ai: string,
  player: string
) {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = ai;
      const score = minimax(squares, ai, player, 0, false);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

export const getAIMove = (squares: (string | null)[], level: Levels | null) => {
  switch (level) {
    case Levels.EASY:
      return getRandomMove(squares);
    case Levels.MEDIUM:
      return getBestMove(squares, "O", "X");
    case Levels.HARD:
      return getMinimaxMove(squares, "O", "X");
    default:
      return null;
  }
};
