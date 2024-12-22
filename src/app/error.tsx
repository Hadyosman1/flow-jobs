"use client";

import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";

interface ErrorProps {
  reset: () => void;
  error: Error;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <main className="mx-auto flex h-full max-w-5xl grow flex-col items-center justify-center space-y-4">
      <H1 className="text-center text-xl font-bold">
        Something Went Wrong...!
      </H1>
      <p className="break-all text-muted-foreground">{error.message}</p>
      <div className="flex gap-3">
        <Button variant={"outline"} onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
};

export default Error;
