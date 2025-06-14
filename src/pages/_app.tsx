import { CharactersContextProvider } from "@/contexts/CharactersContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CharactersContextProvider>
      <Component {...pageProps} />
    </CharactersContextProvider>
  );
}
