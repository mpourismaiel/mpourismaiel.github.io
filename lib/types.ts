import { BlogSEOType } from "@/components/blog/BlogPostLayout";

export type BlogLinkType = Omit<BlogSEOType, "date" | "lastmod"> & {
  date: string;
  lastmod: string;
  href: string;
};

export const blogDateToIsoString = (seo: BlogSEOType & { href: string }) => ({
  ...seo,
  date: seo.date.toISOString(),
  lastmod: seo.lastmod.toISOString(),
});
