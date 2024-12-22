import H1 from "@/components/ui/h1";

const JobSubmittedPage = () => {
  return (
    <main className="mx-auto flex h-full max-w-5xl items-center justify-center px-3 py-10">
      <div className="space-y-5 text-center">
        <H1>Job submitted</H1>
        <p className="text-muted-foreground">
          Your job posting has been submitted and is pending approval.
        </p>
      </div>
    </main>
  );
};

export default JobSubmittedPage;
