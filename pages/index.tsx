import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";

import { Background } from "@/components/Background";
import { Blog } from "@/components/Blog";
import { Experiences } from "@/components/Experiences";
import { Footer } from "@/components/Footer";
import { Github } from "@/components/Github";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Projects } from "@/components/Projects";
import { Technologies } from "@/components/Technologies";
import { BlogSEOType } from "@/components/blog/BlogPostLayout";
import { Separator } from "@/components/ui/separator";
import { getAllBlogPages } from "@/lib/pages";
import { BlogLinkType, blogDateToIsoString } from "@/lib/types";
import { sort } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const getStaticProps = (async () => {
  return {
    props: {
      links: (await getAllBlogPages())
        .filter(
          (seo: BlogSEOType & { href: string }) =>
            process.env.NODE_ENV !== "development" || !seo.draft,
        )
        .sort(sort.byDate)
        .map(blogDateToIsoString),
    },
  };
}) satisfies GetStaticProps<{
  links: BlogLinkType[];
}>;

export default function Home({
  links,
}: {
  links: (BlogSEOType & { href: string })[];
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextSeo
        title="Mahdi Pourismaiel"
        description="Portfolio of Mahdi Pourismaiel, Front-End Developer."
      />
      <div className="flex justify-center px-4 lg:px-0 mb-32 bg-[#1c1624] min-h-screen">
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
          <Blog links={links} />
          <Separator />
          <Footer />
          <Navigation isHome />
        </main>
      </div>
    </QueryClientProvider>
  );
}
