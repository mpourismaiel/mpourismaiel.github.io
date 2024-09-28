import { Experiences } from "../components/Experiences";
import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { Technologies } from "../components/Technologies";
import { DockDemo } from "@/components/Dock";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex justify-center px-4 lg:px-0 mb-32">
      <main className="flex w-full max-w-full flex-col sm:max-w-[550px] lg:max-w-[800px] xl:max-w-screen-lg 2xl:max-w-screen-2xl gap-8">
        <Hero />
        <Separator />
        <Technologies />
        <Separator />
        <Experiences />
        <Separator />
        <Projects />
        <DockDemo className="fixed left-1/2 bottom-8 -translate-x-1/2" />
      </main>
    </div>
  );
}
