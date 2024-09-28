import { motion } from "framer-motion";
import { BriefcaseBusinessIcon } from "lucide-react";
import {
  LegacyRef,
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  const [value, setValue] = useState<string>(resume[0].company);
  // state instead of ref since ref can't be a dependency in useMemo
  const [nodes, setNodes] = useState<Record<string, HTMLButtonElement>>({});

  const storeNode = useCallback(
    (key: string) => (node: HTMLButtonElement) => {
      if (node !== null && !nodes[key]) {
        setNodes({
          ...nodes,
          [key]: node,
        });
      }
    },
    [nodes],
  );

  const activeTabData = useMemo(
    () => ({
      left: nodes[value]?.offsetLeft ?? 0,
      top: nodes[value]?.offsetTop ?? 0,
      width: nodes[value]?.clientWidth ?? 0,
      height: nodes[value]?.clientHeight ?? 0,
    }),
    [nodes, value],
  );

  return (
    <div className="flex flex-col gap-4">
      <TitleWithIcon>
        <BriefcaseBusinessIcon className="h-8 w-8" />
        Experiences
      </TitleWithIcon>
      <Tabs
        value={value}
        onValueChange={setValue}
        defaultValue={resume[0].company}
        orientation="vertical"
        className="flex flex-col lg:flex-row gap-4"
      >
        <div className="flex flex-col">
          <TabsList className="relative w-full lg:w-[300px] justify-start p-4">
            <motion.div
              animate={activeTabData}
              transition={{ type: "just" }}
              className="absolute z-0 bg-background rounded-md"
            />
            {resume.map(experience => (
              <TabsTrigger
                key={`trigger-${experience.company}`}
                className="flex flex-col items-start w-full py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none z-10"
                value={experience.company}
                ref={storeNode(experience.company)}
              >
                <h5 className="text-secondary-foreground">
                  {experience.company}
                </h5>
                <h6 className="text-xs transition-colors">
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
