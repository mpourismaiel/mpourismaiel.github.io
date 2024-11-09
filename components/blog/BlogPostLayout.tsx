import { ChevronLeftIcon } from "lucide-react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { Button } from "../ui/button";
import { Comments } from "./Comments";
import { Image } from "./Image";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const SEO_TAGS_COLORS = {
  development: "bg-[#d946ef] text-black",
  opinion: "bg-[#8b5cf6] text-black",
  comparison: "bg-[#0ea5e9] text-black",
  testing: "bg-[#10b981] text-black",
  benchmarking: "bg-[#f43f5e] text-black",
};

export type BlogSEOType = {
  draft?: boolean;
  title: string;
  description: string;
  date: Date;
  lastmod: Date;
  image?: string;
  imageExtraClasses?: string;
  tags: (keyof typeof SEO_TAGS_COLORS)[];
};

export const BlogPostLayout = ({
  title = "Mahdi Pourismaiel Articles",
  seo,
  includedImage,
  backLink = "/blog",
  hideComments,
  children,
}: {
  title?: string;
  seo?: BlogSEOType;
  includedImage?: boolean;
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
            <h1 className="text-xl font-bold xl:text-3xl mb-2 mt-8">
              {`${seo.draft ? "[WIP] - " : ""}${seo.title}`}
            </h1>
            <div className="flex items-center mb-2">
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
            {seo.tags ? (
              <div className="flex items-center gap-2 mb-6">
                {seo.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className={cn(
                      "rounded-full text-xs py-0.5 px-2",
                      SEO_TAGS_COLORS[tag],
                    )}
                  >{`#${tag}`}</Link>
                ))}
              </div>
            ) : null}
            {seo.image && !includedImage ? (
              <Image
                src={seo.image}
                alt={seo.title}
                showAlt={false}
                className={seo.imageExtraClasses}
              />
            ) : null}
            <div className="prose prose-invert prose-zinc max-w-none">
              {children}
            </div>
          </div>
        ) : (
          children
        )}
        {hideComments || process.env.NODE_ENV !== "production" ? null : (
          <Comments />
        )}
        <div className="flex flex-col gap-8">
          <Separator />
          <Footer />
          <Navigation />
        </div>
      </main>
    </div>
  );
};
