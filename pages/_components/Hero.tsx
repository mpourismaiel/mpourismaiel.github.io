export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center">
      <div className="text-center flex flex-col">
        <h1 className="text-[40px] sm:text-[48px] lg:text-[78px] font-bold text-secondary-foreground">
          Mahdi Pourismaiel
        </h1>
        <h2 className="text-lg lg:text-[26px] font-bold mb-2 md:mb-4 text-secondary-foreground">
          Full-Stack Web Developer, Hobbyist Game Developer
        </h2>
        <p className="text-base sm:text-lg lg:text-2xl px-8 text-secondary-foreground">
          Here I write about my journey in web and game development, share my
          latest projects, and you can check out my resume!
        </p>
      </div>
    </div>
  );
};
