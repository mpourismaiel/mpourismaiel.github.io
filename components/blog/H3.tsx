import { LinkIcon } from "lucide-react";

export const H3 = ({ title }: { title: string }) => {
  return (
    <h3
      className="group text-lg flex items-center gap-2"
      id={title.replace(/\s/g, "-")}
    >
      <a
        href={`#${title.replace(/\s/g, "-")}`}
        className="-ml-6 opacity-0 group-hover:opacity-100"
      >
        <LinkIcon className="h-4 w-4" />
      </a>
      {title}
    </h3>
  );
};
