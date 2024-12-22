import { Metadata } from "next";
import H1 from "@/components/ui/h1";
import CreateJobForm from "./create-job-form";



const CreateNewJobPage = () => {
  return (
    <main className="mx-auto max-w-5xl px-3 py-10">
      <div className="space-y-5 text-center">
        <H1>Find your prefect developer job</H1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>
      <div className="mx-auto max-w-3xl py-10">
        <CreateJobForm />
      </div>
    </main>
  );
};

export default CreateNewJobPage;

export const metadata: Metadata = {
  title: "Create New Job",
};
