import type { AppProps } from "next/app";
import { Lexend, Oxygen_Mono } from "next/font/google";

import "@/styles/globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans",
});

const novaMono = Oxygen_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${lexend.variable} ${novaMono.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
