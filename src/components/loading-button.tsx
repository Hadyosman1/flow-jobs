import { Loader } from "lucide-react";
import { Button } from "./ui/button";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pending: boolean;
}
const LoadingButton = ({ pending, ...props }: LoadingButtonProps) => {
  return (
    <Button
      {...props}
      disabled={props.disabled || pending}
      className={props.className}
    >
      {props.children}
      {pending && <Loader className="animate-spin" />}
    </Button>
  );
};

export default LoadingButton;
