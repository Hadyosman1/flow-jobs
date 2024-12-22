import { cache } from "react";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import JobDetailsPage from "@/components/job-details-page";
import { Button } from "@/components/ui/button";

interface JopPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({ where: { slug } });

  if (!job) return notFound();

  return job;
});

export async function generateStaticParams() {
  const slugs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return slugs;
}

export async function generateMetadata({
  params,
}: JopPostPageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

const JopPostPage = async ({ params }: JopPostPageProps) => {
  const slug = (await params).slug;
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-3 py-10 md:flex-row md:items-start">
      <JobDetailsPage job={job} />
      <aside>
        <Button asChild>
          <a className="w-40 md:w-fit" target="_blank" href={applicationLink}>
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
};

export default JopPostPage;
