export const TitleWithIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="text-2xl font-bold text-secondary-foreground mb-2 flex items-center gap-4">
      {children}
    </h3>
  );
};
