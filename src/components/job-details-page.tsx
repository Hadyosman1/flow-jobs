import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Markdown from "./markdown";

interface JobDetailsPageProps {
  job: Job;
}

const JobDetailsPage = ({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    location,
    locationType,
    salary,
    companyLogoUrl,
    type,
  },
}: JobDetailsPageProps) => {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-5">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt={title}
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="font-semibold text-muted-foreground">
            {applicationUrl ? (
              <a
                rel="noreferrer noopener"
                target="_blank"
                href={new URL(applicationUrl).origin}
                className="text-green-600 hover:underline"
              >
                {companyName}
              </a>
            ) : (
              <span>{companyName}</span>
            )}
          </p>

          <div className="mt-3 text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {type}
            </p>

            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>

            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location || "Worldwide"}
            </p>

            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(salary)}
            </p>
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
};

export default JobDetailsPage;
