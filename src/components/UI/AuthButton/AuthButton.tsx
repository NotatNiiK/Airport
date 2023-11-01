import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import cl from "./AuthButton.module.scss";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: ReactNode;
}

const AuthButton: FC<AuthButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button {...props} className={cl["auth-button"]}>
      {loading ? <ButtonLoader /> : children}
    </button>
  );
};

export default AuthButton;
