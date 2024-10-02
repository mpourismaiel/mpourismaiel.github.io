import { ExternalLinkIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import { TitleWithIcon } from "./TitleWithIcon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/lib/projects";
import { technologies } from "@/lib/technologies";

export const Projects = () => {
  return (
    <div className="flex flex-col gap-4">
      <TitleWithIcon>
        <LayoutDashboardIcon className="h-8 w-8" />
        Projects
      </TitleWithIcon>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map(project => (
          <Card
            key={`project-${project.title}`}
            className="flex flex-col supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 bg-black/10 backdrop-blur-sm shadow-md"
          >
            <CardHeader>
              <Link href={project.href}>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  {project.title}
                  <ExternalLinkIcon className="h-4 w-4" />
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="text-base flex-1">
              <p>{project.description}</p>
            </CardContent>
            <CardFooter>
              <p className="text-secondary-foreground">
                <strong className="text-secondary-foreground">
                  Technologies:
                </strong>{" "}
                {project.technologies.map((technology, index) => (
                  <Fragment
                    key={`project-${project.title}-technology-${technology}`}
                  >
                    <Link href={technologies[technology].href} target="_blank">
                      {technology}
                    </Link>
                    {index !== project.technologies.length - 1 && ", "}
                  </Fragment>
                ))}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
