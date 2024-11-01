import type { AppProps } from "next/app";
import { Montserrat, Oxygen_Mono } from "next/font/google";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

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
      <div id="tooltip"></div>
      {process.env.NODE_ENV !== "production" ? (
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      ) : null}
    </div>
  );
}
