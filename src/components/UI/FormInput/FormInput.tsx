import { FC, InputHTMLAttributes, forwardRef, Ref } from "react";
import { FieldError } from "react-hook-form";
import cl from "./FormInput.module.scss";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: FieldError;
}

const FormInput: FC<AuthInputProps> = forwardRef(
  ({ isError, ...props }, ref: Ref<HTMLInputElement>) => {
    const inputClasses: string = [
      cl["form-input"],
      `${isError ? cl["validation-error"] : ""}`,
    ].join(" ");

    return <input className={inputClasses} ref={ref} {...props} />;
  }
);

export default FormInput;
