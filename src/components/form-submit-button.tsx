"use client";

import { useFormStatus } from "react-dom";
import LoadingButton from "./loading-button";

const FormSubmitButton = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton type="submit" {...props} pending={pending}>
      {props.children}
    </LoadingButton>
  );
};

export default FormSubmitButton;
