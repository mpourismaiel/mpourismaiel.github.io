export type BlogSEOType = {
  draft?: boolean;
  title: string;
  description: string;
  date: Date;
  lastmod: Date;
  image?: string;
  tags: string[];
};
