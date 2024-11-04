export type BlogSEOType = {
  draft?: boolean;
  title: string;
  description: string;
  date: Date;
  lastmod: Date;
  image?: string;
  imageExtraClasses?: string;
  tags: string[];
};
