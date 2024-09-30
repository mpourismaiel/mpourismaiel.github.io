import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="min-h-[100dvh] flex justify-center items-center">
      <div className="text-center flex flex-col justify-center">
        <motion.h1
          initial={{ filter: "blur(10px)", opacity: 0, y: -10 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[32px] sm:text-[48px] lg:text-[78px] font-bold text-secondary-foreground"
        >
          Mahdi Pourismaiel
        </motion.h1>
        <motion.h2
          initial={{ filter: "blur(10px)", opacity: 0, y: -10 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg lg:text-[26px] font-bold mb-2 md:mb-4 text-secondary-foreground"
        >
          Full-Stack Web Developer, Hobbyist Game Developer
        </motion.h2>
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative mt-4"
        >
          <div className="absolute top-0 left-[12.5%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute top-0 left-[12.5%] bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute top-0 left-[12.5%] animate-shooting h-[5px] w-3/4 blur-sm" />
          <div className="absolute top-0 left-[12.5%] animate-shooting h-px w-3/4" />
        </motion.div>
      </div>
    </div>
  );
};
