import { cn } from "@/lib/utils";

export const Image = ({
  src,
  alt,
  className,
  showAlt = true,
}: {
  src: string;
  alt: string;
  className?: string;
  showAlt?: boolean;
}) => {
  return (
    <div className="mb-4">
      <img
        src={src}
        alt={alt}
        className={cn("rounded-xl shadow-md", className)}
      />
      {showAlt ? <p className="text-muted-foreground text-xs">{alt}</p> : null}
    </div>
  );
};
