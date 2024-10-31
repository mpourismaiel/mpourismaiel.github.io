import type { AppProps } from "next/app";
import { Montserrat, Oxygen_Mono } from "next/font/google";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

import { GA_TRACKING_ID, pageview } from "@/lib/gtag";
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
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <div className={`${sansFont.variable} ${monoFont.variable} font-sans`}>
      <Component {...pageProps} />
      <div id="tooltip"></div>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </div>
  );
}
