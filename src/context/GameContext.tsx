import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { calculateWinner } from "../utils/helpers";
import { GameContextType, GameProviderProps, Levels } from "@/utils/types";

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: GameProviderProps) => {
  const router = useRouter();
  const currentUrl = router.asPath;

  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [isAITurn, setIsAITurn] = useState(false);
  const [level, setLevel] = useState<Levels | null>(null);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [gameEndedWithoutAWinner, setGameEndedWithoutAWinner] =
    useState<boolean>(false);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  useEffect(() => {
    if (currentUrl === "/single-player") {
      setLevel(Levels.SINGLE);
    }
    if (currentUrl === "/easy-game") {
      setLevel(Levels.EASY);
    }
    if (currentUrl === "/meduim-game") {
      setLevel(Levels.MEDIUM);
    }
    if (currentUrl === "/hard-game") {
      setLevel(Levels.HARD);
    }
    if (!level && currentUrl !== "/") {
      router.push("/");
    }
    if (isGameEndedWithoutAWinner()) {
      setGameEndedWithoutAWinner(true);
    } else {
      setGameEndedWithoutAWinner(false);
    }
  }, [currentMove, history, currentUrl, level, router]);

  function isGameEndedWithoutAWinner() {
    return (
      currentSquares.every((square) => square !== null) &&
      !calculateWinner(currentSquares)
    );
  }

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setIsAITurn(false);
    setLevel(Levels.SINGLE);
    setCurrentMove(0);
    setGameEndedWithoutAWinner(false);
  }

  if (!children) return null;

  return (
    <GameContext.Provider
      value={{
        level,
        isAITurn,
        setIsAITurn,
        history,
        currentMove,
        setCurrentMove,
        xIsNext,
        currentSquares,
        gameEndedWithoutAWinner,
        handlePlay,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
