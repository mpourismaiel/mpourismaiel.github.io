import { NextSeo } from "next-seo";
import Link from "next/link";

import { CodeTag } from "@/components/CodeTag";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { H3 } from "@/components/blog/H3";
import { H4 } from "@/components/blog/H4";
import { Image } from "@/components/blog/Image";
import { BlogSEOType } from "@/lib/types";

export const seo = {
  draft: true,
  title: "Comparing top backend JavaScript frameworks",
  description:
    "A comparison of the top backend JavaScript frameworks, including NestJS, AdonisJS, and Strapi.",
  date: new Date("2024-11-02"),
  lastmod: new Date("2024-11-02"),
  tags: ["development", "comparison"],
} satisfies BlogSEOType;

export default function BlogPostPage() {
  return (
    <BlogPostLayout seo={seo}>
      <p>
        For the longest time the only way to write backend code (after the dark
        times of pure PHP) was to use JavaScript on the frontend and something
        like Ruby, Python, or Java on the backend. It was a glorious time when
        classes ruled the world, great people came up with mantras like "fat
        models, skinny controllers", and the only thing you had to worry about
        was the next version of jQuery.
      </p>
      <p>
        But then the world changed. The frontend became more complex, JavaScript
        evolved beyond jQuery, and we came to understand what the hell was a JS
        engine. That's when Node.js was born. It was a revolution. We reinvented
        everything with the promise of "JavaScript everywhere". And it was good.
        We allowed frontend developers to touch the backend, and backend
        developers to touch the frontend. We had a new era of full-stack
        developers.
      </p>
      <p>
        But with great power comes great responsibility. We had to choose a
        backend framework. And we had options. So many god damn options. We
        developed modules and libraries as we needed them and it was great. But
        one by one, from those amazing new features, problems arose. We created
        MVPs using Express and we refactored our SQL strings to use Sequelize.
        We added parsers and serializers, health checks and logging, and we
        realized that we were reinventing the wheel. And then we went ahead and
        reinvented the wheel nontheless. And that nonesense gave birth to
        absolute miracles like NestJS, AdonisJS, and Strapi.
      </p>
      <H3 title="The Era of Laravel/Rails/Django but in JS" />
      <p>
        With this sub-title and "hilarious", not at all repititve and first of
        it's kind introduction I've got up there you might think I'm against
        using JS backend frameworks. But you'd be wrong. I'm all for them. I
        think we're well past the point of "JavaScript is not a real language"
        and "JavaScript is only for frontend". I have been developing as much as
        possible using JavaScript (or to be honest, TypeScript) and I've been
        loving it. My belief is that the JavaScript ecosystem, as convoluted as
        it is, has been a great place to be right now and specially since the
        introduction of <strong>Deno 2.0</strong> (which I will be checking out
        soon, I promise) much of the concern around the ecosystem will slowly
        fade out and we will finally have a stable and secure environment to
        work with.
      </p>
      <p>
        But I digress. Let's get back to the main topic of this post. The
        comparison of the top backend JavaScript frameworks. I've chosen three
        of the top contenders for this comparison. <strong>NestJS</strong>,{" "}
        <strong>AdonisJS</strong>, and <strong>Strapi</strong>. I've chosen
        these three because they are the most popular and most used frameworks
        in the JavaScript ecosystem right now, and I've worked with them either
        extensively or as a go to for my projects.
      </p>
      <p>
        These are not your "I'm gonna build a blog" frameworks. These are the "I
        am going to lay the first brick of what's going to be a skyscraper"
        frameworks. They are powerful, they are complex, and they are absolutely
        amazing. They are the Laravel, Rails, and Django of the JS. And they are
        here to stay. The teams behind these projects are huge, the communities
        are vast, and the scalability is immense.
      </p>
    </BlogPostLayout>
  );
}
