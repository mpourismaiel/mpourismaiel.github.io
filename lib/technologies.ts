import { ReactNode } from "react";

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

export const technologies: Record<
  string,
  {
    icon?: React.ElementType;
    href: string;
  }
> = {
  "Typescript": {
    icon: TypescriptIcon,
    href: "https://www.typescriptlang.org/",
  },
  "Javascript": {
    icon: JavascriptIcon,
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  "Python": { icon: PythonIcon, href: "https://www.python.org/" },
  "Golang": { icon: GolangIcon, href: "https://go.dev/" },
  "Java": { icon: JavaIcon, href: "https://www.java.com/" },
  "C++": { icon: CPPIcon, href: "https://isocpp.org/" },
  "PHP": { icon: PHPIcon, href: "https://www.php.net/" },
  "React": { icon: ReactIcon, href: "https://react.dev/" },
  "Vue": { icon: VueIcon, href: "https://vuejs.org/" },
  "Svelte": { icon: SvelteIcon, href: "https://svelte.dev/" },
  "Next.JS": { icon: NextJsIcon, href: "https://nextjs.org/" },
  "Gatsby.JS": { href: "gatsbyjs.com" },
  "Nuxt.JS": { icon: NuxtJsIcon, href: "https://nuxt.com/" },
  "TailwindCSS": {
    icon: TailwindCSSIcon,
    href: "https://tailwindcss.com/",
  },
  "Bootstrap": {
    href: "https://getbootstrap.com/",
  },
  "Hugo": {
    href: "https://gohugo.io/",
  },
  "Shadcn": { icon: ShadcnIcon, href: "https://ui.shadcn.com/" },
  "Prisma": { icon: PrismaIcon, href: "https://www.prisma.io/" },
  "Framer Motion": {
    icon: FramerMotionIcon,
    href: "https://www.framer.com/motion/",
  },
  "Apollo": { icon: ApolloIcon, href: "https://www.apollographql.com/" },
  "ExpressJS": { icon: ExpressJsIcon, href: "http://expressjs.com/" },
  "Fastify": { icon: FastifyIcon, href: "https://fastify.dev/" },
  "NestJS": { icon: NestJsIcon, href: "https://nestjs.com/" },
  "Adonis": { icon: AdonisJsIcon, href: "https://adonisjs.com/" },
  "FastAPI": { icon: FastAPIIcon, href: "https://fastapi.tiangolo.com/" },
  "Django": { icon: DjangoIcon, href: "https://www.djangoproject.com/" },
  "Gin": { icon: GinIcon, href: "https://gin-gonic.com/" },
  "Postgres": { icon: PostgresIcon, href: "https://www.postgresql.org/" },
  "Mysql": { icon: MysqlIcon, href: "https://www.mysql.com/" },
  "Redis": { icon: RedisIcon, href: "https://redis.io/" },
  "Docker": { icon: DockerIcon, href: "https://www.docker.com/" },
  "Linux": { icon: LinuxIcon, href: "https://www.linux.org" },
  "Godot": { icon: GodotIcon, href: "https://godotengine.org/" },
  "MagicUI": { href: "https://magicui.design" },
};
