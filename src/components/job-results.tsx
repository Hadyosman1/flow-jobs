import { JobFilterValues } from "@/lib/validations";
import JobListItem from "./job-list-item";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

const JOBS_PER_PAGE = 6;

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

const JobResults = async ({ filterValues, page = 1 }: JobResultsProps) => {
  const { location, query, type, remote } = filterValues;

  const searchString = query
    ?.split(" ")
    .filter((word) => word !== " ")
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { location: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const skip = (page - 1) * JOBS_PER_PAGE;

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip,
    take: JOBS_PER_PAGE,
  });
  const countPromise = prisma.job.count({ where: { approved: true } });

  const [jobs, count] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link className="block" key={job.id} href={`/jobs/${job.slug}`}>
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="text-center">
          No jobs found, Try adjusting your search filters.
        </p>
      )}
      {jobs.length !== 0 && (
        <Pagination
          currentPage={page}
          pagesCount={count}
          filterValues={filterValues}
        />
      )}
    </div>
  );
};

export default JobResults;

interface PaginationProps {
  currentPage: number;
  pagesCount: number;
  filterValues: JobFilterValues;
}

function Pagination({
  currentPage,
  pagesCount,
  filterValues: { query, location, type, remote },
}: PaginationProps) {
  function createPageLink(pageNumber: number) {
    const searchParams = new URLSearchParams({
      ...(query && { query: query.trim() }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: pageNumber.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  const pagesLength = Math.ceil(pagesCount / JOBS_PER_PAGE);

  return (
    <div className="flex items-center justify-between">
      <Button
        asChild
        size="sm"
        variant={"outline"}
        className={cn(currentPage <= 1 && "invisible")}
      >
        <Link href={createPageLink(currentPage - 1)}>
          <ArrowLeft />
          Prev
        </Link>
      </Button>
      <span>
        Page {currentPage} of {pagesLength}
      </span>
      <Button
        asChild
        size="sm"
        variant={"outline"}
        className={cn(currentPage >= pagesLength && "invisible")}
      >
        <Link href={createPageLink(currentPage + 1)}>
          Next
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
