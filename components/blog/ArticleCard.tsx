import Link from "next/link";

import { BlogSEOType, SEO_TAGS_COLORS } from "./BlogPostLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const ArticleCard = ({
  details: {
    title,
    description,
    tags,
    date,
    image,
    imageExtraClasses,
    draft,
    href,
  },
}: {
  details: BlogSEOType & { href: string };
}) => {
  return (
    <Card
      key={href}
      className="flex flex-col overflow-hidden supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 bg-black/10 backdrop-blur-sm shadow-md"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full h-[200px] lg:h-[350px] object-cover",
            imageExtraClasses,
          )}
        />
      ) : null}
      <CardHeader>
        <Link href={href} className="text-xl">
          <CardTitle>{`${draft ? "[WIP] - " : ""}${title}`}</CardTitle>
        </Link>
        <div className="flex flex-col gap-2 mt-8">
          <div className="flex items-center text-muted-foreground">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {tags.map(tag => (
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
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <Link href={href} className="text-blue-500">
          Read more...
        </Link>
      </CardContent>
    </Card>
  );
};
