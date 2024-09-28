import { LayoutDashboardIcon } from "lucide-react";

import { TitleWithIcon } from "./TitleWithIcon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Projects = () => {
  return (
    <div className="flex flex-col gap-4">
      <TitleWithIcon>
        <LayoutDashboardIcon className="h-8 w-8" />
        Projects
      </TitleWithIcon>
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Ainur HQ Landing Page
            </CardTitle>
          </CardHeader>
          <CardContent className="text-base">
            <p>
              Ainur HQ is a web development agency that focuses on creating and
              developing advanced web applications. The landing page was
              designed to showcase the services and projects that Ainur HQ has
              worked on.
            </p>
          </CardContent>
          <CardFooter>
            <p>
              <strong className="me-2">Technologies:</strong>
              <span className="text-muted-foreground">
                <a href="https://nextjs.org/" target="_blank">
                  Next.js
                </a>
                ,{" "}
                <a href="https://tailwindcss.com/" target="_blank">
                  TailwindCSS
                </a>
                ,{" "}
                <a href="https://ui.shadcn.com/" target="_blank">
                  Shadcn
                </a>
                ,{" "}
                <a href="https://magicui.design" target="_blank">
                  MagicUI
                </a>
              </span>
            </p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Rice Your Ride</CardTitle>
          </CardHeader>
          <CardContent className="text-base">
            <p>
              I am an avid fan of Linux desktop customization and a frequent
              visitor of{" "}
              <a href="https://reddit.com/r/unixporn" target="_blank">
                r/unixporn
              </a>
              . I created Rice Your Ride to showcase what I think are the best
              designs and customizations from the subreddit.
            </p>
          </CardContent>
          <CardFooter>
            <p>
              <strong className="me-2">Technologies:</strong>
              <span className="text-muted-foreground">
                <a href="https://nextjs.org/" target="_blank">
                  Next.js
                </a>
                ,{" "}
                <a href="https://tailwindcss.com/" target="_blank">
                  TailwindCSS
                </a>
                ,{" "}
                <a href="https://ui.shadcn.com/" target="_blank">
                  Shadcn
                </a>
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
