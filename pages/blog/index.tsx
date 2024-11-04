import { ChevronLeftIcon } from "lucide-react";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogSEOType } from "@/lib/types";
import { cn } from "@/lib/utils";

export const getStaticProps = (async () => {
  return {
    props: {
      links: (
        await Promise.all(
          require("fs")
            .readdirSync(`${process.cwd()}/pages/blog`)
            .filter((file: string) => !file.includes("index.tsx"))
            .map(async (file: string) => {
              const seo = (await require(`./${file}`)).seo;
              return {
                ...seo,
                href: `/blog/${file.replace(".tsx", "")}`,
              };
            }),
        )
      )
        .filter((seo: BlogSEOType & { href: string }) =>
          process.env.NODE_ENV !== "development" ? !seo.draft : true,
        )
        .sort(
          (a: { date: Date }, b: { date: Date }) =>
            b.date.getTime() - a.date.getTime(),
        )
        .map((seo: BlogSEOType & { href: string }) => ({
          ...seo,
          date: seo.date.toISOString(),
          lastmod: seo.lastmod.toISOString(),
        })),
    },
  };
}) satisfies GetStaticProps<{ links: { title: string; href: string }[] }>;

export default function BlogIndexPage({
  links,
}: {
  links: (BlogSEOType & { href: string })[];
}) {
  return (
    <BlogPostLayout title="Mahdi Pourismaiel" backLink="/" hideComments>
      <NextSeo
        title="Mahdi Pourismaiel - Blog"
        description="Mahdi Pourismaiel's blog posts."
        twitter={{
          handle: "@mpourismaiel",
          site: "@mpourismaiel",
          cardType: "summary_large_image",
        }}
        themeColor="#1c1624"
        openGraph={{
          title: "Mahdi Pourismaiel - Blog",
          description: "Mahdi Pourismaiel's blog posts.",
        }}
      />
      <div className="flex flex-col overflow-y-auto min-h-[calc(100dvh-200px)]">
        <h1 className="text-4xl font-bold text-secondary-foreground text-center mt-16">
          Blog
        </h1>
        <div className="flex flex-col gap-4 my-8">
          {links.map(
            ({
              title,
              description,
              draft,
              image,
              imageExtraClasses,
              date,
              href,
            }) => (
              <Card
                key={href}
                className="flex flex-col overflow-hidden supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 bg-black/10 backdrop-blur-sm shadow-md"
              >
                {image ? (
                  <img
                    src={image}
                    alt={title}
                    className={cn(
                      "w-full h-[250px] object-cover",
                      imageExtraClasses,
                    )}
                  />
                ) : null}
                <CardHeader>
                  <Link href={href} className="text-xl">
                    <CardTitle>{`${draft ? "[WIP] - " : ""}${title}`}</CardTitle>
                  </Link>
                  <CardDescription>
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{description}</p>
                  <Link href={href} className="text-blue-500">
                    Read more...
                  </Link>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </div>
    </BlogPostLayout>
  );
}
