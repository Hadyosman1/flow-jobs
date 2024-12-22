import JobListItem from "@/components/job-list-item";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisma";
import Link from "next/link";
const AdminPage = async () => {
  const unapprovedJobs = await prisma.job.findMany({
    where: { approved: false },
  });

  return (
    <section className="py-10">
      <div className="space-y-5 mb-5">
        <H1 className="text-center">Admin Dashboard</H1>
        <h2 className="font-semibold">Unapproved jobs:</h2>
      </div>
      {unapprovedJobs.map((job) => (
        <Link className="block" key={job.id} href={`/admin/jobs/${job.slug}`}>
          <JobListItem job={job} />
        </Link>
      ))}

      {unapprovedJobs.length === 0 && (
        <p className="mt-3 text-muted-foreground">
          There is no unapproved jobs.
        </p>
      )}
    </section>
  );
};

export default AdminPage;
