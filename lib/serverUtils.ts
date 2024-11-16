import { GetStaticProps } from "next";

import { getAllBlogPages } from "./pages";
import { BlogLinkType, blogDateToIsoString } from "./types";
import { sort } from "./utils";
import { BlogSEOType } from "@/components/blog/BlogPostLayout";

export const postStaticProps = (async () => {
  return {
    props: {
      posts: (await getAllBlogPages())
        .filter(
          (seo: BlogSEOType & { href: string }) =>
            process.env.NODE_ENV !== "development" || !seo.draft,
        )
        .sort(sort.byDate)
        .map(blogDateToIsoString),
    },
  };
}) satisfies GetStaticProps<{
  posts: BlogLinkType[];
}>;
