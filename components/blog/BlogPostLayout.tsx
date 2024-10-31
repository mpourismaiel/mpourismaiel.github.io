import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Separator } from "@/components/ui/separator";

export const BlogPostLayout = ({
  title = "Mahdi Pourismaiel Articles",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex justify-center px-4 lg:px-0 pb-32 bg-[#1c1624] min-h-screen">
      <main className="flex w-full max-w-full flex-col lg:max-w-[1000px] xl:max-w-screen-lg z-10">
        <div id="top-bar" className="flex items-center gap-4 border-b py-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/blog">
              <ChevronLeftIcon className="size-6" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
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
