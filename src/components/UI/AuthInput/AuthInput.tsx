import { FC, InputHTMLAttributes, forwardRef, Ref } from "react";
import cl from "./AuthInput.module.scss";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const AuthInput: FC<AuthInputProps> = forwardRef(
  (props, ref: Ref<HTMLInputElement>) => {
    return (
      <input type="text" className={cl["auth-input"]} ref={ref} {...props} />
    );
  }
);

export default AuthInput;
