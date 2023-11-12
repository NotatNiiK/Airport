import { useState } from "react";
import { IAlert } from "../models/alert";

export const useAlert = (): [IAlert, (message: string) => void] => {
  const [alert, setAlert] = useState<IAlert>({
    show: false,
    message: "",
  });

  function showAlert(message: string): void {
    setAlert({
      show: true,
      message,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
      });
    }, 3000);
  }

  return [alert, showAlert];
};
