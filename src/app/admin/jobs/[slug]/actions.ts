"use server";

import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { redirect } from "next/navigation";

type ActionsReturn = { error: string } | undefined;

export async function approveSubmission(
  formState: ActionsReturn,
  formData: FormData,
): Promise<ActionsReturn> {
  try {
    const id = parseInt(formData.get("id") as string);
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }

    await prisma.job.update({
      where: { id },
      data: { approved: true },
    });

    revalidatePath("/");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function deleteJob(
  formState: ActionsReturn,
  formData: FormData,
): Promise<ActionsReturn> {
  try {
    const id = parseInt(formData.get("id") as string);
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }

    const job = await prisma.job.findUnique({ where: { id } });

    if (job?.companyLogoUrl) await del(job.companyLogoUrl);

    await prisma.job.delete({ where: { id } });

    revalidatePath("/");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }

  redirect("/admin");
}
