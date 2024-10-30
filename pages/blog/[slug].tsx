import { readdirSync } from "fs";
import { ChevronLeftIcon } from "lucide-react";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { resolve } from "path";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BlogSEOType } from "@/lib/types";

export const getStaticPaths = async () => {
  const paths = readdirSync(resolve(`${process.cwd()}/data/blog`)).map(
    filename => ({
      params: { slug: filename.replace(/\.tsx$/, "") },
    }),
  );

  paths.map(path =>
    console.log(`Generated: http://localhost:3000/blog/${path.params.slug}`),
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = (async ({ params }) => {
  return {
    props: {
      slug: params?.slug ?? "",
    },
  };
}) satisfies GetStaticProps<
  {
    slug: string;
  },
  { slug: string }
>;

export default function BlogPostPage({ slug }: { slug: string }) {
  const post = require(`@/data/blog/${slug}`);
  if (!post || !post.default) return null;

  const seo = post.default.seo as BlogSEOType;

  return (
    <div className="flex justify-center px-4 lg:px-0 pb-32 bg-[#1c1624] min-h-screen">
      <NextSeo title={seo.title} description={seo.description} />
      <main className="flex w-full max-w-full flex-col lg:max-w-[1000px] xl:max-w-screen-lg z-10">
        <div id="top-bar" className="flex items-center gap-4 border-b py-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/blog">
              <ChevronLeftIcon className="size-6" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Mahdi Pourismaiel Articles</h1>
        </div>
        <div className="flex flex-col pb-8 min-h-[calc(100dvh-300px)]">
          <h1 className="text-xl font-bold xl:text-3xl pb-2 pt-8">
            {`${seo.draft ? "[WIP] - " : ""}${seo.title}`}
          </h1>
          <div className="flex items-center mb-6">
            <time
              className="text-sm text-muted-foreground"
              dateTime={seo.date.toISOString()}
            >
              {`Published on ${new Date(seo.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`}
            </time>
          </div>
          <div className="prose prose-invert prose-zinc prose-xl max-w-none">
            <post.default />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <Separator />
          <Footer />
          <Navigation />
        </div>
      </main>
    </div>
  );
}
