import { GitGraphIcon } from "lucide-react";
import { useMemo } from "react";

import { TitleWithIcon } from "./TitleWithIcon";
import { useQuery } from "@tanstack/react-query";

const colors: Record<string, string> = {
  bg: "#dce9de",
  bg1: "#39d353",
  bg2: "#26a641",
  bg3: "#006d32",
  bg4: "#0e4429",
  border: "#0e4429",
  border1: "#0e4429",
  border2: "#0e4429",
  border3: "#0e4429",
  border4: "#0e4429",
};

const baseSize = 16;
const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const Github = () => {
  const { data, isLoading, error } = useQuery<{
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              contributionCount: number;
              date: string;
            }[];
          }[];
        };
      };
    };
  }>({
    queryKey: ["contributions"],
    queryFn: async () => {
      const response = await fetch(
        "https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-f5594546-71c3-4ce7-846b-9101362b017d/mpourismaiel-github/mpourismaiel-github",
      );

      return (await response.json()).data;
    },
  });

  const monthsX = useMemo(() => {
    if (isLoading || error || !data) return {};

    return data.user.contributionsCollection.contributionCalendar.weeks.reduce<
      Record<string, number>
    >((acc, week, i) => {
      const month = Math.max(
        ...week.contributionDays.map(contrib =>
          parseInt(contrib.date.split("-")[0] + contrib.date.split("-")[1]),
        ),
      );

      const key = (month % 100) - 1;
      if (typeof acc[months[key]] === "undefined") {
        acc[months[key]] = i * baseSize;
      }
      return acc;
    }, {});
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <TitleWithIcon>
        <GitGraphIcon className="h-8 w-8" />
        Contributions
      </TitleWithIcon>
      <div className="flex justify-center items-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error...</p>
        ) : !data ? (
          <p>Something went wrong!</p>
        ) : (
          <div className="lg:w-[1000px] xl:w-[1200px] overflow-x-auto">
            <svg
              viewBox="0 0 893 152"
              className="w-[1000px] lg:w-full text-accent-foreground"
            >
              <g>
                {Object.keys(monthsX).map((month, i) => (
                  <text
                    x={monthsX[month] + 45}
                    dominantBaseline="hanging"
                    fill="currentColor"
                  >
                    {month}
                  </text>
                ))}
              </g>
              <g>
                <text
                  x="36"
                  y="36"
                  dominantBaseline="hanging"
                  fill="currentColor"
                  textAnchor="end"
                >
                  Mon
                </text>
                <text
                  x="36"
                  y="68"
                  dominantBaseline="hanging"
                  fill="currentColor"
                  textAnchor="end"
                >
                  Wed
                </text>
                <text
                  x="36"
                  y="100"
                  dominantBaseline="hanging"
                  fill="currentColor"
                  textAnchor="end"
                >
                  Fri
                </text>
              </g>
              <g>
                <text
                  x="45"
                  y="136"
                  dominantBaseline="hanging"
                  fill="currentColor"
                >
                  {`${
                    data.user.contributionsCollection.contributionCalendar
                      .totalContributions
                  } contributions in the last year`}
                </text>
                <text
                  x="720"
                  y="136"
                  dominantBaseline="hanging"
                  fill="currentColor"
                >
                  Less
                </text>
                <rect
                  x="756"
                  y="136"
                  width="12"
                  height="12"
                  rx="2"
                  ry="2"
                  fill={colors[`bg`]}
                  stroke={colors[`border`]}
                />
                <rect
                  x="772"
                  y="136"
                  width="12"
                  height="12"
                  rx="2"
                  ry="2"
                  fill={colors[`bg1`]}
                  stroke={colors[`border1`]}
                />
                <rect
                  x="788"
                  y="136"
                  width="12"
                  height="12"
                  rx="2"
                  ry="2"
                  fill={colors[`bg2`]}
                  stroke={colors[`border2`]}
                />
                <rect
                  x="804"
                  y="136"
                  width="12"
                  height="12"
                  rx="2"
                  ry="2"
                  fill={colors[`bg3`]}
                  stroke={colors[`border3`]}
                />
                <rect
                  x="820"
                  y="136"
                  width="12"
                  height="12"
                  rx="2"
                  ry="2"
                  fill={colors[`bg4`]}
                  stroke={colors[`border4`]}
                />
                <text
                  x="840"
                  y="136"
                  dominantBaseline="hanging"
                  fill="currentColor"
                >
                  More
                </text>
              </g>
              {data.user.contributionsCollection.contributionCalendar.weeks.map(
                (week, i) => (
                  <g transform={`translate(${i * baseSize}, 20)`}>
                    {week.contributionDays.map((day, j) => (
                      <rect
                        x="45"
                        y={j * baseSize}
                        width="12"
                        height="12"
                        rx="2"
                        ry="2"
                        fill={
                          day.contributionCount === 0
                            ? colors.bg
                            : colors[`bg${Math.min(day.contributionCount, 4)}`]
                        }
                        stroke={
                          day.contributionCount === 0
                            ? colors.border
                            : colors[
                                `border${Math.min(day.contributionCount, 4)}`
                              ]
                        }
                        data-date={day.date}
                        data-level={day.contributionCount}
                      />
                    ))}
                  </g>
                ),
              )}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
