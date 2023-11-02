import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import cl from "./FormButton.module.scss";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: ReactNode;
}

const FormButton: FC<FormButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button {...props} className={cl["form-button"]}>
      {loading ? <ButtonLoader /> : children}
    </button>
  );
};

export default FormButton;
