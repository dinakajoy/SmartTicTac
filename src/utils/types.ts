import { ReactNode } from "react";

export enum Levels {
  SINGLE = "Single",
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export type GameContextType = {
  level: Levels | null;
  isAITurn: boolean;
  setIsAITurn: React.Dispatch<React.SetStateAction<boolean>>;
  history: (string | null)[][];
  currentMove: number;
  setCurrentMove: React.Dispatch<React.SetStateAction<number>>;
  xIsNext: boolean;
  currentSquares: (string | null)[];
  gameEndedWithoutAWinner: boolean;
  handlePlay: (nextSquares: (string | null)[]) => void;
  resetGame: () => void;
};

export interface GameProviderProps {
  children: ReactNode;
}
