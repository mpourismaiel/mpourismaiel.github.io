import { WorkflowIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { TitleWithIcon } from "./TitleWithIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { technologies } from "@/lib/technologies";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 bg-black/10 backdrop-blur-sm shadow-md">
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
  title,
  description,
}: {
  title: keyof typeof technologies;
  description?: ReactNode;
}) => {
  const Icon = technologies[title].icon as React.ElementType;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Link
          href={technologies[title].href}
          target="_blank"
          className="w-14 h-14 p-2 rounded flex items-center justify-center"
        >
          <Icon />
        </Link>
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
              title="Typescript"
              description="Implicitly has an 'any' type."
            />
            <Technology title="Javascript" description="[object Object]" />
            <Technology
              title="Python"
              description={`print("🐍: " + "s" * 10)`}
            />
            <Technology
              title="Golang"
              description="Error handling, o, error handling."
            />
            <p className="w-full text-muted-foreground text-center">
              More than a hundred hours:
            </p>
            <Technology title="Java" description="So. Many. Classes." />
            <Technology
              title="C++"
              description={`printf("%c\n", *(8 + "what is c++"));`}
            />
            <Technology title="PHP" />
          </Section>
          <Section title="Front-End Frameworks">
            <Technology
              title="React"
              description="Funnily enough it's easier to setup a React project than a pure JS one."
            />
            <Technology title="Vue" />
            <Technology
              title="Svelte"
              description="Loved the simplicity, not sure I like runes."
            />
            <Technology
              title="Next.JS"
              description="The App router is the best."
            />
            <Technology title="Nuxt.JS" />
            <Technology
              title="TailwindCSS"
              description="And down with CSS-in-JS!"
            />
            <Technology
              title="Shadcn"
              description="It's funny that we created package managers to manage UI libraries and now we're back to copy/paste!"
            />
            <Technology title="Prisma" />
            <Technology title="Framer Motion" />
            <Technology
              title="Apollo"
              description="Either this or React Query."
            />
          </Section>
          <Section title="Back-End Frameworks">
            <Technology
              title="ExpressJS"
              description="Mostly to create a server quickly."
            />
            <Technology title="Fastify" />
            <Technology title="NestJS" />
            <Technology
              title="Adonis"
              description="Their last update broke a bunch of stuff I loved."
            />
            <Technology title="FastAPI" />
            <Technology title="Django" />
            <Technology
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
            />
          </Section>
          <Section title="Softwares & Applications">
            <Technology title="Postgres" description="The best database." />
            <Technology
              title="Mysql"
              description="I use MariaDB to be exact."
            />
            <Technology title="Redis" />
            <Technology title="Docker" description="It runs on my machine." />
            <Technology title="Linux" description="I use Arch btw." />
            <Technology
              title="Godot"
              description="I enjoy making games in my free time."
            />
          </Section>
        </div>
      </div>
    </TooltipProvider>
  );
};
