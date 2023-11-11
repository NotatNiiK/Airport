import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import cl from "./TicketButton.module.scss";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

interface TicketButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: ReactNode;
}

const TicketButton: FC<TicketButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <button {...props} className={cl["ticket-button"]}>
      {loading ? <ButtonLoader /> : children}
    </button>
  );
};

export default TicketButton;
