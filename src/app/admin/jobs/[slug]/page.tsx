import JobDetailsPage from "@/components/job-details-page";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./admin-sidebar";

interface AdminJopPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const AdminJobPage = async ({ params }: AdminJopPostPageProps) => {
  const slug = (await params).slug;
  const job = await prisma.job.findUnique({ where: { slug } });

  if (!job) notFound();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-3 py-10 md:flex-row md:items-start">
      <JobDetailsPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
};

export default AdminJobPage;
