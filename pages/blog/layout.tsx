import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Separator } from "@/components/ui/separator";

export const BlogPostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center px-4 lg:px-0 pb-32 bg-[#1c1624] min-h-screen">
      <main className="flex w-full max-w-full flex-col lg:max-w-[1000px] xl:max-w-screen-lg z-10">
        {children}
        <div className="flex flex-col gap-8">
          <Separator />
          <Footer />
          <Navigation />
        </div>
      </main>
    </div>
  );
};
