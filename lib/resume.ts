import { technologies } from "./technologies";

export type ResumeExperienceType = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
  achievements: string[];
  technologies?: (keyof typeof technologies)[];
};

export const resume: ResumeExperienceType[] = [
  {
    title: "Senior Full-Stack Developer",
    company: "OPEN Ticketing Ecosystem",
    startDate: "2022",
    endDate: "2024",
    description: [
      "I joined OPEN Ticketing Ecosystem (Formerly GET Protocol) as a Front-End developer and moved on to become a senior Full-Stack Developer. I worked with multiple teams to ensure progress throughout the entire platform was as smooth as possible. During my tenure at OPEN Ticketing Ecosystem I worked with several different languages such as: Typescript, Golang and Python and used different frameworks such as React, Vue, Django and more.",
    ],
    achievements: [
      "Developed NFT Minting Studio for our business clients to allow minting custom NFTs with different rulesets",
      "Helped create spam proof login system along with OTP microservice",
      "Implemented new end-to-end tests using Cypress",
    ],
    technologies: [
      "React",
      "Vue",
      "Typescript",
      "Golang",
      "Python",
      "Django",
      "Shadcn",
      "TailwindCSS",
    ],
  },
  {
    title: "Senior Front-End Developer",
    company: "Pragmateam",
    startDate: "2021",
    endDate: "2022",
    description: [
      "I joined Pragmateam as a Senior Front-End Developer. I worked on multiple projects, all using React and Typescript. I was responsible for developing our in-house project, a new tab plugin for Chrome and Firefox to manage bookmarks, tabs and history. I also worked on a project for a client along with a team of developers to create a new platform for managing their business.",
    ],
    achievements: [
      "Developed a new tab plugin for Chrome and Firefox",
      "Refactored critical infrastructure to improve performance",
    ],
    technologies: ["React", "Typescript", "TailwindCSS"],
  },
  {
    title: "Senior Front-End Developer",
    company: "Minerium",
    startDate: "2020",
    endDate: "2021",
    description: [
      "At Minerium I was responsible for creating the entire platform from the ground up. I led a team of developers to create the mining analytics platform. I worked with Svete, Typescript, Golang, Java and a bit of C++ to create the platform. I was responsible for the entire stack except the mining software itself.",
    ],
    achievements: [
      "Created the entire platform and made sure it would be able to handle the load",
      "Engineered the backend to handle thousands of requests per second",
      "Led a team of developers to create the platform and trading bots",
    ],
    technologies: [
      "Svelte",
      "Typescript",
      "Golang",
      "Python",
      "Java",
      "C++",
      "TailwindCSS",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Okkur Labs",
    startDate: "2018",
    endDate: "2020",
    description: [
      "Okkur Labs is a Open Source contribution company that works on multiple in-house projects and helps other projects where possible. I worked closely with other developers to develop the front-end of multiple projects and worked on Syna, implementing new features and fixing bugs.",
    ],
    achievements: [
      "Created multiple new Syna components",
      "Implemented features to allow much more customization",
    ],
    technologies: ["React", "Typescript"],
  },
  {
    title: "Front-End Developer",
    company: "Miare",
    startDate: "2017",
    endDate: "2018",
    description: [
      "I joined Miare as a Front-End Developer and worked closely with our CTO to develop the front-end of our platform, moving features out of the MVP and creating multiple new applications. The projects I worked on were all in React and Typescript. These projects were responsible for managing deliveries, tracking orders and drivers and much more. Since Miare was B2B business used by restaurants, we had to ensure that it would be as stable as possible and able to handle the load.",
    ],
    achievements: [
      "Developed new applications for the platform",
      "Refactored critical infrastructure to improve performance",
      "Tutored new developers",
    ],
    technologies: ["React", "Typescript"],
  },
  {
    title: "Front-End Developer",
    company: "Taskulu",
    startDate: "2015",
    endDate: "2017",
    description: [
      "Taskulu is a project management platform that allows users to manage their projects, tasks and teams. I joined Taskulu as a junior developer, working on the main platform alongside our CTO. I was responsible for developing new features, fixing bugs and ensuring the platform was as stable as possible.",
    ],
    achievements: [
      "Developed new features for the platform",
      "Implemented zero-knowledge encryption for user data",
    ],
    technologies: ["Javascript"],
  },
];
