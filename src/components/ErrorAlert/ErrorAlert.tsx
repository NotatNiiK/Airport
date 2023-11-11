import { FC } from "react";
import { createPortal } from "react-dom";
import cl from "./ErrorAlert.module.scss";
import Alert from "@mui/material/Alert";

interface ErrorAlertProps {
  isError: boolean;
  message: string;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ isError, message }) => {
  return (
    <>
      {isError &&
        createPortal(
          <Alert severity="error" className={cl["alert"]}>
            {message}
          </Alert>,
          document.body
        )}
    </>
  );
};

export default ErrorAlert;
