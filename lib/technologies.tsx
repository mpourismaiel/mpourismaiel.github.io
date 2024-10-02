import { JavaIcon } from "@/components/icons/JavaIcon";
import {
  SiAdonisjs,
  SiAdonisjsHex,
  SiApollographql,
  SiApollographqlHex,
  SiBootstrap,
  SiBootstrapHex,
  SiCplusplus,
  SiCplusplusHex,
  SiDjango,
  SiDjangoHex,
  SiDocker,
  SiDockerHex,
  SiExpress,
  SiExpressHex,
  SiFastapi,
  SiFastapiHex,
  SiFastify,
  SiFastifyHex,
  SiFramer,
  SiFramerHex,
  SiGin,
  SiGinHex,
  SiGo,
  SiGoHex,
  SiGodotengine,
  SiGodotengineHex,
  SiHugo,
  SiHugoHex,
  SiJavascript,
  SiJavascriptHex,
  SiLinux,
  SiLinuxHex,
  SiMysql,
  SiMysqlHex,
  SiNestjs,
  SiNestjsHex,
  SiNextdotjs,
  SiNextdotjsHex,
  SiNuxtdotjs,
  SiNuxtdotjsHex,
  SiPhp,
  SiPhpHex,
  SiPostgresql,
  SiPostgresqlHex,
  SiPrisma,
  SiPrismaHex,
  SiPython,
  SiPythonHex,
  SiReact,
  SiReactHex,
  SiRedis,
  SiRedisHex,
  SiShadcnui,
  SiShadcnuiHex,
  SiSvelte,
  SiSvelteHex,
  SiTailwindcss,
  SiTailwindcssHex,
  SiTypescript,
  SiTypescriptHex,
  SiVscodium,
  SiVscodiumHex,
  SiVuedotjs,
  SiVuedotjsHex,
} from "@icons-pack/react-simple-icons";

export const technologies: Record<
  | "Typescript"
  | "Javascript"
  | "Python"
  | "Golang"
  | "Java"
  | "C++"
  | "PHP"
  | "React"
  | "Vue"
  | "Svelte"
  | "Next.JS"
  | "Gatsby.JS"
  | "Nuxt.JS"
  | "TailwindCSS"
  | "Bootstrap"
  | "Hugo"
  | "Shadcn"
  | "Prisma"
  | "Framer Motion"
  | "Apollo"
  | "ExpressJS"
  | "Fastify"
  | "NestJS"
  | "Adonis"
  | "FastAPI"
  | "Django"
  | "Gin"
  | "Postgres"
  | "Mysql"
  | "Redis"
  | "Docker"
  | "Linux"
  | "Godot"
  | "MagicUI",
  {
    icon?: React.ReactNode;
    href: string;
  }
> = {
  "Typescript": {
    icon: <SiTypescript color={SiTypescriptHex} size="56px" />,
    href: "https://www.typescriptlang.org/",
  },
  "Javascript": {
    icon: <SiJavascript color={SiJavascriptHex} size="56px" />,
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  "Python": {
    icon: <SiPython color={SiPythonHex} size="56px" />,
    href: "https://www.python.org/",
  },
  "Golang": {
    icon: <SiGo color={SiGoHex} size="56px" />,
    href: "https://go.dev/",
  },
  "Java": {
    icon: <JavaIcon color="#007396" size="56px" />,
    href: "https://www.java.com/",
  },
  "C++": {
    icon: <SiCplusplus color={SiCplusplusHex} size="56px" />,
    href: "https://isocpp.org/",
  },
  "PHP": {
    icon: <SiPhp color={SiPhpHex} size="56px" />,
    href: "https://www.php.net/",
  },
  "React": {
    icon: <SiReact color={SiReactHex} size="56px" />,
    href: "https://react.dev/",
  },
  "Vue": {
    icon: <SiVuedotjs color={SiVuedotjsHex} size="56px" />,
    href: "https://vuejs.org/",
  },
  "Svelte": {
    icon: <SiSvelte color={SiSvelteHex} size="56px" />,
    href: "https://svelte.dev/",
  },
  "Next.JS": {
    icon: <SiNextdotjs color="#fff" size="56px" />,
    href: "https://nextjs.org/",
  },
  "Gatsby.JS": { href: "gatsbyjs.com" },
  "Nuxt.JS": {
    icon: <SiNuxtdotjs color={SiNuxtdotjsHex} size="56px" />,
    href: "https://nuxt.com/",
  },
  "TailwindCSS": {
    icon: <SiTailwindcss color={SiTailwindcssHex} size="56px" />,
    href: "https://tailwindcss.com/",
  },
  "Bootstrap": {
    icon: <SiBootstrap color={SiBootstrapHex} size="56px" />,
    href: "https://getbootstrap.com/",
  },
  "Hugo": {
    icon: <SiHugo color={SiHugoHex} size="56px" />,
    href: "https://gohugo.io/",
  },
  "Shadcn": {
    icon: <SiShadcnui color="#fff" size="56px" />,
    href: "https://ui.shadcn.com/",
  },
  "Prisma": {
    icon: <SiPrisma color={SiPrismaHex} size="56px" />,
    href: "https://www.prisma.io/",
  },
  "Framer Motion": {
    icon: <SiFramer color={SiFramerHex} size="56px" />,
    href: "https://www.framer.com/motion/",
  },
  "Apollo": {
    icon: <SiApollographql color={SiApollographqlHex} size="56px" />,
    href: "https://www.apollographql.com/",
  },
  "ExpressJS": {
    icon: <SiExpress color="#fff" size="56px" />,
    href: "http://expressjs.com/",
  },
  "Fastify": {
    icon: <SiFastify color="#fff" size="56px" />,
    href: "https://fastify.dev/",
  },
  "NestJS": {
    icon: <SiNestjs color={SiNestjsHex} size="56px" />,
    href: "https://nestjs.com/",
  },
  "Adonis": {
    icon: <SiAdonisjs color={SiAdonisjsHex} size="56px" />,
    href: "https://adonisjs.com/",
  },
  "FastAPI": {
    icon: <SiFastapi color={SiFastapiHex} size="56px" />,
    href: "https://fastapi.tiangolo.com/",
  },
  "Django": {
    icon: <SiDjango color={SiDjangoHex} size="56px" />,
    href: "https://www.djangoproject.com/",
  },
  "Gin": {
    icon: <SiGin color={SiGinHex} size="56px" />,
    href: "https://gin-gonic.com/",
  },
  "Postgres": {
    icon: <SiPostgresql color={SiPostgresqlHex} size="56px" />,
    href: "https://www.postgresql.org/",
  },
  "Mysql": {
    icon: <SiMysql color={SiMysqlHex} size="56px" />,
    href: "https://www.mysql.com/",
  },
  "Redis": {
    icon: <SiRedis color={SiRedisHex} size="56px" />,
    href: "https://redis.io/",
  },
  "Docker": {
    icon: <SiDocker color={SiDockerHex} size="56px" />,
    href: "https://www.docker.com/",
  },
  "Linux": {
    icon: <SiLinux color={SiLinuxHex} size="56px" />,
    href: "https://www.linux.org",
  },
  "Godot": {
    icon: <SiGodotengine color={SiGodotengineHex} size="56px" />,
    href: "https://godotengine.org/",
  },
  "MagicUI": {
    href: "https://magicui.design",
  },
};
