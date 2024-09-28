import { BriefcaseBusinessIcon } from "lucide-react";

import { TitleWithIcon } from "./TitleWithIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resume } from "@/lib/resume";

export const Experiences = () => {
  return (
    <div className="flex flex-col gap-4">
      <TitleWithIcon>
        <BriefcaseBusinessIcon className="h-8 w-8" />
        Experiences
      </TitleWithIcon>
      <Tabs
        defaultValue={resume[0].company}
        orientation="vertical"
        className="flex flex-col lg:flex-row gap-4"
      >
        <div className="flex flex-col">
          <TabsList className="w-full lg:w-[300px] justify-start p-4">
            {resume.map(experience => (
              <TabsTrigger
                key={`trigger-${experience.company}`}
                className="flex flex-col items-start w-full py-2"
                value={experience.company}
              >
                <h5 className="text-secondary-foreground">
                  {experience.company}
                </h5>
                <h6 className="text-xs text-muted-foreground">
                  <time>{experience.startDate}</time>
                  {" - "}
                  <time>{experience.endDate}</time>
                </h6>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {resume.map(experience => (
          <TabsContent
            value={experience.company}
            className="flex-1"
            key={`content-${experience.company}`}
          >
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle className="text-2xl">{experience.company}</CardTitle>
                <CardDescription>{experience.title}</CardDescription>
              </CardHeader>
              <CardContent>
                {experience.description.map((paragraph, index) => (
                  <p
                    key={`${experience.company}-description-${index}`}
                    className="text-base font-normal text-secondary-foreground mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
                {experience.achievements.length > 0 ? (
                  <ul className="text-secondary-foreground/50 text-base list-disc list-inside">
                    {experience.achievements.map((achievement, index) => (
                      <li key={`${experience.company}-achievement-${index}`}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
