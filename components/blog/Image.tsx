export const Image = ({
  src,
  alt,
  showAlt = true,
}: {
  src: string;
  alt: string;
  showAlt?: boolean;
}) => {
  return (
    <div className="mb-4">
      <img src={src} alt={alt} className="rounded-xl shadow-md" />
      {showAlt ? <p className="text-muted-foreground text-xs">{alt}</p> : null}
    </div>
  );
};
