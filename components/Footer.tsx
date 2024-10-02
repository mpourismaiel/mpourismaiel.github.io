import { GitPullRequestIcon } from "lucide-react";
import Link from "next/link";

import { Technology } from "./Technologies";
import { urls } from "@/lib/urls";

export const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex items-center">
          <p className="me-1">{`© ${new Date().getFullYear()} • Mahdi Pourismaiel •`}</p>
          <Link href={urls.repo} target="_blank">
            <GitPullRequestIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <p>Powered by</p>
          <Technology title="Next.JS" className="h-8 w-8" />
          <Technology title="TailwindCSS" className="h-8 w-8" />
          <Technology title="Shadcn" className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};
