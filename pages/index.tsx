import { Background } from "@/components/Background";
import { Experiences } from "@/components/Experiences";
import { Footer } from "@/components/Footer";
import { Github } from "@/components/Github";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Projects } from "@/components/Projects";
import { Technologies } from "@/components/Technologies";
import { Separator } from "@/components/ui/separator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center px-4 lg:px-0 mb-32">
        <Background />
        <main className="flex w-full max-w-full flex-col lg:max-w-[1000px] xl:max-w-screen-lg 2xl:max-w-screen-2xl gap-8 z-10">
          <Hero />
          <Technologies />
          <Separator />
          <Experiences />
          <Separator />
          <Github />
          <Separator />
          <Projects />
          <Separator />
          <Footer />
          <Navigation className="fixed left-1/2 bottom-8 -translate-x-1/2" />
        </main>
      </div>
    </QueryClientProvider>
  );
}
