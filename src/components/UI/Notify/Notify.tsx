import { FC } from "react";
import { createPortal } from "react-dom";
import cl from "./Notify.module.scss";
import Alert from "@mui/material/Alert";

interface NotifyProps {
  show: boolean;
  message: string;
  type: "error" | "success";
}

const Notify: FC<NotifyProps> = ({ show, message, type }) => {
  return (
    <>
      {show &&
        createPortal(
          <Alert
            severity={type}
            className={cl["notify"]}
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: "270px",
            }}
          >
            {message}
          </Alert>,
          document.body
        )}
    </>
  );
};

export default Notify;
