import React from "react";
import { useRouter } from "next/router";
import { useGame } from "@/context/GameContext";

const Header = () => {
  const router = useRouter();
  const { resetGame } = useGame();
  return (
    <header className="bg-gray-800 flex flex-col align-center justify-center p-10 text-gray-200 text-center">
      <h1 className="text-4xl font-bold mb-4">Tic Tac Toe Game Master</h1>
      <button
        onClick={() => {
          resetGame();
          router.push("/");
        }}
        className="m-auto w-[140px] mt-4 px-2 py-2 bg-red-600 rounded-lg shadow-md hover:bg-red-700 font-semibold transition"
      >
        RESTART GAME
      </button>
    </header>
  );
};

export default Header;
