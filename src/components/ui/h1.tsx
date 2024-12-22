import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

const H1 = ({ className, ...props }: HTMLProps<HTMLHeadingElement>) => {
  return (
    <h1
      className={cn(
        "text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
};

export default H1;
