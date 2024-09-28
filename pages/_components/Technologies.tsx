import { WorkflowIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { TitleWithIcon } from "./TitleWithIcon";
import { AdonisJsIcon } from "@/components/icons/AdonisJsIcon";
import { ApolloIcon } from "@/components/icons/ApolloIcon";
import { CPPIcon } from "@/components/icons/CPPIcon";
import { DjangoIcon } from "@/components/icons/DjangoIcon";
import { DockerIcon } from "@/components/icons/DockerIcon";
import { ExpressJsIcon } from "@/components/icons/ExpressJsIcon";
import { FastAPIIcon } from "@/components/icons/FastAPIIcon";
import { FastifyIcon } from "@/components/icons/FastifyIcon";
import { FramerMotionIcon } from "@/components/icons/FramerMotionIcon";
import { GinIcon } from "@/components/icons/GinIcon";
import { GodotIcon } from "@/components/icons/GodotIcon";
import { GolangIcon } from "@/components/icons/GolangIcon";
import { JavaIcon } from "@/components/icons/JavaIcon";
import { JavascriptIcon } from "@/components/icons/JavascriptIcon";
import { LinuxIcon } from "@/components/icons/LinuxIcon";
import { MysqlIcon } from "@/components/icons/MysqlIcon";
import { NestJsIcon } from "@/components/icons/NestJsIcon";
import { NextJsIcon } from "@/components/icons/NextJsIcon";
import { NuxtJsIcon } from "@/components/icons/NuxtJsIcon";
import { PHPIcon } from "@/components/icons/PHPIcon";
import { PostgresIcon } from "@/components/icons/PostgresIcon";
import { PrismaIcon } from "@/components/icons/PrismaIcon";
import { PythonIcon } from "@/components/icons/PythonIcon";
import { ReactIcon } from "@/components/icons/ReactIcon";
import { RedisIcon } from "@/components/icons/RedisIcon";
import { ShadcnIcon } from "@/components/icons/ShadcnIcon";
import { SvelteIcon } from "@/components/icons/SvelteIcon";
import { TailwindCSSIcon } from "@/components/icons/TailwindCSSIcon";
import { TypescriptIcon } from "@/components/icons/TypescriptIcon";
import { VueIcon } from "@/components/icons/VueIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-secondary-foreground text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-around gap-4 mb-4">
        {children}
      </CardContent>
    </Card>
  );
};

const Technology = ({
  icon,
  title,
  description,
  href,
}: {
  icon: JSX.Element;
  title: string;
  description?: ReactNode;
  href?: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        {href ? (
          <Link
            href={href}
            target="_blank"
            className="w-14 h-14 p-2 rounded flex items-center justify-center"
          >
            {icon}
          </Link>
        ) : (
          <div className="w-14 h-14 p-2 rounded flex items-center justify-center">
            {icon}
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent>
        <h4 className="text-sm font-bold">{title}</h4>
        {description ? <p className="text-xs">{description}</p> : null}
      </TooltipContent>
    </Tooltip>
  );
};

export const Technologies = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        <TitleWithIcon>
          <WorkflowIcon className="h-8 w-8" />
          Technologies I have experience with
        </TitleWithIcon>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
          <Section title="Languages">
            <p className="w-full text-muted-foreground text-center">
              More than a thousand hours:
            </p>
            <Technology
              icon={<TypescriptIcon />}
              title="Typescript"
              description="Implicitly has an 'any' type."
              href="https://www.typescriptlang.org/"
            />
            <Technology
              icon={<JavascriptIcon />}
              title="Javascript"
              description="[object Object]"
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            />
            <Technology
              icon={<PythonIcon />}
              title="Python"
              description={`print("🐍: " + "s" * 10)`}
              href="https://www.python.org/"
            />
            <Technology
              icon={<GolangIcon />}
              title="Golang"
              description="Error handling, o, error handling."
              href="https://go.dev/"
            />
            <p className="w-full text-muted-foreground text-center">
              More than a hundred hours:
            </p>
            <Technology
              icon={<JavaIcon />}
              title="Java"
              description="So. Many. Classes."
              href="https://www.java.com/"
            />
            <Technology
              icon={<CPPIcon />}
              title="C++"
              description={`printf("%c\n", *(8 + "what is c++"));`}
              href="https://isocpp.org/"
            />
            <Technology
              icon={<PHPIcon />}
              title="PHP"
              href="https://www.php.net/"
            />
          </Section>
          <Section title="Front-End Frameworks">
            <Technology
              icon={<ReactIcon />}
              title="React"
              description="Funnily enough it's easier to setup a React project than a pure JS one."
              href="https://react.dev/"
            />
            <Technology
              icon={<VueIcon />}
              title="Vue"
              href="https://vuejs.org/"
            />
            <Technology
              icon={<SvelteIcon />}
              title="Svelte"
              description="Loved the simplicity, not sure I like runes."
              href="https://svelte.dev/"
            />
            <Technology
              icon={<NextJsIcon />}
              title="Next.JS"
              description="The App router is the best."
              href="https://nextjs.org/"
            />
            <Technology
              icon={<NuxtJsIcon />}
              title="Nuxt.JS"
              href="https://nuxt.com/"
            />
            <Technology
              icon={<TailwindCSSIcon />}
              title="TailwindCSS"
              description="And down with CSS-in-JS!"
              href="https://tailwindcss.com/"
            />
            <Technology
              icon={<ShadcnIcon />}
              title="Shadcn"
              description="It's funny that we created package managers to manage UI libraries and now we're back to copy/paste!"
              href="https://ui.shadcn.com/"
            />
            <Technology
              icon={<PrismaIcon />}
              title="Prisma"
              href="https://www.prisma.io/"
            />
            <Technology
              icon={<FramerMotionIcon />}
              title="Framer Motion"
              href="https://www.framer.com/motion/"
            />
            <Technology
              icon={<ApolloIcon />}
              title="Apollo"
              description="Either this or React Query."
              href="https://www.apollographql.com/"
            />
          </Section>
          <Section title="Back-End Frameworks">
            <Technology
              icon={<ExpressJsIcon />}
              title="ExpressJS"
              description="Mostly to create a server quickly."
              href="http://expressjs.com/"
            />
            <Technology
              icon={<FastifyIcon />}
              title="Fastify"
              href="https://fastify.dev/"
            />
            <Technology
              icon={<NestJsIcon />}
              title="NestJS"
              href="https://nestjs.com/"
            />
            <Technology
              icon={<AdonisJsIcon />}
              title="Adonis"
              description="Their last update broke a bunch of stuff I loved."
              href="https://adonisjs.com/"
            />
            <Technology
              icon={<FastAPIIcon />}
              title="FastAPI"
              href="https://fastapi.tiangolo.com/"
            />
            <Technology
              icon={<DjangoIcon />}
              title="Django"
              href="https://www.djangoproject.com/"
            />
            <Technology
              icon={<GinIcon />}
              title="Gin"
              description={
                <>
                  {`I like how the only official Icon is an unoptimized `}
                  <Link
                    href="https://raw.githubusercontent.com/gin-gonic/logo/refs/heads/master/color.svg"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Inkscape export
                  </Link>
                  {`.`}
                </>
              }
              href="https://gin-gonic.com/"
            />
          </Section>
          <Section title="Softwares & Applications">
            <Technology
              icon={<PostgresIcon />}
              title="Postgres"
              description="The best database."
              href="https://www.postgresql.org/"
            />
            <Technology
              icon={<MysqlIcon />}
              title="Mysql"
              description="I use MariaDB to be exact."
              href="https://www.mysql.com/"
            />
            <Technology
              icon={<RedisIcon />}
              title="Redis"
              href="https://redis.io/"
            />
            <Technology
              icon={<DockerIcon />}
              title="Docker"
              description="It runs on my machine."
              href="https://www.docker.com/"
            />
            <Technology
              icon={<LinuxIcon />}
              title="Linux"
              description="I use Arch btw."
              href="https://www.linux.org"
            />
            <Technology
              icon={<GodotIcon />}
              title="Godot"
              description="I enjoy making games in my free time."
              href="https://godotengine.org/"
            />
          </Section>
        </div>
      </div>
    </TooltipProvider>
  );
};
