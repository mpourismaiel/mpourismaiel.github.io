import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";

import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogPostLayout, BlogSEOType } from "@/components/blog/BlogPostLayout";
import { getAllBlogPages } from "@/lib/pages";

export const getStaticProps = (async () => {
  return {
    props: {
      links: (await getAllBlogPages())
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
}) satisfies GetStaticProps<{
  links: (Omit<BlogSEOType, "date" | "lastmod"> & {
    date: string;
    lastmod: string;
    href: string;
  })[];
}>;

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
          {links.map(details => (
            <ArticleCard key={details.href} details={details} />
          ))}
        </div>
      </div>
    </BlogPostLayout>
  );
}
