import type { AppProps } from "next/app";
import { Montserrat, Oxygen_Mono } from "next/font/google";

import "@/styles/globals.css";

const sansFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const monoFont = Oxygen_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${sansFont.variable} ${monoFont.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
