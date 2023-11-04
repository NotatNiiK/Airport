import { FC, InputHTMLAttributes, forwardRef, Ref } from "react";
import cl from "./AuthInput.module.scss";
import { FieldError } from "react-hook-form";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError: FieldError | undefined;
}

const AuthInput: FC<AuthInputProps> = forwardRef(
  ({ isError, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        type="text"
        className={`${cl["auth-input"]} ${
          isError ? cl["validation-error"] : ""
        }`}
        ref={ref}
        {...props}
      />
    );
  }
);

export default AuthInput;
