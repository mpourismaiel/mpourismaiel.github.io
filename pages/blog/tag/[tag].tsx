import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";

import { ArticleCard } from "@/components/blog/ArticleCard";
import {
  BlogPostLayout,
  BlogSEOType,
  SEO_TAGS_COLORS,
} from "@/components/blog/BlogPostLayout";
import { getAllBlogPages } from "@/lib/pages";
import { BlogLinkType, blogDateToIsoString } from "@/lib/types";
import { sort } from "@/lib/utils";

export const getStaticPaths = (async () => {
  const tags = (await getAllBlogPages())
    .filter(
      (seo: BlogSEOType & { href: string }) =>
        process.env.NODE_ENV !== "development" || !seo.draft,
    )
    .map((seo: BlogSEOType & { href: string }) => seo.tags)
    .flat()
    .filter((tag, i, arr) => arr.indexOf(tag) === i);

  return {
    paths: tags.map(tag => ({ params: { tag } })),
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async context => {
  return {
    props: {
      tag: context.params!.tag as keyof typeof SEO_TAGS_COLORS,
      links: (await getAllBlogPages())
        .filter(
          (seo: BlogSEOType & { href: string }) =>
            (process.env.NODE_ENV !== "development" ? !seo.draft : true) &&
            seo.tags.includes(context.params!.tag),
        )
        .sort(sort.byDate)
        .map(blogDateToIsoString),
    },
  };
}) satisfies GetStaticProps<
  {
    tag: keyof typeof SEO_TAGS_COLORS;
    links: BlogLinkType[];
  },
  { tag: keyof typeof SEO_TAGS_COLORS }
>;

export default function BlogTagPage({
  tag,
  links,
}: {
  tag: keyof typeof SEO_TAGS_COLORS;
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
          {`Blog - ${tag.slice(0, 1).toUpperCase()}${tag.slice(1)}`}
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
