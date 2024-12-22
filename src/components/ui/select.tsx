import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-9 w-full bg-background cursor-pointer appearance-none truncate rounded-md border border-input px-3 py-1 pr-8 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        {...props}
      />
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50"
      />
    </div>
  );
});

Select.displayName = "Select";

export default Select;
