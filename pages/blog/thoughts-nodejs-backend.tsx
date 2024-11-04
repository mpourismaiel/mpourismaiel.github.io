import { NextSeo } from "next-seo";
import Link from "next/link";

import { CodeTag } from "@/components/CodeTag";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { H3 } from "@/components/blog/H3";
import { H4 } from "@/components/blog/H4";
import { Image } from "@/components/blog/Image";
import { BlogSEOType } from "@/lib/types";

export const seo = {
  title: "My thoughts on Node.js backend frameworks",
  description:
    "A comparison of the top backend JavaScript frameworks, including NestJS, AdonisJS, and Strapi.",
  date: new Date("2024-11-02"),
  lastmod: new Date("2024-11-02"),
  image: "/thoughts-nodejs-backend.svg",
  imageExtraClasses: "object-center object-scale-down bg-white w-full",
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
      <H3 title="Nest and Adonis" />
      <p>
        From all of the different JavaScript frameworks out there, I love Nest
        the most. From it's amazing documentation to it's powerful CLI, it's
        amazing decorators and it's vast ecosystem, Nest is the framework to go
        for if you're looking for a scalable and powerful backend framework. It
        provides you with everything you need to build a powerful backend
        application and makes it easy for new developers to come in and continue
        your work.
      </p>
      <CodeTag
        languages={{
          bash: `npm i -g @nestjs/cli
nest new project-name

# Or

git clone https://github.com/nestjs/typescript-starter.git project
cd project
npm install
npm run start`,
        }}
      />
      <p>
        Adonis is another great framework. It's Laravel in JS. It's powerful,
        it's vast, and it's amazing. It's got everything you need to build a
        powerful backend application and it's got a great community behind it.
        It's a great choice for those who are looking for a Laravel-like
        experience in JS. My only qualm with Adonis is the bad upgrade
        experience we got from v5 to v6. It was a nightmare. For some time there
        was no documentation on how to upgrade and it was a mess. But they've
        fixed it now and it's a great framework to work with.
      </p>
      <CodeTag
        languages={{
          bash: `# Create a project and get prompted for all options
npm init adonisjs@latest hello-world

# Create a project with MySQL
npm init adonisjs@latest hello-world -- --db=mysql

# Create a project with PostgreSQL and API starter kit
npm init adonisjs@latest hello-world -- --db=postgres --kit=api

# Create a project with API starter kit and access tokens guard
npm init adonisjs@latest hello-world -- --kit=api --auth-guard=access_tokens`,
        }}
      />
      <p>
        Although Adonis is absolutely amazing and I love it, I still prefer Nest
        over it. In my opinion, Nest provides a more team friendly experience
        and it's more scalable than Adonis. I love the way Nest is built and I
        love the way it's structured. It's a great framework and I highly
        recommend it. That's not to say Adonis is bad. It's great. It's just
        that I prefer Nest over it.
      </p>
      <H3 title="Strapi" />
      <p>
        Strapi is a different beast. It's not a framework, it's a CMS. Why is it
        listed in an article comparing frameworks? Well, I wanted to share my
        thoughts on it.
      </p>
      <p>
        When I want to start a project, it's important to me that I know the
        approximate scope and scale of the project. It's not exactly about the
        size of the project and what features I want in it, it's about how fine
        of a control do I want over the project.
      </p>
      <p>
        For example sometimes I don't care how the user logs in, I may just
        allow them to use their social accounts. Sometimes it's more important
        that only certain people can access the application. For cases that I
        don't care at all about the backend and just want to be able to share
        data with the frontend, I use Strapi. It allows me to define my models
        visually which is amazing if I want to share the project with a client,
        and on top of that it provides visual editors to enter data for those
        models. Think Wordpress but not limited to blogs.
      </p>
      <p>
        With Strapi you can define access control, have access to a great bunch
        of plugins, manage media nicely, and have a great API to work with. It
        provides a bunch of more common features out of the box that were a pain
        to implement in other frameworks. If I want a project that's not much
        more complex than a data I/O type of thing and I don't want to
        overcomplicate things, I definitely go with Strapi and recommend you do
        the same.
      </p>
      <CodeTag
        languages={{
          bash: `npx create-strapi@latest my-strapi-project`,
        }}
      />
      <H3 title="Final thoughts" />
      <p>
        In the end, it's all about what you want to do. If your product is going
        to be complex and you want to have full control over it, go with Nest,
        or maybe Adonis. But there's no need to overcomplicate things most of
        the time and you can use the amazing Strapi to get the job done. It's
        all about what you want to do and how you want to do it.
      </p>
      <p>
        And it's important to consider what your team is comfortable with.
        Forget "JavaScript is not a real language" memes and consider your
        teams' strengths. You might have a Python team in which case Django
        might be a better choice. The point is to choose the right tool for the
        job and for the team and not choose the trendiest framework out there.
        Because the most important thing is to get the job done.
      </p>
    </BlogPostLayout>
  );
}
