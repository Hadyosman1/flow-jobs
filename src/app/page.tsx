import JobFilterSidebar from "@/components/job-filter-sidebar";

import JobResults from "@/components/job-results";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validations";
import { Metadata } from "next";

function getTitle({ query, type, location, remote }: JobFilterValues) {
  const titlePrefix = query
    ? `${query} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? "Remote developer jobs"
        : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

interface HomeProps {
  searchParams: Promise<{
    query?: string;
    location?: string;
    type?: string;
    remote?: string;
    page?: string;
  }>;
}

export const generateMetadata = async ({
  searchParams,
}: HomeProps): Promise<Metadata> => {
  const { remote, ...othersFilters } = await searchParams;

  return {
    title: `${getTitle({ ...othersFilters, remote: !!remote })} | Flow Jobs`,
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { page, remote, ...othersFilters } = await searchParams;
  const filterValues: JobFilterValues = {
    ...othersFilters,
    remote: remote === "true",
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-3 py-10">
      <div className="space-y-7 text-center">
        <H1>{getTitle({ ...othersFilters, remote: !!remote })}</H1>
        <p className="text-muted-foreground">Find Your Dream Job.</p>
      </div>

      <section className="flex flex-col gap-4 py-10 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults
          page={page ? parseInt(page) : undefined}
          filterValues={filterValues}
        />
      </section>
    </main>
  );
}
