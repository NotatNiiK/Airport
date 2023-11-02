import { FC, InputHTMLAttributes, forwardRef, Ref } from "react";
import cl from "./FormInput.module.scss";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const FormInput: FC<AuthInputProps> = forwardRef(
  (props, ref: Ref<HTMLInputElement>) => {
    return <input className={cl["form-input"]} ref={ref} {...props} />;
  }
);

export default FormInput;
