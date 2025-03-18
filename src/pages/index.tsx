import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-900">
      <h1 className="text-4xl font-bold mb-2">Tic Tac Toe Game Master</h1>
      <p className="mb-6">Choose how you want to play</p>
      {/* Mode Selection */}
      <div className="mb-12 flex space-x-2">
        <Link
          href="/single-player"
          className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 text-gray-300 transition"
        >
          Play Alone
        </Link>
        <Link
          href="/easy-game"
          className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 text-gray-300 transition"
        >
          Easy
        </Link>
        <Link
          href="/meduim-game"
          className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 text-gray-300 transition"
        >
          Medium
        </Link>
        <Link
          href="/hard-game"
          className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 text-gray-300 transition"
        >
          Hard
        </Link>
      </div>
    </div>
  );
}
