"use server";

import { createJobSchema } from "@/lib/validations";
import prisma from "@/lib/prisma";
import { CreateSlug } from "@/lib/utils";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import { redirect } from "next/navigation";

export async function CreateJob(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    location,
    locationType,
    companyName,
    description,
    salary,
    applicationEmail,
    applicationUrl,
    companyLogo,
  } = createJobSchema.parse(values);

  const slug = `${CreateSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_Logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      { access: "public", addRandomSuffix: false },
    );

    companyLogoUrl = blob.url;
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      locationType,
      location: location?.trim(),
      companyName: companyName.trim(),
      companyLogoUrl,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
      approved: false,
    },
  });

  redirect("/job-submitted");
}
