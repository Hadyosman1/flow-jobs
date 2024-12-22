import { jobTypes } from "@/lib/job-types";
import prisma from "@/lib/prisma";
import { jobFilterSchema, JobFilterValues } from "@/lib/validations";
import { redirect } from "next/navigation";
import FormSubmitButton from "./form-submit-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";

async function filterJobs(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries());
  const { location, query, remote, type } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
}

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

const JobFilterSidebar = async ({
  defaultValues: { location, query, remote, type },
}: JobFilterSidebarProps) => {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true, location: { not: null } },
      distinct: ["location"],
      select: { location: true },
    })
    .then((locations) =>
      locations.map(({ location }) => location),
    )) as string[];

  return (
    <aside className="sticky h-fit rounded-lg border bg-background p-3 md:top-3 md:w-[260px]">
      <form key={`${query} ${location} ${remote} ${type}`} action={filterJobs}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query">Search</Label>
            <Input
              defaultValue={query}
              id="query"
              name="query"
              placeholder="Title, company, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select defaultValue={type ?? ""} id="type" name="type">
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select defaultValue={location ?? ""} id="location" name="location">
              <option value="">All locations</option>
              {distinctLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <input
              defaultChecked={remote}
              className="size-5 cursor-pointer accent-foreground"
              type="checkbox"
              id="remote"
              name="remote"
            />
            <Label htmlFor="remote" className="cursor-pointer">
              Remote jobs
            </Label>
          </div>

          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
