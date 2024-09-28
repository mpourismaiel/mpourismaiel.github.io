import { LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

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
          <Card key={`project-${project.title}`}>
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base">
              <p>{project.description}</p>
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground">
                <strong className="text-secondary-foreground">
                  Technologies:
                </strong>{" "}
                {project.technologies.map((technology, index) => (
                  <>
                    <Link
                      href={technologies[technology].href}
                      target="_blank"
                      key={`project-${project.title}-technology-${technology}`}
                    >
                      {technology}
                    </Link>
                    {index !== project.technologies.length - 1 && ", "}
                  </>
                ))}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
