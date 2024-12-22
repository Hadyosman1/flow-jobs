import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().trim().min(1, "Required");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    return !file || (file.type.startsWith("image/") && file instanceof File);
  }, "Must Be An Image File")
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2; // 2 MB
  }, "File Must Be Less Than 2MB");

const numericRequiredString = requiredString
  .regex(/^\d+$/, "Must Be A Number")
  .max(9, "Number Can't Be Longer Than 9 Digits");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email Or Url Is Required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid Location Type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location Is Required For On-site Jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid Job Type",
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().trim().max(5000).optional(),
    salary: numericRequiredString,
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});
export type JobFilterValues = z.infer<typeof jobFilterSchema>;
