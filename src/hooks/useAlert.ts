import { useState } from "react";
import { IAlert } from "../models/alert";

export const useAlert = (): [IAlert, (message: string) => void] => {
  const [errorAlert, setErrorAlert] = useState<IAlert>({
    show: false,
    message: "",
  });

  function showAlert(message: string): void {
    setErrorAlert({
      show: true,
      message,
    });

    setTimeout(() => {
      setErrorAlert({
        show: false,
        message: "",
      });
    }, 3000);
  }

  return [errorAlert, showAlert];
};
