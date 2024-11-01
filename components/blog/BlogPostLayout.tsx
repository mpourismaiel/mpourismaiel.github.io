import { ChevronLeftIcon } from "lucide-react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { Button } from "../ui/button";
import { Comments } from "./Comments";
import { Image } from "./Image";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Separator } from "@/components/ui/separator";
import { BlogSEOType } from "@/lib/types";

export const BlogPostLayout = ({
  title = "Mahdi Pourismaiel Articles",
  seo,
  backLink = "/blog",
  hideComments,
  children,
}: {
  title?: string;
  seo?: BlogSEOType;
  backLink?: string;
  hideComments?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex justify-center px-4 lg:px-0 pb-32 bg-[#1c1624] min-h-screen">
      {seo ? (
        <NextSeo
          title={seo.title}
          description={seo.description}
          twitter={{
            handle: "@mpourismaiel",
            site: "@mpourismaiel",
            cardType: "summary_large_image",
          }}
          noindex={seo.draft}
          themeColor="#1c1624"
          openGraph={{
            title: seo.title,
            description: seo.description,
            type: "article",
            article: {
              publishedTime: seo.date.toISOString(),
              modifiedTime: seo.lastmod.toISOString(),
              tags: seo.tags,
            },
            images: [
              { url: `https://mpourismaiel.com${seo.image}`, alt: seo.title },
            ],
          }}
        />
      ) : null}
      <main className="flex w-full max-w-full flex-col lg:max-w-[1000px] xl:max-w-screen-lg z-10">
        <div id="top-bar" className="flex items-center gap-4 border-b py-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={backLink}>
              <ChevronLeftIcon className="size-6" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        {seo ? (
          <div className="flex flex-col pb-8 min-h-[calc(100dvh-300px)]">
            <h1 className="text-xl font-bold xl:text-3xl pb-2 pt-8">
              {`${seo.draft ? "[WIP] - " : ""}${seo.title}`}
            </h1>
            <div className="flex items-center mb-6">
              <time
                className="text-sm text-muted-foreground"
                dateTime={seo.date.toISOString()}
              >
                {`Published on ${new Date(seo.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}`}
              </time>
            </div>
            {seo.image ? <Image src={seo.image} alt={seo.title} /> : null}
            <div className="prose prose-invert prose-zinc max-w-none">
              {children}
            </div>
          </div>
        ) : (
          children
        )}
        {hideComments ? null : <Comments />}
        <div className="flex flex-col gap-8">
          <Separator />
          <Footer />
          <Navigation />
        </div>
      </main>
    </div>
  );
};
