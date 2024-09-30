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
    title: "Ainur Landing Page",
    description:
      "Ainur is a web development agency that focuses on creating and developing advanced web applications. The landing page was designed to showcase the services and projects that Ainur HQ has worked on.",
    href: "https://ainurhq.cloud/",
    technologies: ["Next.JS", "TailwindCSS", "Shadcn", "MagicUI"],
  },
  {
    title: "Mjolnir",
    description: (
      <>
        Mjolnir is developed as an in-house Ainur project. It is a decentralized
        video platform that allows users to upload to their own IPFS node or use
        the Mjolnir IPFS node. The platform is built with privacy in mind and
        does not track users.
      </>
    ),
    technologies: ["Svelte", "Adonis", "TailwindCSS"],
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
