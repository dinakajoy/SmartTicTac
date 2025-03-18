import GameBoard from "@/components/GameBoard";
import GameInfo from "@/components/GameInfo";
import Header from "@/components/Header";

export default function SinglePlayer() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center text-gray-900 mt-4">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <GameBoard />
          <GameInfo />
        </div>
      </div>
    </>
  );
}
