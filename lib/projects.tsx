import Link from "next/link";
import { ReactNode } from "react";

import { technologies } from "./technologies";

export type ProjectType = {
  title: string;
  description: ReactNode;
  href?: string;
  technologies: (keyof typeof technologies)[];
};

export const projects: ProjectType[] = [
  {
    title: "Ainur HQ Landing Page",
    description:
      "Ainur HQ is a web development agency that focuses on creating and developing advanced web applications. The landing page was designed to showcase the services and projects that Ainur HQ has worked on.",
    href: "https://ainurhq.cloud/",
    technologies: ["Next.JS", "TailwindCSS", "Shadcn", "MagicUI"],
  },
  {
    title: "Rice Your Ride",
    description: (
      <>
        I am an avid fan of Linux desktop customization and a frequent visitor
        of{" "}
        <Link
          href="https://reddit.com/r/unixporn"
          target="_blank"
          className="text-blue-500"
        >
          r/unixporn
        </Link>
        . I created Rice Your Ride to showcase what I think are the best designs
        and customizations from the subreddit.
      </>
    ),
    href: "https://riceyourride.com/",
    technologies: ["Next.JS", "TailwindCSS", "Shadcn"],
  },
];
