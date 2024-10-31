import { GetStaticProps } from "next";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BlogSEOType } from "@/lib/types";

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
    <div className="flex justify-center px-4 lg:px-0 pb-32 bg-[#1c1624] min-h-screen">
      <main className="flex w-full max-w-full flex-col lg:max-w-[1000px] xl:max-w-screen-lg z-10 min-h-[calc(100dvh-100px)]">
        <h1 className="text-4xl font-bold text-secondary-foreground text-center mt-16">
          Blog
        </h1>
        <div className="flex flex-col gap-4 my-8 flex-1">
          {links.map(({ title, description, image, date, href }) => (
            <Card
              key={href}
              className="flex flex-col overflow-hidden supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 bg-black/10 backdrop-blur-sm shadow-md"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-[250px] object-cover"
              />
              <CardHeader>
                <Link href={href} className="text-xl">
                  <CardTitle>{title}</CardTitle>
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
          ))}
        </div>
        <div className="flex flex-col gap-8">
          <Separator />
          <Footer />
          <Navigation />
        </div>
      </main>
    </div>
  );
}
