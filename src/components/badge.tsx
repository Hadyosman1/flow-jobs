import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="rounded border bg-muted px-2 py-0.5 text-muted-foreground text-sm font-medium">
      {children}
    </span>
  );
};

export default Badge;
