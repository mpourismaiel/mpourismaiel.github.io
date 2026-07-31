import { motion } from "framer-motion";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="min-h-[100dvh] flex justify-center items-center py-24 lg:py-28">
      <div className="text-center flex flex-col justify-center items-center">
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0, y: -10 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-5 inline-flex flex-wrap justify-center items-center gap-2 max-w-full rounded-full border border-indigo-500/45 bg-indigo-500/10 px-3 py-1.5 font-mono text-[11px] sm:text-xs text-indigo-200 backdrop-blur-sm"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-indigo-400 animate-pulse" />
          Available for senior full-stack work
        </motion.div>
        <motion.h1
          initial={{ filter: "blur(10px)", opacity: 0, y: -10 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[30px] sm:text-[48px] lg:text-[78px] leading-[1.02] font-bold text-secondary-foreground break-words max-w-full"
        >
          Mahdi Pourismaiel
        </motion.h1>
        <motion.h2
          initial={{ filter: "blur(10px)", opacity: 0, y: -10 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg lg:text-[26px] font-bold mb-2 md:mb-4 text-secondary-foreground"
        >
          Full-Stack Web Developer
        </motion.h2>
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative mt-4 w-full"
        >
          <div className="absolute top-0 left-[12.5%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute top-0 left-[12.5%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute top-0 left-[12.5%] animate-shooting h-[5px] w-3/4 blur-sm" />
          <div className="absolute top-0 left-[12.5%] animate-shooting h-px w-3/4" />
        </motion.div>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 max-w-[56ch] text-base lg:text-lg leading-relaxed text-secondary-foreground/75"
        >
          Ten years shipping web products end to end — React, Vue and Svelte on
          the front, TypeScript, Go and Python behind them. Most recently Senior
          Full-Stack Developer at OPEN Ticketing Ecosystem, building an NFT
          minting studio and a spam-proof auth stack.
        </motion.p>
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-7 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="#projects"
            className="rounded-lg border border-indigo-500/60 bg-indigo-500/15 px-5 py-2.5 text-sm font-semibold text-indigo-100 backdrop-blur-sm transition-colors hover:border-indigo-500 hover:bg-indigo-500/25 hover:text-white"
          >
            See selected work
          </Link>
          <Link
            href="#experience"
            className="rounded-lg border border-white/15 bg-black/25 px-5 py-2.5 text-sm font-semibold text-secondary-foreground/85 backdrop-blur-sm transition-colors hover:border-white/35 hover:text-white"
          >
            Read my experience
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
