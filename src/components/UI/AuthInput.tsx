import { FC, InputHTMLAttributes } from "react";
import cl from "./AuthInput.module.scss";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const AuthInput: FC<AuthInputProps> = (props) => {
  return <input type="text" className={cl["auth-input"]} {...props} />;
};

export default AuthInput;
