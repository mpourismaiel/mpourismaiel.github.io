import { useEffect, useRef } from "react";

export const Comments = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || ref.current.innerHTML) return;

    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.crossOrigin = "anonymous";
    scriptElement.src = "https://utteranc.es/client.js";

    scriptElement.setAttribute("issue-term", "title");
    scriptElement.setAttribute("label", "comment");
    scriptElement.setAttribute("repo", "mpourismaiel/mpourismaiel.github.io");
    scriptElement.setAttribute("theme", "github-dark-orange");

    ref.current.appendChild(scriptElement);
  }, []);

  return <div ref={ref} />;
};
