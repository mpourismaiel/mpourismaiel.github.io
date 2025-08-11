import { LetterTextIcon } from "lucide-react";
import Link from "next/link";

import { TitleWithIcon } from "./TitleWithIcon";
import { BlogSEOType } from "./blog/BlogPostLayout";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

export const Blog = ({
  links,
}: {
  links: (BlogSEOType & { href: string })[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      <TitleWithIcon>
        <LetterTextIcon className="h-8 w-8" />
        My latest blog posts
      </TitleWithIcon>
      <div className="flex flex-col gap-4">
        {links.slice(0, 3).map(details => (
          <Link key={details.href} href={details.href}>
            <Card className="supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 bg-black/10 backdrop-blur-sm shadow-md grid grid-cols-1 lg:grid-cols-[400px_1fr] overflow-hidden">
              {details.image ? (
                <img
                  src={details.image}
                  alt={details.title}
                  className={cn(
                    "w-full h-[250px] lg:h-[150px] object-cover",
                    details.imageExtraClasses,
                  )}
                />
              ) : null}
              <div className="flex flex-col items-start ">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-secondary-foreground text-center">
                    {details.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap justify-around gap-4 mb-4">
                  {details.description}
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
