import { AppProps } from "next/app";
import { GameProvider } from "../context/GameContext";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}
