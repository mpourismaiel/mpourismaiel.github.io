export const TitleWithIcon = ({ children, htmlID }: { children: React.ReactNode, htmlID?: string }) => {
  return (
    <h3 className="text-2xl font-bold text-secondary-foreground mb-2 flex items-center gap-4" id={htmlID}>
      {children}
    </h3>
  );
};
