import { BlogSEOType } from "@/components/blog/BlogPostLayout";

export const getAllBlogPages = async (): Promise<
  (BlogSEOType & { href: string })[]
> => {
  return await Promise.all(
    require("fs")
      .readdirSync(`${process.cwd()}/pages/blog`)
      .filter((file: string) => !file.includes("index.tsx") && file !== "tag")
      .map(async (file: string) => {
        const seo = (await require(`@/pages/blog/${file}`)).seo;
        return {
          ...seo,
          href: `/blog/${file.replace(".tsx", "")}`,
        };
      }),
  );
};
