import { FC, InputHTMLAttributes, forwardRef, Ref } from "react";
import cl from "./FormInput.module.scss";
import { FieldError } from "react-hook-form";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError: FieldError | undefined;
}

const FormInput: FC<AuthInputProps> = forwardRef(
  ({ isError, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        className={`${cl["form-input"]} ${
          isError ? cl["validation-error"] : ""
        }`}
        ref={ref}
        {...props}
      />
    );
  }
);

export default FormInput;
