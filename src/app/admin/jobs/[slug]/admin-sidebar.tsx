"use client";

import FormSubmitButton from "@/components/form-submit-button";
import { Job } from "@prisma/client";
import { useActionState } from "react";
import { approveSubmission, deleteJob } from "./actions";

interface AdminSidebarProps {
  job: Job;
}

const AdminSidebar = ({ job }: AdminSidebarProps) => {
  return (
    <aside className="flex w-full shrink-0 flex-row items-center justify-center gap-2 md:w-[180px] md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-700">
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton id={job.id} />
      )}
      <DeleteJobButton id={job.id} />
    </aside>
  );
};

export default AdminSidebar;

interface AdminButtonsProps {
  id: number;
}

const ApproveSubmissionButton = ({ id }: AdminButtonsProps) => {
  const [formState, formAction] = useActionState(approveSubmission, undefined);

  return (
    <form className="space-y-1" action={formAction}>
      <input type="hidden" value={id} name="id" />
      <FormSubmitButton
        className="w-full bg-green-700 hover:bg-green-800"
        type="submit"
      >
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState?.error}</p>
      )}
    </form>
  );
};

const DeleteJobButton = ({ id }: AdminButtonsProps) => {
  const [formState, formAction] = useActionState(deleteJob, undefined);

  return (
    <form className="space-y-1" action={formAction}>
      <input type="hidden" value={id} name="id" />
      <FormSubmitButton
        className="w-full bg-red-700 hover:bg-red-800"
        type="submit"
      >
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState?.error}</p>
      )}
    </form>
  );
};
