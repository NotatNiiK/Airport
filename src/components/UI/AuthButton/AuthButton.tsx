import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import cl from "./AuthButton.module.scss";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const AuthButton: FC<AuthButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={cl["auth-button"]}>
      {children}
    </button>
  );
};

export default AuthButton;
