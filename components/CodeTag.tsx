import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import * as Tabs from "@radix-ui/react-tabs";

export const CodeTag = ({
  languages,
}: {
  languages: Record<string, string | string[]>;
}) => {
  const [scope, animate] = useAnimate();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(Object.keys(languages)[0]);

  const copyCode = () => {
    const code = languages[activeTab];
    navigator.clipboard.writeText(
      typeof code === "string" ? code : code.join("\n"),
    );
    animate(
      scope.current,
      { width: "110px" },
      { duration: 0.2, type: "spring" },
    );
    setCopied(true);

    setTimeout(() => {
      animate(
        scope.current,
        { width: "48px" },
        { duration: 0.2, type: "spring" },
      );
      setCopied(false);
    }, 2000);
  };

  return (
    <Tabs.Root
      className="bg-[rgb(30,30,30)]/50 rounded-md"
      defaultValue={Object.keys(languages)[0]}
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <div className="text-muted-foreground py-2 text-sm flex items-center justify-between ps-4 pe-2">
        <Tabs.List
          className="flex gap-2"
          aria-label={Object.keys(languages)[0]}
        >
          {Object.keys(languages).map(language => (
            <Tabs.Trigger
              className="transition-colors duration-200 ease-in-out capitalize text-base px-4 py-2 rounded data-[state=active]:text-white text-muted-foreground bg-transparent data-[state=active]:bg-secondary hover:bg-secondary/50"
              value={language}
              key={language}
            >
              {language}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Button
          ref={scope}
          variant="ghost"
          className={cn(
            "h-10 delay-0 duration-500 transition-colors ease-in-out",
            {
              "text-muted-foreground bg-transparent": !copied,
              "text-white bg-green-500 hover:bg-green-500": copied,
            },
          )}
          onClick={copyCode}
        >
          <AnimatePresence>
            {copied ? (
              <motion.div
                key="copied"
                className="flex items-center"
                initial={{ scale: 5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.2, opacity: 0 }}
              >
                <CheckIcon className="size-4 me-2" /> Copied!
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.2, opacity: 0 }}
              >
                <CopyIcon className="size-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
      {Object.keys(languages).map(language => (
        <Tabs.Content value={language} key={language}>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              margin: 0,
            }}
            codeTagProps={{ style: { fontSize: "16px" } }}
          >
            {languages[language]}
          </SyntaxHighlighter>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
